"use client";

import { useEffect, useRef } from "react";
import { specials, formatPrice, business } from "@/data/baTo";
import SectionLabel from "@/components/SectionLabel";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const slipTones = [
  { bg: "bg-rice", rot: -3 },
  { bg: "bg-vanilla", rot: 2 },
  { bg: "bg-moss", rot: -1 },
];

export default function SpecialsSection() {
  const rootRef = useRef(null);
  const slipsRef = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      slipsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          {
            y: 60,
            rotate: slipTones[i]?.rot ?? 0,
            opacity: 0,
          },
          {
            y: 0,
            rotate: (slipTones[i]?.rot ?? 0) * 0.25,
            opacity: 1,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            },
            delay: i * 0.08,
          }
        );
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="specials"
      className="relative bg-vanilla px-5 py-24 texture-linen md:px-10 md:py-32"
      aria-label="Special and weekend menu"
    >
      <div className="mx-auto max-w-[1000px]">
        <SectionLabel number="04" label="TODAY AT BÀ TỒ" />
        <h2 className="font-display mt-6 text-[clamp(2.4rem,6vw,4.8rem)] font-semibold leading-[0.95] text-cocoa">
          ON THE
          <br />
          SPECIAL MENU.
        </h2>
        <p className="mt-5 max-w-lg text-sm leading-relaxed text-deep-ash md:text-base">
          Rotating and weekend dishes appear on current ordering platforms.
          These are not everyday staples — availability changes. No
          restaurant-owned discount promotions are listed here.
        </p>

        <div className="mt-14 space-y-6 md:space-y-8">
          {specials.map((item, i) => (
            <article
              key={item.id}
              ref={(el) => {
                slipsRef.current[i] = el;
              }}
              className={`relative mx-auto max-w-xl border border-cocoa/10 px-6 py-7 shadow-[2px_4px_0_rgba(0,0,0,0.35)] md:px-10 md:py-9 ${slipTones[i % slipTones.length].bg}`}
            >
              <span className="absolute right-4 top-4 rotate-12 text-[0.6rem] font-semibold tracking-[0.16em] text-accent md:right-6 md:top-6">
                {item.availabilityLabel}
              </span>
              <h3 className="font-display pr-24 text-2xl font-semibold text-cocoa md:text-3xl">
                {item.name}
              </h3>
              <p className="mt-5 font-display text-lg text-roasted">
                {formatPrice(item)}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-center text-xs tracking-wide text-walnut">
          {business.hoursNote}
        </p>
      </div>
    </section>
  );
}
