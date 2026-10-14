"use client";

import { useEffect } from "react";

import { TRACKED_SECTIONS, track } from "@/lib/analytics/events";

/**
 * Reports each landing section once, the first time a third of it is on
 * screen. Read in page order, the events show how far down people scroll
 * before they leave.
 */
export function SectionTracker() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          track("section_viewed", { section: entry.target.id });
          observer.unobserve(entry.target);
        });
      },
      // Tall sections never reach a third of themselves on a short phone, so
      // the viewport-relative margin keeps them countable.
      { threshold: 0.33, rootMargin: "0px 0px -20% 0px" },
    );

    TRACKED_SECTIONS.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
