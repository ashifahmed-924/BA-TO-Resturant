"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { drinksNote } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function DrinksDessert() {
  const rootRef = useRef(null);
  const maskRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.set(maskRef.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.to(maskRef.current, {
        clipPath: "inset(0% 0 0 0)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
      gsap.from(rootRef.current.querySelectorAll("[data-drink-text]"), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="bg-soft-vanilla px-5 py-24 md:px-10 md:py-32"
      aria-label="Drinks and desserts"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-2">
        <div>
          <p data-drink-text className="text-xs tracking-[0.22em] text-ash">
            08 / SIPS
          </p>
          <h2
            data-drink-text
            className="font-display mt-4 text-[clamp(2.4rem,6vw,4.2rem)] font-semibold leading-[0.95] text-cocoa"
          >
            DRINKS
            <br />
            &amp; DESSERT.
          </h2>
          <p
            data-drink-text
            className="mt-6 max-w-md text-base leading-relaxed text-deep-ash"
          >
            {drinksNote}
          </p>
          <p data-drink-text className="mt-6 text-sm text-walnut">
            Current public ordering categories include desserts, special teas,
            iced beverages and cold beverages. Exact names and prices change —
            ask in store or check the order platform.
          </p>
        </div>

        <div
          ref={maskRef}
          className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden"
          data-cursor="VIEW"
        >
          <Image
            src="/images/ba-to/drink.jpg"
            alt="Illustrative tall iced Vietnamese-style beverage"
            fill
            sizes="(max-width: 1024px) 90vw, 400px"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
