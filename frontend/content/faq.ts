import { copy } from "@/content/copy";

export type FaqItem = {
  question: string;
  answer: string;
};

/** Portuguese FAQ, kept for the /harry preview; the live site reads content/copy. */
export const faqItems: readonly FaqItem[] = copy.pt.faq.items;
