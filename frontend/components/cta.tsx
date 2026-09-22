import Image from "next/image";
import { NotifySignup } from "@/components/notify-signup";

export function CtaSection() {
  return (
    <section className="flex flex-col items-center rounded-t-[24px] bg-black px-5 pt-16 text-white sm:rounded-t-[30px] sm:px-14 sm:pt-[clamp(96px,11vw,150px)]">
      <div className="flex w-full max-w-[720px] flex-col items-center gap-6 pb-16 text-center sm:gap-8 sm:pb-[clamp(96px,11vw,150px)]">
        <h2 className="m-0 text-[clamp(40px,5.6vw,80px)] font-black leading-[0.98] tracking-[-0.03em]">
          Aceite o desafio.
        </h2>
        <p className="m-0 max-w-[520px] text-[clamp(16px,1.4vw,19px)] leading-relaxed text-[#aaa]">
          Entre na lista e seja avisado assim que as inscrições abrirem.
        </p>
        <NotifySignup variant="cta" />
      </div>

      <footer className="flex w-full max-w-[1040px] flex-col items-center gap-3 border-t border-[#2a2a2a] px-0 pb-8 pt-6 text-center text-[13px] font-medium tracking-[0.06em] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4 sm:pb-9 sm:pt-7 sm:text-left">
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
