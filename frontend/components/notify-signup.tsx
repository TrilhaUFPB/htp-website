"use client";

import { useEffect, useId, useRef, useState } from "react";

type NotifySignupProps = {
  variant?: "hero" | "footer";
};

const buttonStyles = {
  hero: "inline-flex items-center gap-3 rounded-full bg-black px-10 py-[18px] text-[17px] font-bold tracking-[0.02em] text-white transition-colors hover:bg-htp-blue hover:text-black hover:opacity-100",
  footer:
    "inline-flex items-center gap-3 rounded-full bg-htp-blue px-11 py-[18px] text-[17px] font-bold tracking-[0.02em] text-black transition-colors hover:bg-white hover:opacity-100",
} as const;

export function NotifySignup({ variant = "hero" }: NotifySignupProps) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setStatus("idle");
    setErrorMessage("");
    setEmail("");
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
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
      <button type="button" onClick={() => setOpen(true)} className={buttonStyles[variant]}>
        Quero ser avisado <span aria-hidden>→</span>
      </button>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 backdrop-blur-[2px]"
          onClick={close}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            className="relative w-full max-w-[440px] rounded-[28px] border-[1.5px] border-black bg-white p-8 text-black shadow-[0_24px_80px_rgba(0,0,0,0.25)]"
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
                  className="m-0 text-[clamp(28px,4vw,34px)] font-extrabold leading-[1.05] tracking-[-0.02em]"
                >
                  Você está na lista.
                </p>
                <p id={descriptionId} className="m-0 text-base leading-relaxed text-[#444]">
                  Te avisamos assim que as inscrições abrirem.
                </p>
                <button
                  type="button"
                  onClick={close}
                  className="mt-2 inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-bold text-white transition-colors hover:bg-htp-blue hover:text-black"
                >
                  Fechar
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-5 pt-2">
                <div className="flex flex-col gap-2 pr-8">
                  <p
                    id={titleId}
                    className="m-0 text-[clamp(28px,4vw,34px)] font-extrabold leading-[1.05] tracking-[-0.02em]"
                  >
                    Quero ser avisado
                  </p>
                  <p id={descriptionId} className="m-0 text-base leading-relaxed text-[#444]">
                    Deixe seu e-mail e avisamos quando as inscrições abrirem.
                  </p>
                </div>

                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="w-full rounded-2xl border-[1.5px] border-black bg-white px-4 py-4 text-base outline-none transition-colors placeholder:text-[#999] focus:border-htp-blue"
                  />

                  {status === "error" ? (
                    <p className="m-0 text-sm font-medium text-[#b00020]">{errorMessage}</p>
                  ) : null}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex items-center justify-center rounded-full bg-black px-8 py-4 text-base font-bold text-white transition-colors hover:bg-htp-blue hover:text-black disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "loading" ? "Enviando..." : "Entrar na lista"}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
