"use client";

import { useEffect, useRef } from "react";
import { business } from "@/data/baTo";
import VietnamesePattern from "@/components/VietnamesePattern";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function FoodTicker() {
  const rootRef = useRef(null);
  const trackRef = useRef(null);
  const reduced = useReducedMotion();
  const items = [...business.tickerItems, ...business.tickerItems];

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced || !trackRef.current) return;

      const width = trackRef.current.scrollWidth / 2;
      gsap.fromTo(
        trackRef.current,
        { x: 0 },
        {
          x: -width,
          duration: 48,
          ease: "none",
          repeat: -1,
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-moss py-5 text-cocoa"
      aria-label="Featured dishes"
    >
      <VietnamesePattern
        variant="woven"
        opacity={0.08}
        tone="brown"
        className="absolute inset-0"
      />
      <div className="relative overflow-hidden">
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 whitespace-nowrap will-change-transform"
        >
          {items.map((item, i) => (
            <span key={`${item}-${i}`} className="flex items-center gap-6">
              <span className="font-display font-viet text-xl font-semibold tracking-[0.12em] text-cocoa md:text-2xl">
                {item}
              </span>
              <span className="text-roasted/50" aria-hidden>
                /
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
