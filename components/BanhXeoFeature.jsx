"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { menu, formatPrice } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function BanhXeoFeature() {
  const rootRef = useRef(null);
  const copyRef = useRef(null);
  const imageRef = useRef(null);
  const accentRef = useRef(null);
  const reduced = useReducedMotion();
  const dish = menu.find((m) => m.id === "banh-xeo");

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(copyRef.current, { opacity: 0, x: -28 });
      gsap.set(imageRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.set(accentRef.current, { scaleX: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        defaults: { ease: "power3.out" },
      });

      tl.to(copyRef.current, { opacity: 1, x: 0, duration: 0.65 })
        .to(accentRef.current, { scaleX: 1, duration: 0.55 }, "-=0.35")
        .to(
          imageRef.current,
          { clipPath: "inset(0 0% 0 0)", duration: 0.9 },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  if (!dish) return null;

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-ash px-5 py-16 md:px-10 md:py-24"
      aria-label="Vietnamese pancake feature"
    >
      <div className="mx-auto grid max-w-[1200px] items-stretch gap-8 lg:grid-cols-12 lg:gap-0">
        <div
          ref={copyRef}
          className="flex flex-col justify-center lg:col-span-5 lg:pr-12"
        >
          <p className="text-xs tracking-[0.22em] text-deep-ash">FEATURED</p>

          <h2 className="font-display mt-4 text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.9] tracking-[-0.03em] text-cocoa">
            Crispy
            <span className="mt-1 block text-roasted">pancake.</span>
          </h2>

          <div
            ref={accentRef}
            className="mt-6 h-px w-24 bg-roasted"
            aria-hidden
          />

          <p className="mt-6 text-lg font-medium text-cocoa">{dish.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-walnut">
            {dish.description}
          </p>
          <p className="font-display mt-8 text-4xl text-cocoa">
            {formatPrice(dish)}
          </p>
        </div>

        <div
          ref={imageRef}
          className="relative aspect-[4/5] overflow-hidden lg:col-span-7 lg:aspect-auto lg:min-h-[520px]"
          data-cursor="VIEW"
        >
          <Image
            src={dish.image}
            alt="Illustrative Vietnamese pancake with prawn and pork"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
          <div
            className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cocoa/10"
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
