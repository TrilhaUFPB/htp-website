import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <main className="flex flex-1 flex-col items-center justify-center px-8 py-20 text-center sm:px-14">
        <p className="m-0 text-[13px] font-semibold uppercase tracking-[0.2em] text-htp-blue">
          Erro 404
        </p>
        <h1 className="m-0 mt-8 text-[clamp(72px,14vw,160px)] font-black leading-none tracking-[-0.04em]">
          404
        </h1>
        <h2 className="m-0 mt-8 max-w-[640px] text-[clamp(28px,3.5vw,44px)] font-extrabold leading-[1.08] tracking-[-0.02em]">
          Caminho não encontrado.
        </h2>
        <p className="m-0 mt-5 max-w-[420px] text-[clamp(16px,1.4vw,18px)] leading-relaxed text-[#444]">
          Essa rota não existe ou ainda não foi hackeada. Volte para a página
          inicial e continue no path.
        </p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-3 rounded-full bg-black px-10 py-[18px] text-[17px] font-bold tracking-[0.02em] text-white transition-colors hover:bg-htp-blue hover:text-black hover:opacity-100"
        >
          Voltar ao início <span aria-hidden>→</span>
        </Link>
      </main>

      <footer className="flex w-full flex-wrap items-center justify-between gap-4 border-t border-[#eee] px-8 pb-9 pt-7 text-[13px] font-medium tracking-[0.06em] sm:px-14">
        <Image
          src="/images/logo/png/hack-the-path-01.png"
          alt="Hack The Path"
          width={3128}
          height={637}
          className="h-[22px] w-auto"
        />
        <Link href="/" className="text-[#666] hover:text-black">
          hackthepath.com.br
        </Link>
      </footer>
    </div>
  );
}
