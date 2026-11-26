"use client";

import { useState } from "react";

import { track } from "@/lib/analytics/events";
import { useCopy } from "@/lib/i18n/context";

import styles from "./home.module.css";

/** `canonicalQuestions` are the Portuguese texts, so analytics has one row per question. */
export function HomeFaq({ canonicalQuestions }: { canonicalQuestions: readonly string[] }) {
  const { t } = useCopy();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <ul className={styles.faqList}>
      {t.faq.items.map((item, index) => {
        const open = openIndex === index;
        const panelId = `faq-panel-${index}`;

        return (
          <li key={index} className={`t-acc ${styles.faqItem}`} data-open={open ? "true" : "false"}>
            <h3 className={styles.faqHeading}>
              <button
                type="button"
                className={styles.faqButton}
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => {
                  if (!open) {
                    track("faq_opened", {
                      question: canonicalQuestions[index] ?? item.question,
                      position: index + 1,
                    });
                  }
                  setOpenIndex(open ? null : index);
                }}
              >
                <span>{item.question}</span>
                <span className={styles.faqIcon} aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} className="t-acc-panel">
              <div className="t-acc-panel-inner" inert={open ? undefined : true}>
                <p className={styles.faqAnswer}>{item.answer}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
