import Image from "next/image";
import { NotifySignup } from "@/components/notify-signup";

export function CtaSection() {
  return (
    <section className="flex flex-col items-center rounded-t-[30px] bg-black px-8 pt-[clamp(96px,11vw,150px)] text-white sm:px-14">
      <div className="flex w-full max-w-[720px] flex-col items-center gap-8 pb-[clamp(96px,11vw,150px)] text-center">
        <h2 className="m-0 text-[clamp(40px,5.6vw,80px)] font-black leading-[0.98] tracking-[-0.03em]">
          Aceite o desafio.
        </h2>
        <p className="m-0 max-w-[520px] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-[#aaa]">
          Entre na lista e seja avisado assim que as inscrições abrirem.
        </p>
        <NotifySignup variant="cta" />
      </div>

      <footer className="flex w-full max-w-[1040px] flex-wrap items-center justify-between gap-4 border-t border-[#2a2a2a] px-0 pb-9 pt-7 text-[13px] font-medium tracking-[0.06em]">
        <Image
          src="/images/logo/png/hack-the-path-03.png"
          alt="Hack The Path"
          width={3128}
          height={1171}
          className="h-[30px] w-auto"
        />
        <a href="https://www.hackthepath.com.br" target="_blank" rel="noopener noreferrer">
          hackthepath.com.br
        </a>
        <a
          href="https://www.instagram.com/hackthepath/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#777]"
        >
          @hackthepath
        </a>
      </footer>
    </section>
  );
}
