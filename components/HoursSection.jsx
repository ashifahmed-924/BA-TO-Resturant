"use client";

import { useEffect, useRef } from "react";
import { business } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function HoursSection() {
  const rootRef = useRef(null);
  const giantRef = useRef(null);
  const rowsRef = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.fromTo(
        giantRef.current,
        { letterSpacing: "0.2em", opacity: 0.6 },
        {
          letterSpacing: "0.02em",
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );

      rowsRef.current.forEach((row, i) => {
        if (!row) return;
        const line = row.querySelector("[data-hour-line]");
        gsap.from(row, {
          y: 30,
          opacity: 0,
          duration: 0.45,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        });
        if (line) {
          gsap.fromTo(
            line,
            { scaleX: 0 },
            {
              scaleX: 1,
              duration: 0.5,
              delay: 0.15 + i * 0.06,
              ease: "power3.out",
              scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
            }
          );
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="hours"
      className="bg-soft-vanilla px-5 py-24 texture-linen md:px-10 md:py-32"
      aria-label="Opening hours"
    >
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-2 lg:items-start">
        <div>
          <p className="text-xs tracking-[0.22em] text-ash">09 / HOURS</p>
          <p
            ref={giantRef}
            className="font-display mt-4 text-[clamp(4.5rem,16vw,10rem)] font-semibold leading-none text-cocoa"
          >
            9AM
          </p>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-walnut">
            {business.hoursNote}
          </p>
        </div>

        <div className="pt-2">
          <ul>
            {business.hoursStructured.map((row, i) => (
              <li
                key={row.day}
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                className="relative py-4"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <span className="w-12 text-xs font-semibold tracking-[0.18em] text-deep-ash">
                    {row.short}
                  </span>
                  <span
                    className={`flex-1 text-right font-display text-lg md:text-xl ${
                      row.open ? "text-cocoa" : "text-ash"
                    }`}
                  >
                    {row.hours}
                  </span>
                </div>
                {row.note && (
                  <p className="mt-1 text-right text-xs text-walnut">
                    {row.note}
                  </p>
                )}
                <span
                  data-hour-line
                  className="absolute bottom-0 left-0 h-px w-full origin-left bg-roasted/30"
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
