"use client";

import { useState } from "react";

import { faqItems } from "@/content/faq";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="flex scroll-mt-14 justify-center bg-white px-5 pb-16 sm:px-14 sm:pb-[140px]"
    >
      <div className="grid w-full max-w-[1040px] grid-cols-1 items-start gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-12">
        <div className="flex flex-col gap-6">
          <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-htp-blue">
            Dúvidas
          </p>
          <h2 className="m-0 text-[clamp(34px,4.4vw,60px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
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
                data-reveal
                className="t-acc border-t-[1.5px] border-black last:border-b-[1.5px]"
                data-open={open ? "true" : "false"}
              >
                <button
                  type="button"
                  className="t-acc-head grid w-full cursor-pointer grid-cols-[36px_minmax(0,1fr)_32px] items-center gap-4 border-0 bg-transparent py-5 text-left font-inherit text-[clamp(17px,1.7vw,21px)] font-bold leading-snug tracking-[-0.01em] text-inherit transition-colors duration-200 hover:text-htp-blue sm:grid-cols-[56px_minmax(0,1fr)_40px] sm:gap-4 sm:py-6"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className="text-[13px] font-bold tracking-[0.2em] text-htp-blue">
                    {String(index + 1).padStart(2, "0")}
                  </span>
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
                    <p className="m-0 py-0 pb-7 pl-[52px] pr-6 text-base font-normal leading-[1.6] text-[#444] sm:pl-[72px] sm:pr-12">
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
