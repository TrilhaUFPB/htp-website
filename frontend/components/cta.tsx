import { NotifySignup } from "@/components/notify-signup";

// The brand's diagonal arrow, inlined. The source file is a single polygon on
// a white square; the square is dropped so it sits transparent on the section,
// and the fill is driven by currentColor instead of a hardcoded hex. The
// viewBox is tightened to the polygon's own bounds (the file pads it by 14% on
// every side), so the arrow aligns flush with the layout's edges.
function BrandArrow({ className }: { className?: string }) {
  return (
    <svg viewBox="42.01 42.01 215.98 215.98" aria-hidden className={className}>
      <polygon
        fill="currentColor"
        points="42.01 42.01 42.01 82.77 188.41 82.77 42.01 229.17 70.83 257.99 217.23 111.59 217.23 257.99 257.99 257.99 257.99 42.01 42.01 42.01"
      />
    </svg>
  );
}

export function CtaSection() {
  return (
    <section className="flex justify-center bg-white px-8 pb-[130px] pt-[70px] sm:px-14">
      {/* DOM order keeps the message first so it leads on narrow screens; on
          desktop the arrow is placed into the left column instead. */}
      <div className="grid w-full max-w-[1040px] grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.35fr]">
        <div className="flex flex-col items-start gap-7 lg:col-start-2">
          <h2 className="m-0 text-[clamp(38px,4.6vw,62px)] font-black leading-[0.98] tracking-[-0.02em]">
            Aceite o desafio.
          </h2>
          <p className="m-0 max-w-[440px] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-[#444]">
            Entre na lista e seja avisado assim que as inscrições abrirem.
          </p>
          <NotifySignup variant="cta" />
        </div>

        <BrandArrow className="w-[130px] text-black sm:w-[165px] lg:col-start-1 lg:row-start-1 lg:w-full lg:max-w-[230px]" />
      </div>
    </section>
  );
}
