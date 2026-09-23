export type Stat = {
  count: number;
  prefix?: string;
  suffix?: string;
  label: string;
  accent?: boolean;
};

export const stats: readonly Stat[] = [
  { count: 2, label: "dias de evento" },
  { count: 200, prefix: "+", label: "participantes no dia aberto" },
  { count: 120, label: "participantes no hackathon" },
  { count: 100, suffix: "%", label: "gratuito", accent: true },
] as const;
