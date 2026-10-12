"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { soupHighlight, formatPrice } from "@/data/baTo";
import VietnamesePattern from "@/components/VietnamesePattern";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function SoupImmersion() {
  const rootRef = useRef(null);
  const maskRef = useRef(null);
  const wordsRef = useRef([]);
  const pricesRef = useRef(null);
  const patternRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(maskRef.current, { clipPath: "circle(72% at 50% 50%)" });
        gsap.set(wordsRef.current, { opacity: 1 });
        gsap.set(pricesRef.current, { opacity: 1 });
        return;
      }

      gsap.set(maskRef.current, { clipPath: "circle(20% at 50% 50%)" });
      gsap.set(wordsRef.current, { opacity: 0, y: 16 });
      gsap.set(pricesRef.current, { opacity: 0 });
      gsap.set(patternRef.current, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 65%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(maskRef.current, {
        clipPath: "circle(72% at 50% 50%)",
        duration: 1.1,
      })
        .to(
          wordsRef.current,
          { opacity: 1, y: 0, duration: 0.45, stagger: 0.18 },
          "-=0.5"
        )
        .to(pricesRef.current, { opacity: 1, duration: 0.5 }, "-=0.1")
        .to(patternRef.current, { opacity: 0.08, duration: 1.2 }, "-=0.6");
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const words = ["A BOWL", "WITH", "DEPTH."];

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-charcoal px-5 py-28 text-cocoa md:px-10 md:py-36"
      aria-label="Soup and noodle bowls"
    >
      <div
        ref={patternRef}
        className="pointer-events-none absolute inset-0"
        aria-hidden
      >
        <VietnamesePattern variant="ceramic" opacity={1} tone="cream" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-display text-[clamp(3rem,8vw,6.5rem)] font-semibold leading-[0.9]">
            {words.map((w, i) => (
              <span
                key={w}
                ref={(el) => {
                  wordsRef.current[i] = el;
                }}
                className="block"
              >
                {w}
              </span>
            ))}
          </h2>

          <ul
            ref={pricesRef}
            className="mt-12 space-y-5 border-t border-cocoa/20 pt-8"
          >
            {soupHighlight.map((item) => (
              <li
                key={item.id}
                className="flex items-baseline justify-between gap-4"
              >
                <div>
                  <p className="text-xl font-medium tracking-wide md:text-2xl">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="mt-1 text-sm text-cocoa/60">
                      {item.description}
                    </p>
                  )}
                </div>
                <span className="shrink-0 font-display text-xl">
                  {formatPrice(item)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[520px]">
          <div
            ref={maskRef}
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: "circle(20% at 50% 50%)" }}
            data-cursor="VIEW"
          >
            <Image
              src="/images/ba-to/pho.jpg"
              alt="Illustrative Vietnamese noodle soup bowl"
              fill
              sizes="(max-width: 1024px) 90vw, 520px"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
