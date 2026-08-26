export type FaqItem = {
  question: string;
  answer: string;
};

export const faqItems: readonly FaqItem[] = [
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
    answer:
      "Sim. Nossa staff, os mentores e os judges ficam com você do começo ao fim.",
  },
] as const;
