"use client";

import { useEffect, useRef } from "react";
import VietnamesePattern from "@/components/VietnamesePattern";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function BrownInterlude() {
  const rootRef = useRef(null);
  const bowlsRef = useRef(null);
  const platesRef = useRef(null);
  const togetherRef = useRef(null);
  const borderRef = useRef(null);
  const patternRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(bowlsRef.current, { x: -80, opacity: 0 });
      gsap.set(platesRef.current, { x: 80, opacity: 0 });
      gsap.set(togetherRef.current, { clipPath: "inset(100% 0 0 0)", opacity: 1 });
      gsap.set(patternRef.current, { opacity: 0 });

      const path = borderRef.current;
      if (path) {
        const len = path.getTotalLength?.() || 400;
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 60%" },
        defaults: { ease: "power3.out" },
      });

      tl.to(bowlsRef.current, { x: 0, opacity: 1, duration: 0.7 })
        .to(platesRef.current, { x: 0, opacity: 1, duration: 0.7 }, "-=0.45")
        .to(
          togetherRef.current,
          { clipPath: "inset(0% 0 0 0)", duration: 0.65 },
          "-=0.3"
        );

      if (path) {
        tl.to(path, { strokeDashoffset: 0, duration: 1.2 }, "-=0.5");
      }

      tl.to(patternRef.current, { opacity: 0.08, duration: 0.8 }, "-=0.8");
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-roasted px-5 py-28 text-soft-vanilla md:px-10 md:py-36"
      aria-label="Typographic interlude"
    >
      <div
        ref={patternRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <VietnamesePattern variant="drum" opacity={1} tone="cream" />
      </div>

      <svg
        className="pointer-events-none absolute inset-6 text-soft-vanilla/40 md:inset-10"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          ref={borderRef}
          d="M1 1 H99 V99 H1 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.15"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-[1100px] text-center">
        <h2 className="font-display text-[clamp(3rem,10vw,7.5rem)] font-semibold leading-[0.9] tracking-[-0.02em]">
          <span ref={bowlsRef} className="block">
            BOWLS.
          </span>
          <span ref={platesRef} className="block">
            PLATES.
          </span>
          <span ref={togetherRef} className="block">
            TOGETHER.
          </span>
        </h2>
        <p className="mt-12 text-xs tracking-[0.28em] text-soft-vanilla/70">
          SPRINGVALE SOUTH
          <br />
          VICTORIA
        </p>
      </div>
    </section>
  );
}
