import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { privacyConfig } from "@/content/privacy";
import { siteConfig } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como o ${siteConfig.name} trata dados pessoais da waitlist e inscrições.`,
  alternates: {
    canonical: "/privacidade",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col px-8 py-16 sm:px-14">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#666] transition-colors hover:text-black"
        >
          ← Voltar
        </Link>

        <h1 className="m-0 text-[clamp(36px,5vw,48px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          Política de privacidade
        </h1>
        <p className="m-0 mt-4 text-base leading-relaxed text-[#444]">
          Esta política descreve como tratamos dados pessoais no site do{" "}
          {siteConfig.name}.
        </p>

        <div className="mt-10 flex flex-col gap-8 text-base leading-relaxed text-[#333]">
          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold text-black">Controlador dos dados</h2>
            <p className="m-0">
              {privacyConfig.controllerName}, responsável pela organização e pelo
              site do {siteConfig.name}. Para questões relacionadas à privacidade e
              proteção de dados, entre em contato pelo e-mail{" "}
              <a
                href={`mailto:${privacyConfig.controllerEmail}`}
                className="font-semibold text-black underline decoration-htp-blue underline-offset-4"
              >
                {privacyConfig.controllerEmail}
              </a>
              .
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold text-black">Finalidade do tratamento</h2>
            <p className="m-0">
              Utilizamos o endereço de e-mail para enviar avisos sobre a abertura
              das inscrições do hackathon e, futuramente, para processar inscrições
              de equipes participantes.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold text-black">Base legal</h2>
            <p className="m-0">
              O tratamento é realizado com base no consentimento do titular (LGPD,
              art. 7º, inciso I). Registramos a data e a versão do texto aceito no
              momento da inscrição.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold text-black">Dados coletados</h2>
            <p className="m-0">
              Na waitlist, coletamos: endereço de e-mail, origem do formulário
              (seção principal ou rodapé da página), data do consentimento, versão
              do texto aceito e informações técnicas do navegador (user-agent). Não
              armazenamos endereço IP.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold text-black">Prazo de retenção</h2>
            <p className="m-0">
              Os dados serão mantidos por até{" "}
              {privacyConfig.dataRetentionMonthsAfterEvent} meses após a realização
              do evento e, em seguida, excluídos, salvo obrigação legal em contrário.
            </p>
          </section>

          <section className="flex flex-col gap-3">
            <h2 className="m-0 text-xl font-bold text-black">Direitos do titular</h2>
            <p className="m-0">
              Você pode solicitar acesso, correção ou exclusão dos seus dados pelo
              e-mail indicado acima. Comunicações enviadas pela lista incluirão
              opção de descadastro.
            </p>
          </section>
        </div>
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
