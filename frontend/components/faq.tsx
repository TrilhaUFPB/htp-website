import { faqItems } from "@/content/faq";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="flex scroll-mt-14 justify-center bg-white px-8 pb-[100px] pt-[130px] sm:px-14"
    >
      <div className="grid w-full max-w-[1040px] grid-cols-1 items-start gap-12 lg:grid-cols-[0.75fr_1.25fr]">
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
          {faqItems.map((item) => (
            <details
              key={item.question}
              name="htp-faq"
              className="group border-t-[1.5px] border-black last:border-b-[1.5px]"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-[clamp(17px,1.7vw,21px)] font-bold leading-snug tracking-[-0.01em] transition-colors duration-200 hover:text-htp-blue [&::-webkit-details-marker]:hidden">
                {item.question}
                <span
                  aria-hidden
                  className="shrink-0 text-[26px] font-normal leading-none transition-[rotate,color] duration-200 group-hover:text-htp-blue group-open:rotate-45 group-open:text-htp-blue"
                >
                  +
                </span>
              </summary>
              <p className="m-0 pb-7 pr-6 text-base leading-[1.6] text-[#444] sm:pr-12">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
