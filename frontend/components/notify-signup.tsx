"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { privacyConfig } from "@/content/privacy";

type NotifySignupProps = {
  variant?: "hero" | "footer" | "cta";
};

type DialogPhase = "closed" | "entering" | "open" | "closing";

function readMs(name: string, fallback: number) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name);
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : fallback;
}

// Both placements sit on black (the hero stage and the footer), so one light
// pill serves them; the variant still travels to the API as the signup source.
const buttonStyle =
  "inline-flex items-center justify-center gap-3 rounded-full bg-white px-7 py-[15px] font-display text-[16px] font-medium tracking-[-0.01em] text-black transition-colors hover:bg-htp-blue hover:opacity-100 sm:px-8 sm:py-[17px] sm:text-[17px]";

export function NotifySignup({ variant = "hero" }: NotifySignupProps) {
  const [phase, setPhase] = useState<DialogPhase>("closed");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();
  const consentId = useId();

  useEffect(() => {
    if (phase !== "entering") return;

    let inner = 0;
    const outer = window.requestAnimationFrame(() => {
      inner = window.requestAnimationFrame(() => setPhase("open"));
    });

    return () => {
      window.cancelAnimationFrame(outer);
      window.cancelAnimationFrame(inner);
    };
  }, [phase]);

  useEffect(() => {
    if (phase !== "closing") return;

    const ms = readMs("--modal-close-dur", 150);
    const id = window.setTimeout(() => {
      setPhase("closed");
      setStatus("idle");
      setErrorMessage("");
      setEmail("");
      setConsent(false);
      setHoneypot("");
    }, ms);

    return () => window.clearTimeout(id);
  }, [phase]);

  useEffect(() => {
    if (phase === "closed") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (phase === "open") inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPhase((current) =>
          current === "closed" || current === "closing" ? current : "closing",
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [phase]);

  const close = () => {
    setPhase((current) =>
      current === "closed" || current === "closing" ? current : "closing",
    );
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: variant,
          consent: consent ? true : undefined,
          website: honeypot,
        }),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Não foi possível enviar. Tente de novo.");
      }

      setStatus("success");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar. Tente de novo.",
      );
    }
  };

  return (
    <>
      <button type="button" onClick={() => setPhase("entering")} className={buttonStyle}>
        Quero ser avisado
        {variant === "cta" ? <span aria-hidden="true">→</span> : null}
      </button>

      {phase !== "closed" ? createPortal(
        <div
          className={`t-modal-scrim fixed inset-0 z-50 flex items-end justify-center bg-black/60 px-4 py-4 backdrop-blur-[2px] sm:items-center sm:px-6${phase === "open" ? " is-open" : ""}${phase === "closing" ? " is-closing" : ""}`}
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className={`t-modal relative max-h-[min(640px,calc(100dvh-32px))] w-full max-w-[440px] overflow-y-auto rounded-[24px] bg-white p-6 text-black shadow-[0_24px_80px_rgba(0,0,0,0.25)] sm:rounded-[28px] sm:p-8${phase === "open" ? " is-open" : ""}${phase === "closing" ? " is-closing" : ""}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Fechar"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-xl leading-none text-[#666] transition-colors hover:bg-[#f2f2f2] hover:text-black"
            >
              ×
            </button>

            {status === "success" ? (
              <div className="flex flex-col gap-4 pt-2">
                <p
                  id={titleId}
                  className="m-0 text-[clamp(28px,4vw,34px)] font-display font-medium leading-[1.05] tracking-[-0.03em]"
                >
                  Você está na lista.
                </p>
                <p id={descriptionId} className="m-0 text-base leading-relaxed text-[#444]">
                  Te avisamos assim que as inscrições abrirem.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-8 py-4 font-display text-base font-medium text-white transition-colors hover:bg-htp-blue hover:text-black"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5 pt-2">
                <div className="flex flex-col gap-2 pr-8">
                  <p
                    id={titleId}
                    className="m-0 text-[clamp(28px,4vw,34px)] font-display font-medium leading-[1.05] tracking-[-0.03em]"
                  >
                    Quero ser avisado
                  </p>
                  <p id={descriptionId} className="m-0 text-base leading-relaxed text-[#444]">
                    Deixe seu e-mail e avisamos quando as inscrições abrirem.
                  </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    aria-hidden="true"
                    autoComplete="off"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    className="pointer-events-none absolute left-[-9999px] h-px w-px overflow-hidden opacity-0"
                  />

                  <label htmlFor="notify-email" className="sr-only">
                    E-mail
                  </label>
                  <input
                    ref={inputRef}
                    id="notify-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="seu@email.com"
                    maxLength={254}
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border border-black/20 bg-white px-4 py-4 text-base outline-none transition-colors placeholder:text-[#999] focus:border-htp-blue"
                  />

                  {status === "error" ? (
                    <p className="m-0 text-sm font-medium text-[#b00020]">{errorMessage}</p>
                  ) : null}

                  <label
                    htmlFor={consentId}
                    className="flex items-start gap-3 text-sm leading-relaxed text-[#444]"
                  >
                    <input
                      id={consentId}
                      type="checkbox"
                      checked={consent}
                      onChange={(event) => setConsent(event.target.checked)}
                      className="mt-1 h-4 w-4 shrink-0 accent-black"
                    />
                    <span>
                      {privacyConfig.waitlistConsentLabel}{" "}
                      <Link
                        href="/privacidade"
                        className="font-semibold text-black underline decoration-htp-blue underline-offset-4"
                      >
                        política de privacidade
                      </Link>
                      .
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={status === "loading" || !consent}
                    className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 font-display text-base font-medium text-white transition-colors hover:bg-htp-blue hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Enviando..." : "Entrar na lista"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>,
        // Portalled so a dialog opened from the footer is not trapped beneath
        // the page sheet that covers it.
        document.body,
      ) : null}
    </>
  );
}
