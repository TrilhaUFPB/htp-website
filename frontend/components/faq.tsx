"use client";

import { useState } from "react";

import { faqItems } from "@/content/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="section pb-28 sm:pb-[clamp(140px,14vw,220px)]">
      <div className="wrap grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="flex flex-col gap-4 lg:sticky lg:top-28">
          <p className="section-label">Dúvidas</p>
          <h2 className="section-title">
            Perguntas
            <br />
            frequentes.
          </h2>
        </div>

        <div className="flex flex-col">
          {faqItems.map((item, index) => {
            const open = openIndex === index;

            return (
              <div
                key={item.question}
                className="t-acc border-t border-black/10 first:border-black last:border-b"
                data-open={open ? "true" : "false"}
              >
                <button
                  type="button"
                  className="t-acc-head grid w-full cursor-pointer grid-cols-[minmax(0,1fr)_28px] items-center gap-6 border-0 bg-transparent py-6 text-left font-display text-[clamp(19px,1.8vw,23px)] font-medium leading-snug tracking-[-0.02em] text-inherit transition-colors duration-200 hover:text-[#5c5c5c] sm:py-7"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span>{item.question}</span>
                  <span className="t-acc-chevron flex justify-end text-current" aria-hidden="true">
                    <svg viewBox="0 0 16 16" width="22" height="22">
                      <path
                        d="M4 6.5L8 10.5L12 6.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
                <div className="t-acc-panel">
                  <div className="t-acc-panel-inner" inert={open ? undefined : true}>
                    <p className="m-0 max-w-[56ch] pb-7 pr-10 text-[17px] leading-[1.6] text-[#5c5c5c]">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
