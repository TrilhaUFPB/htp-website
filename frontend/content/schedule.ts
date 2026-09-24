export type ScheduleDay = {
  number: string;
  date: string;
  access: string;
  title: string;
  description: string;
  /** Plain participant line; set `count` instead to animate it as a count-up. */
  participants: string;
  count?: number;
};

export const scheduleDays: readonly ScheduleDay[] = [
  {
    number: "01",
    date: "20 fev",
    access: "Aberto a todos",
    title: "Palestras, talks e stands de empresas.",
    description:
      "Qualquer estudante, de qualquer curso ou cidade. Você ouve, conversa e encontra quem já está onde você quer chegar.",
    participants: "+200 participantes",
  },
  {
    number: "02",
    date: "21 fev",
    access: "Só selecionados",
    title: "Hackathon, pitches, judges e premiação.",
    description:
      "Do zero ao pitch final. Staff, mentores e judges ficam com você do começo ao fim.",
    participants: "participantes",
    count: 120,
  },
] as const;
