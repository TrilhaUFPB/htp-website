import type { Locale } from "@/lib/i18n/config";

/**
 * Every visible string on the live site, per language. Plain data only: the
 * whole object for the active language is handed to client components, so no
 * functions here. Values that need filling in use `{name}` placeholders.
 */

const pt = {
  htmlLang: "pt-BR",
  ogLocale: "pt_BR",
  meta: {
    title: "Hack The Path 2027 — O maior hackathon do Nordeste",
    description:
      "Hackathon gratuito para estudantes, 20 e 21 de fevereiro de 2027, na Grande João Pessoa. Um dia de palestras e empresas, um dia de código. Entre na lista.",
    ogAlt: "Hack The Path — O maior hackathon da história do Nordeste",
    eventDescription:
      "Dois dias de evento presencial e gratuito para estudantes. No dia 20, palestras, talks e stands de empresas, aberto a todos. No dia 21, o hackathon, com participantes selecionados, mentoria, pitches e premiação.",
    locationName: "Grande João Pessoa",
    privacyTitle: "Política de privacidade",
    privacyDescription: "Como o {name} trata dados pessoais da waitlist e inscrições.",
    notFoundTitle: "Página não encontrada",
  },
  common: {
    skipToContent: "Pular para o conteúdo",
    homeAria: "Hack The Path — início",
    navAria: "Navegação principal",
    switchLanguageAria: "Mudar idioma para English",
  },
  nav: {
    sponsors: "Patrocinadores",
    about: "Sobre",
    schedule: "Programação",
    when: "Quando e onde",
    faq: "Dúvidas",
  },
  hero: {
    lead: "O maior hackathon",
    strong: "da história",
    strongBreak: "do Nordeste",
  },
  sponsors: {
    label: "Com o apoio de",
    cta: "Leve sua marca →",
    opensInNewTab: "abre em nova aba",
  },
  about: {
    paragraph:
      "Dois dias de evento presencial. Hackathon, palestras, talks e conversas com empresas, o ambiente ideal para hackear sua própria trajetória até lugares que antes pareciam impossíveis.",
    features: [
      {
        title: "Competição",
        description: "Projeto real, do zero ao pitch final, exposto a mais de 150 países.",
      },
      {
        title: "Conexão",
        description: "Mentores, jurados e empresas presentes durante todo o evento.",
      },
      {
        title: "Experiência",
        description: "Um evento pensado para mudar a forma como você pensa.",
      },
    ],
  },
  schedule: {
    eyebrow: "Programação",
    headingLine1: "Dois dias.",
    headingLine2: "Duas portas.",
    days: [
      {
        number: "01",
        date: "20 fev",
        access: "Aberto a todos",
        title: "Palestras, talks e stands de empresas.",
        description:
          "Qualquer estudante, de qualquer curso ou cidade. Você ouve, conversa e encontra quem já está onde você quer chegar.",
        participants: "+200 participantes",
        count: 0,
      },
      {
        number: "02",
        date: "21 fev",
        access: "Só selecionados",
        title: "Hackathon, pitches, judges e premiação.",
        description:
          "Do zero ao pitch final. Staff, mentores e judges ficam com você do começo ao fim.",
        participants: "participantes",
        count: 100,
      },
    ],
  },
  stats: [
    { count: 2, label: "dias de evento" },
    { count: 200, prefix: "+", label: "participantes no dia aberto" },
    { count: 100, label: "participantes no hackathon" },
    { count: 100, suffix: "%", label: "gratuito", accent: true },
  ],
  when: {
    eyebrow: "Quando",
    dateLine1: "20–21",
    dateLine2: "fev",
    dateYear: "27",
    where: "Onde",
    venuePending: "O local exato será anunciado em breve.",
  },
  faq: {
    eyebrow: "Dúvidas",
    headingLine1: "Perguntas",
    headingLine2: "frequentes.",
    items: [
      {
        question: "Preciso saber programar?",
        answer:
          "Sim. Mas não precisa ser o melhor da turma, nem ser de computação. Só precisa construir.",
      },
      {
        question: "Quem pode participar?",
        answer:
          "Qualquer estudante, de qualquer curso ou cidade. O segundo dia é só para quem foi selecionado para o hackathon.",
      },
      {
        question: "Tem idade mínima?",
        answer: "Sim. Para participar, você precisa ter 18 anos ou mais.",
      },
      {
        question: "Quando abrem as inscrições?",
        answer: "Em janeiro de 2027. Entre na lista e avisamos no dia em que abrirem.",
      },
      {
        question: "Quanto custa?",
        answer: "Nada. O evento é 100% gratuito.",
      },
      {
        question: "Como funcionam os dois dias?",
        answer:
          "O primeiro dia é aberto a todos, com palestras, talks e stands de empresas. O segundo é o hackathon, com pitches, judges e premiação.",
      },
      {
        question: "Vou ter apoio durante a competição?",
        answer: "Sim. Nossa staff, os mentores e os judges ficam com você do começo ao fim.",
      },
    ],
  },
  cta: {
    eyebrow: "Inscrições em breve",
    heading: "Aceite o desafio.",
    body: "Entre na lista e seja avisado assim que as inscrições abrirem.",
  },
  signup: {
    button: "Quero ser avisado",
    close: "Fechar",
    closeAria: "Fechar",
    successTitle: "Você está na lista.",
    successBody:
      "Te avisamos assim que as inscrições abrirem. Enquanto isso, convide mais gente para o Hack The Path.",
    copyInvite: "Copiar link de convite",
    copied: "Link copiado",
    copiedAnnouncement: "Link copiado para a área de transferência.",
    title: "Quero ser avisado",
    description: "Deixe seu e-mail e avisamos quando as inscrições abrirem.",
    emailLabel: "E-mail",
    emailPlaceholder: "seu@email.com",
    consentLabel: "Aceito receber avisos sobre o Hack The Path e concordo com a",
    consentLink: "política de privacidade",
    submit: "Entrar na lista",
    submitting: "Enviando...",
    errorInvalidEmail: "Informe um e-mail válido.",
    errorGeneric: "Não foi possível enviar. Tente de novo.",
  },
  footer: {
    instagram: "@hackthepath",
  },
  notFound: {
    code: "Erro 404",
    heading: "Caminho não encontrado.",
    body: "Essa rota não existe ou ainda não foi hackeada. Volte para a página inicial e continue no path.",
    back: "Voltar ao início",
  },
  privacy: {
    back: "← Voltar",
    title: "Política de privacidade",
    intro: "Esta política descreve como tratamos dados pessoais no site do {name}.",
    sections: {
      controller: {
        title: "Controlador dos dados",
        body: "{controller}, responsável pela organização e pelo site do {name}. Para questões relacionadas à privacidade e proteção de dados, entre em contato pelo e-mail",
      },
      purpose: {
        title: "Finalidade do tratamento",
        body: "Utilizamos o endereço de e-mail para enviar avisos sobre a abertura das inscrições do hackathon e, futuramente, para processar inscrições de equipes participantes.",
      },
      legalBasis: {
        title: "Base legal",
        body: "O tratamento é realizado com base no consentimento do titular (LGPD, art. 7º, inciso I). Registramos a data e a versão do texto aceito no momento da inscrição.",
      },
      data: {
        title: "Dados coletados",
        body: "Na waitlist, coletamos: endereço de e-mail, origem do formulário (seção principal ou chamada final da página), data do consentimento, versão do texto aceito e informações técnicas do navegador (user-agent). Não armazenamos endereço IP.",
      },
      metrics: {
        title: "Métricas de uso",
        body: "Medimos visitas e cliques de forma agregada com o PostHog, para saber de onde vêm os visitantes e quantos entram na lista. A medição não usa cookies nem armazenamento no navegador, não registra seu e-mail e não grava a sua sessão. O endereço IP não é guardado junto aos eventos.",
      },
      retention: {
        title: "Prazo de retenção",
        body: "Os dados serão mantidos por até {months} meses após a realização do evento e, em seguida, excluídos, salvo obrigação legal em contrário.",
      },
      rights: {
        title: "Direitos do titular",
        body: "Você pode solicitar acesso, correção ou exclusão dos seus dados pelo e-mail indicado acima. Comunicações enviadas pela lista incluirão opção de descadastro.",
      },
      language: {
        title: "Idioma",
        body: "Guardamos a sua escolha de idioma (português ou inglês) em um cookie funcional chamado htp-lang, por até um ano. Ele não identifica você nem é usado para medição.",
      },
    },
  },
};

type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? Widen<U>[]
        : { [K in keyof T]: Widen<T[K]> };

export type Copy = Widen<typeof pt>;

const en: Copy = {
  htmlLang: "en",
  ogLocale: "en_US",
  meta: {
    title: "Hack The Path 2027 — The biggest hackathon in Northeast Brazil",
    description:
      "A free hackathon for students, February 20–21, 2027, in Greater João Pessoa, Brazil. One day of talks and companies, one day of code. Join the waitlist.",
    ogAlt: "Hack The Path — The biggest hackathon in the history of Northeast Brazil",
    eventDescription:
      "Two days of free, in-person events for students. On the 20th, talks and company booths, open to everyone. On the 21st, the hackathon, with selected participants, mentoring, pitches and prizes.",
    locationName: "Greater João Pessoa",
    privacyTitle: "Privacy policy",
    privacyDescription: "How {name} handles personal data from the waitlist and registrations.",
    notFoundTitle: "Page not found",
  },
  common: {
    skipToContent: "Skip to content",
    homeAria: "Hack The Path — home",
    navAria: "Main navigation",
    switchLanguageAria: "Switch language to Português",
  },
  nav: {
    sponsors: "Sponsors",
    about: "About",
    schedule: "Schedule",
    when: "When & where",
    faq: "FAQ",
  },
  hero: {
    lead: "The biggest hackathon",
    strong: "in the history of",
    strongBreak: "Northeast Brazil",
  },
  sponsors: {
    label: "Supported by",
    cta: "Put your brand here →",
    opensInNewTab: "opens in a new tab",
  },
  about: {
    paragraph:
      "Two days of in-person events. A hackathon, talks and conversations with companies: the ideal place to hack your own path to places that once seemed impossible.",
    features: [
      {
        title: "Competition",
        description: "A real project, from zero to the final pitch, exposed to more than 150 countries.",
      },
      {
        title: "Connection",
        description: "Mentors, judges and companies on site throughout the event.",
      },
      {
        title: "Experience",
        description: "An event designed to change the way you think.",
      },
    ],
  },
  schedule: {
    eyebrow: "Schedule",
    headingLine1: "Two days.",
    headingLine2: "Two doors.",
    days: [
      {
        number: "01",
        date: "Feb 20",
        access: "Open to everyone",
        title: "Talks and company booths.",
        description:
          "Any student, from any major or city. You listen, talk, and meet people who are already where you want to get.",
        participants: "+200 participants",
        count: 0,
      },
      {
        number: "02",
        date: "Feb 21",
        access: "Selected only",
        title: "Hackathon, pitches, judges and prizes.",
        description:
          "From zero to the final pitch. Staff, mentors and judges stay with you from start to finish.",
        participants: "participants",
        count: 100,
      },
    ],
  },
  stats: [
    { count: 2, label: "days of event" },
    { count: 200, prefix: "+", label: "participants on the open day" },
    { count: 100, label: "participants in the hackathon" },
    { count: 100, suffix: "%", label: "free", accent: true },
  ],
  when: {
    eyebrow: "When",
    dateLine1: "20–21",
    dateLine2: "Feb",
    dateYear: "27",
    where: "Where",
    venuePending: "The exact venue will be announced soon.",
  },
  faq: {
    eyebrow: "FAQ",
    headingLine1: "Frequently",
    headingLine2: "asked questions.",
    items: [
      {
        question: "Do I need to know how to code?",
        answer:
          "Yes. But you don't have to be the best in your class, or study computer science. You just have to build.",
      },
      {
        question: "Who can take part?",
        answer:
          "Any student, from any major or city. The second day is only for those selected for the hackathon.",
      },
      {
        question: "Is there a minimum age?",
        answer: "Yes. To take part, you must be 18 or older.",
      },
      {
        question: "When does registration open?",
        answer: "In January 2027. Join the waitlist and we'll let you know the day it opens.",
      },
      {
        question: "How much does it cost?",
        answer: "Nothing. The event is 100% free.",
      },
      {
        question: "How do the two days work?",
        answer:
          "The first day is open to everyone, with talks and company booths. The second is the hackathon, with pitches, judges and prizes.",
      },
      {
        question: "Will I get support during the competition?",
        answer: "Yes. Our staff, mentors and judges stay with you from start to finish.",
      },
    ],
  },
  cta: {
    eyebrow: "Registration opening soon",
    heading: "Accept the challenge.",
    body: "Join the waitlist and get notified as soon as registration opens.",
  },
  signup: {
    button: "Notify me",
    close: "Close",
    closeAria: "Close",
    successTitle: "You're on the list.",
    successBody:
      "We'll let you know as soon as registration opens. In the meantime, invite more people to Hack The Path.",
    copyInvite: "Copy invite link",
    copied: "Link copied",
    copiedAnnouncement: "Link copied to the clipboard.",
    title: "Notify me",
    description: "Leave your email and we'll let you know when registration opens.",
    emailLabel: "Email",
    emailPlaceholder: "you@email.com",
    consentLabel: "I agree to receive updates about Hack The Path and accept the",
    consentLink: "privacy policy",
    submit: "Join the waitlist",
    submitting: "Sending...",
    errorInvalidEmail: "Enter a valid email address.",
    errorGeneric: "We couldn't send that. Please try again.",
  },
  footer: {
    instagram: "@hackthepath",
  },
  notFound: {
    code: "Error 404",
    heading: "Path not found.",
    body: "This route doesn't exist, or hasn't been hacked yet. Head back to the home page and get back on the path.",
    back: "Back to home",
  },
  privacy: {
    back: "← Back",
    title: "Privacy policy",
    intro: "This policy describes how we handle personal data on the {name} website.",
    sections: {
      controller: {
        title: "Data controller",
        body: "{controller}, responsible for organizing {name} and running its website. For questions about privacy and data protection, contact us at",
      },
      purpose: {
        title: "Purpose of processing",
        body: "We use your email address to send updates about the opening of hackathon registration and, later, to process registrations from participating teams.",
      },
      legalBasis: {
        title: "Legal basis",
        body: "Processing is based on the data subject's consent (LGPD, art. 7, item I). We record the date and the version of the text accepted at sign-up.",
      },
      data: {
        title: "Data we collect",
        body: "For the waitlist, we collect: email address, the form's origin (main section or the page's closing call to action), consent date, the version of the text accepted, and technical browser information (user-agent). We do not store IP addresses.",
      },
      metrics: {
        title: "Usage metrics",
        body: "We measure visits and clicks in aggregate with PostHog, to learn where visitors come from and how many join the list. The measurement uses no cookies or browser storage, does not record your email, and does not record your session. IP addresses are not stored with events.",
      },
      retention: {
        title: "Retention period",
        body: "Data is kept for up to {months} months after the event takes place and then deleted, unless the law requires otherwise.",
      },
      rights: {
        title: "Your rights",
        body: "You can request access to, correction of, or deletion of your data at the email address above. Messages sent through the list will include an unsubscribe option.",
      },
      language: {
        title: "Language",
        body: "We save your language choice (Portuguese or English) in a functional cookie called htp-lang, for up to one year. It does not identify you and is not used for measurement.",
      },
    },
  },
};

export const copy: Record<Locale, Copy> = { pt, en };
