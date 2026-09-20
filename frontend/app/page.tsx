import Image from "next/image";
import { sponsors } from "@/content/sponsors";
import Link from "next/link";
import { NotifySignup } from "@/components/notify-signup";
import { Aperture } from "@/components/aperture";
import { ScrollHero } from "@/components/scroll-hero";
import { ScrollHeader } from "@/components/scroll-header";

const questions = [
  ["Preciso saber programar?", "Para o hackathon, sim. Você precisa conseguir construir um projeto, mas não precisa ser o melhor da turma. O primeiro dia é aberto, com palestras, talks e encontros."],
  ["Quem pode participar?", "Estudantes de qualquer curso ou cidade, com 18 anos ou mais. O segundo dia é dedicado a quem for selecionado para o hackathon."],
  ["Quanto custa?", "Nada. O evento é 100% gratuito."],
  ["Como funcionam os dois dias?", "No primeiro dia, palestras, talks e encontros com empresas. No segundo dia, o hackathon: desenvolvimento, mentoria, pitches e premiação."],
  ["Vou ter apoio durante a competição?", "Sim. Nossa equipe e os mentores acompanham você durante a construção do projeto, até o pitch final."],
];

export default function Home() {
  const localPreview = process.env.HTP_LOCAL_PREVIEW === "true";
  return (
    <div className="landing">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: questions.map(([question, answer]) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })) }) }} />
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <ScrollHeader>
        <div className="shell header-inner">
          <Link href="/" aria-label="Hack The Path — início" className="brand">
            <Image src="/images/logo/svg/hack-the-path-02.svg" alt="Hack The Path" width={220} height={45} priority />
          </Link>
          <nav aria-label="Navegação principal">
            <a href="#evento">O evento</a>
            <a href="#programacao">Programação</a>
            <a href="#duvidas">Dúvidas</a>
          </nav>
        </div>
      </ScrollHeader>
      <main id="conteudo">
        <ScrollHero>
        <div className="aperture-hero">
          <div className="hero-art"><Aperture /></div>
          <div className="hero-copy">
            <p className="event-date">João Pessoa, PB</p>
            <h1 id="hero-title" className="welcome-title">Bem vindo ao novo maior<br /><strong>Hackathon do Nordeste</strong></h1>
            <NotifySignup variant="hero" className="signup-button signup-light" localPreview={localPreview} />
          </div>
        </div>
        </ScrollHero>
        <section className="shell sponsor-ribbon" aria-labelledby="partners-title"><div className="sponsor-intro"><p className="eyebrow">Patrocinadores</p><h2 id="partners-title">Quem acredita<br /> nesse encontro.</h2></div><ul>{sponsors.map((sponsor) => <li key={sponsor.name}><a href={sponsor.url} target="_blank" rel="noopener noreferrer" aria-label={`${sponsor.name} (abre em nova aba)`}><Image src={sponsor.logo} alt={sponsor.name} width={sponsor.width} height={sponsor.height} /></a></li>)}</ul></section>

        <div className="shell event-facts" aria-label="Sobre o encontro">
          <span><i />Por estudantes, para estudantes.</span><span>Presencial · João Pessoa, PB</span><a href="#evento">Explore o encontro <span aria-hidden="true">↓</span></a>
        </div>
        <section id="evento" className="shell story-section">
          <div className="story-copy"><p className="eyebrow">01 / Abra seu caminho</p><h2>Você já tem ideias.<br /><strong>Dê a elas um lugar<br />para acontecer.</strong></h2><p className="story-description">Uma conversa que muda sua perspectiva. Uma equipe que compra sua ideia. Um projeto que sai da sua cabeça e ganha o mundo.</p><p className="story-description">O Hack The Path reúne estudantes, mentores e empresas para dois dias de troca e construção. Talento daqui. Possibilidades muito além.</p><a className="text-link" href="#programacao">Veja como vai acontecer <span aria-hidden="true">↗</span></a></div>
          <div className="story-art"><div className="art-caption"><span>HACK YOUR PATH</span><span>001</span></div><Image src="/images/brand/graphics/sphere.svg" alt="" width={360} height={360} /><div className="art-bottom"><span>Mesmas pessoas.<br /><strong>Novos caminhos.</strong></span><span aria-hidden="true">↗</span></div></div>
        </section>
        <section id="programacao" className="shell two-days">
          <div className="section-heading"><div><p className="eyebrow">02 / Dois dias. Um ponto de partida.</p><h2>Primeiro, você se conecta.<br /><strong>Depois, você constrói.</strong></h2></div><p>Encontre novas perspectivas.<br />E descubra o que consegue fazer com elas.</p></div>
          <div className="day-grid">
            <article className="day-panel day-open"><div className="day-top"><span>DIA 01</span><span className="day-tag">Aberto ao público</span></div><div className="day-date">01</div><h3>Saia da sua bolha.</h3><p>Ideias novas começam com gente nova. Um dia de palestras, talks e encontros com quem está construindo o que vem a seguir.</p><ul><li><span>01</span>Palestras & talks</li><li><span>02</span>Conversas com empresas</li><li><span>03</span>Conexões que continuam</li></ul><div className="day-end"><span>Chegue com curiosidade.</span><span aria-hidden="true">↗</span></div></article>
            <article className="day-panel day-build"><div className="day-top"><span>DIA 02</span><span className="day-tag">Hackers selecionados</span></div><div className="day-date">02</div><h3>Faça a ideia existir.</h3><p>Um desafio real, sua equipe e a vontade de fazer acontecer. Construa com apoio de mentores e leve seu projeto até o pitch final.</p><ul><li><span>01</span>Desafio & desenvolvimento</li><li><span>02</span>Mentoria durante a construção</li><li><span>03</span>Pitch final & premiação</li></ul><div className="day-end"><span>Saia com algo seu.</span><span aria-hidden="true">↗</span></div></article>
          </div>
          <p className="schedule-note">A programação completa será anunciada em breve.</p>
        </section>
        <section className="takeaway-section"><div className="shell takeaway-inner"><div className="takeaway-heading"><p className="eyebrow">03 / O que fica</p><h2>O evento acaba.<br /><strong>O caminho continua.</strong></h2><p>Mais do que dois dias na agenda.<br />Um novo ponto de partida.</p></div><div className="takeaway-list"><article><span>01</span><div><h3>Algo que você construiu.</h3><p>Uma ideia colocada à prova. Um projeto para mostrar com orgulho.</p></div></article><article><span>02</span><div><h3>Gente para continuar junto.</h3><p>Novos colegas, mentores e conversas que não precisam terminar no evento.</p></div></article><article><span>03</span><div><h3>Uma nova medida do possível.</h3><p>A experiência de descobrir, na prática, até onde você consegue ir.</p></div></article></div></div></section>
        <section id="duvidas" className="shell faq-section">
          <div className="faq-heading"><p className="eyebrow">04 / Sem dúvidas pelo caminho</p><h2>Pode perguntar.</h2><p>O primeiro passo fica mais fácil<br />quando você sabe o que esperar.</p></div>
          <div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
        </section>
        <section className="shell closing-note"><div><p className="eyebrow">João Pessoa, PB</p><h2>Nos vemos no<br /><strong>Hack The Path.</strong></h2></div><div className="closing-action"><p>As inscrições abrem em breve.<br />Entre na lista para saber primeiro.</p><NotifySignup variant="footer" className="signup-button signup-dark" localPreview={localPreview} /></div></section>

      </main>
      <footer className="shell site-footer"><Image src="/images/logo/svg/hack-the-path-02.svg" alt="Hack The Path" width={158} height={33} /><p>João Pessoa, PB</p><div><a href="https://www.instagram.com/hackthepath/" target="_blank" rel="noopener noreferrer">Instagram ↗</a><Link href="/privacidade">Privacidade</Link></div></footer>
    </div>
  );
}
