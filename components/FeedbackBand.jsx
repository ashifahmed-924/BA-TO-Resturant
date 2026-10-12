"use client";

import { useEffect, useRef, useState } from "react";
import { business } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function FeedbackBand() {
  const rootRef = useRef(null);
  const quoteRef = useRef(null);
  const bgRef = useRef(null);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const themes = business.feedbackThemes;
  const current = themes[index];

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      const st = ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top 60%",
        end: "bottom 40%",
        onUpdate: (self) => {
          const next = Math.min(
            themes.length - 1,
            Math.floor(self.progress * themes.length)
          );
          setIndex((prev) => (prev !== next ? next : prev));
        },
      });

      return () => st.kill();
    }, rootRef);

    return () => ctx.revert();
  }, [reduced, themes.length]);

  useEffect(() => {
    const { gsap } = registerGsap();
    if (reduced || !quoteRef.current) return;
    gsap.fromTo(
      quoteRef.current,
      { x: 40, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }
    );
    if (bgRef.current) {
      gsap.to(bgRef.current, { opacity: 0.07, duration: 0.4 });
    }
  }, [index, reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-vanilla px-5 py-28 md:px-10 md:py-36"
      aria-label="Public customer feedback themes"
    >
      <div
        ref={bgRef}
        className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-[clamp(5rem,22vw,16rem)] font-semibold text-cocoa opacity-[0.07]"
        aria-hidden
      >
        {current?.theme}
      </div>

      <div className="relative z-10 mx-auto max-w-[1000px]">
        <p className="text-xs tracking-[0.22em] text-deep-ash">
          PUBLIC CUSTOMER FEEDBACK
        </p>
        <p className="mt-2 text-xs text-walnut">
          Paraphrased themes from public reviews — not invented quotations or
          attributed names.
        </p>

        <blockquote
          ref={quoteRef}
          className="font-display mt-12 text-[clamp(1.6rem,4vw,2.8rem)] font-medium leading-snug text-cocoa"
        >
          “{current?.text}”
        </blockquote>

        <div className="mt-10 flex gap-2" aria-hidden>
          {themes.map((t, i) => (
            <span
              key={t.id}
              className={`h-1 w-10 rounded-full transition-colors ${
                i === index ? "bg-cocoa" : "bg-ash/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
