import { describe, expect, it } from "vitest";

import { faqItems } from "@/content/faq";
import { siteConfig } from "@/content/site";
import { createEventJsonLd, createFaqJsonLd } from "@/lib/seo";

function findNode(type: string) {
  const node = createEventJsonLd()["@graph"].find((entry) => entry["@type"] === type);
  if (!node) throw new Error(`missing ${type} node`);
  return node as Record<string, unknown>;
}

describe("createEventJsonLd", () => {
  it("sends the offer to the site, where the waitlist lives", () => {
    const offers = findNode("Event").offers as { url: string; price: string };

    expect(offers.url).toBe(siteConfig.url);
    expect(offers.price).toBe("0");
  });

  it("links the organization to the event's own Instagram", () => {
    const sameAs = findNode("Organization").sameAs as string[];

    expect(sameAs).toContain("https://instagram.com/hackthepath");
  });

  it("gives the event an absolute logo and image", () => {
    expect(String(findNode("Organization").logo)).toMatch(/^https?:\/\//);
    expect(String(findNode("Event").image)).toMatch(/^https?:\/\//);
  });
});

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
