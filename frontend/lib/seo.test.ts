import { describe, expect, it } from "vitest";

import { faqItems } from "@/content/faq";
import { createFaqJsonLd } from "@/lib/seo";

describe("createFaqJsonLd", () => {
  it("marks up the page as a schema.org FAQPage", () => {
    const jsonLd = createFaqJsonLd();

    expect(jsonLd["@context"]).toBe("https://schema.org");
    expect(jsonLd["@type"]).toBe("FAQPage");
  });

  it("carries every visible question, in the same order", () => {
    const jsonLd = createFaqJsonLd();

    expect(jsonLd.mainEntity.map((entry) => entry.name)).toEqual(
      faqItems.map((item) => item.question),
    );
  });

  it("pairs each question with the answer shown on the page", () => {
    const jsonLd = createFaqJsonLd();

    for (const [index, entry] of jsonLd.mainEntity.entries()) {
      expect(entry["@type"]).toBe("Question");
      expect(entry.acceptedAnswer["@type"]).toBe("Answer");
      expect(entry.acceptedAnswer.text).toBe(faqItems[index].answer);
    }
  });
});

describe("faqItems", () => {
  it("has no blank question or answer", () => {
    for (const item of faqItems) {
      expect(item.question.trim()).not.toBe("");
      expect(item.answer.trim()).not.toBe("");
    }
  });

  it("has no duplicate questions", () => {
    const questions = faqItems.map((item) => item.question);

    expect(new Set(questions).size).toBe(questions.length);
  });
});
