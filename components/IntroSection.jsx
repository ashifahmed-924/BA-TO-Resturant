"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { business } from "@/data/baTo";
import SectionLabel from "@/components/SectionLabel";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function IntroSection() {
  const rootRef = useRef(null);
  const labelRef = useRef(null);
  const copyRef = useRef(null);
  const imageRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(labelRef.current, { opacity: 0, y: 12 });
      gsap.set(copyRef.current, { opacity: 0, y: 24 });
      gsap.set(imageRef.current, { clipPath: "inset(0 0 100% 0)" });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 75%",
        },
        defaults: { ease: "power3.out" },
      });

      tl.to(labelRef.current, { opacity: 1, y: 0, duration: 0.45 })
        .to(copyRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
        .to(
          imageRef.current,
          { clipPath: "inset(0 0 0% 0)", duration: 0.85 },
          "-=0.45"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="story"
      className="relative overflow-hidden bg-soft-vanilla px-5 py-16 texture-linen md:px-10 md:py-20"
    >
      <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <div ref={labelRef} className="mb-5 origin-left">
            <SectionLabel number="01" label="BÀ TỒ" />
          </div>

          <div ref={copyRef}>
            <h2 className="font-display text-[clamp(2.2rem,5vw,3.75rem)] font-semibold leading-[0.95] tracking-[-0.02em] text-cocoa">
              A table full
              <span className="mt-1 block text-walnut">of Vietnam.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-relaxed text-deep-ash md:text-base">
              {business.intro}
            </p>
          </div>
        </div>

        <div
          ref={imageRef}
          className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-[16/11]"
          data-cursor="VIEW"
        >
          <Image
            src="/images/ba-to/interior.jpg"
            alt="Illustrative warm dining interior atmosphere"
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-soft-vanilla/35 via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}
