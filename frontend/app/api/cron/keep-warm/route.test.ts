import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { GET } from "./route";

const keepWaitlistWarm = vi.hoisted(() => vi.fn());

vi.mock("@/lib/waitlist/repository", () => ({ keepWaitlistWarm }));

const CRON_SECRET = "test-secret";

function cronRequest(authorization = `Bearer ${CRON_SECRET}`) {
  return new Request("https://example.com/api/cron/keep-warm", {
    headers: { authorization },
  });
}

describe("GET /api/cron/keep-warm", () => {
  beforeEach(() => {
    process.env.CRON_SECRET = CRON_SECRET;
    keepWaitlistWarm.mockReset();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.useFakeTimers();
  });

  afterEach(() => {
    delete process.env.CRON_SECRET;
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  /** Runs the handler to completion, fast-forwarding the retry backoff. */
  async function callCron(request = cronRequest()) {
    const pending = GET(request);
    await vi.runAllTimersAsync();
    return pending;
  }

  it("writes the keep-warm row when the cron secret matches", async () => {
    keepWaitlistWarm.mockResolvedValue(undefined);

    const response = await callCron(cronRequest());

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(keepWaitlistWarm).toHaveBeenCalledOnce();
  });

  it("rejects a request without the cron secret", async () => {
    const response = await callCron(cronRequest("Bearer wrong"));

    expect(response.status).toBe(401);
    expect(keepWaitlistWarm).not.toHaveBeenCalled();
  });

  it("reports the failure reason when the keep-warm write throws", async () => {
    keepWaitlistWarm.mockRejectedValue(new Error("Invalid API key"));

    const response = await callCron(cronRequest());

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toMatchObject({
      reason: "Invalid API key",
    });
  });

  it("unwraps the cause so a paused project is diagnosable", async () => {
    keepWaitlistWarm.mockRejectedValue(
      new Error("fetch failed", {
        cause: new Error("getaddrinfo ENOTFOUND db.supabase.co"),
      }),
    );

    const response = await callCron(cronRequest());

    const body = (await response.json()) as { reason: string };

    expect(body.reason).toContain("fetch failed");
    expect(body.reason).toContain("getaddrinfo ENOTFOUND db.supabase.co");
  });

  it("reports the postgrest code when Supabase rejects the query", async () => {
    keepWaitlistWarm.mockRejectedValue({
      message: "permission denied for table waitlist",
      code: "42501",
      hint: null,
      details: null,
    });

    const response = await callCron(cronRequest());

    const body = (await response.json()) as { reason: string };

    expect(body.reason).toContain("permission denied for table waitlist");
    expect(body.reason).toContain("42501");
  });

  it("logs the failure reason so it reaches the Vercel logs", async () => {
    keepWaitlistWarm.mockRejectedValue(new Error("Invalid API key"));

    await callCron(cronRequest());

    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("Invalid API key"),
    );
  });

  it("retries a transient failure and succeeds", async () => {
    keepWaitlistWarm
      .mockRejectedValueOnce(new Error("fetch failed"))
      .mockResolvedValueOnce(undefined);

    const response = await callCron();

    expect(response.status).toBe(200);
    expect(keepWaitlistWarm).toHaveBeenCalledTimes(2);
  });

  it("gives up after three attempts", async () => {
    keepWaitlistWarm.mockRejectedValue(new Error("fetch failed"));

    const response = await callCron();

    expect(response.status).toBe(500);
    expect(keepWaitlistWarm).toHaveBeenCalledTimes(3);
  });

  it("does not retry when the cron secret is wrong", async () => {
    await callCron(cronRequest("Bearer wrong"));

    expect(keepWaitlistWarm).not.toHaveBeenCalled();
  });

  it("surfaces the network cause postgrest-js puts in details", async () => {
    keepWaitlistWarm.mockRejectedValue({
      message: "TypeError: fetch failed",
      code: "",
      hint: "",
      details:
        "TypeError: fetch failed\n\nCaused by: Error: connect ETIMEDOUT 1.2.3.4:443 (ETIMEDOUT)\n" +
        "Error: connect ETIMEDOUT\n    at TCPConnectWrap.afterConnect (node:net:1)",
    });

    const response = await callCron();

    const body = (await response.json()) as { reason: string };

    expect(body.reason).toContain("connect ETIMEDOUT 1.2.3.4:443 (ETIMEDOUT)");
    expect(body.reason).not.toContain("TCPConnectWrap");
  });
});
