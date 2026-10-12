"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { business } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function InteriorSection() {
  const rootRef = useRef(null);
  const imgRef = useRef(null);
  const ashRef = useRef(null);
  const linesRef = useRef([]);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(imgRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
      });
      gsap.set(ashRef.current, { x: -30, opacity: 0 });
      gsap.set(linesRef.current, { y: 16, opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        defaults: { ease: "power3.out" },
      });

      tl.to(ashRef.current, { x: 0, opacity: 1, duration: 0.6 })
        .to(
          imgRef.current,
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: 0.9,
          },
          "-=0.3"
        )
        .to(
          linesRef.current,
          { y: 0, opacity: 1, duration: 0.45, stagger: 0.1 },
          "-=0.35"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="bg-soft-vanilla px-5 py-24 md:px-10 md:py-32"
      aria-label="Restaurant interior"
    >
      <div className="mx-auto max-w-[1300px]">
        <h2 className="font-display mb-10 text-[clamp(2.8rem,7vw,5.5rem)] font-semibold leading-[0.9] text-cocoa">
          AT
          <br />
          BÀ TỒ.
        </h2>

        <div className="relative grid items-end gap-8 lg:grid-cols-12">
          <div
            ref={ashRef}
            className="absolute left-0 top-8 hidden h-[70%] w-[55%] bg-ash/40 lg:block"
            aria-hidden
          />

          <div
            ref={imgRef}
            className="relative z-10 aspect-[16/11] overflow-hidden lg:col-span-8"
            data-cursor="VIEW"
          >
            <Image
              src="/images/ba-to/interior.jpg"
              alt="Illustrative warm restaurant interior dining room"
              fill
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-cover"
            />
          </div>

          <div className="relative z-10 lg:col-span-4 lg:pb-8">
            <p
              ref={(el) => {
                linesRef.current[0] = el;
              }}
              className="font-display text-2xl text-cocoa md:text-3xl"
            >
              {business.address.street}
            </p>
            <p
              ref={(el) => {
                linesRef.current[1] = el;
              }}
              className="mt-2 text-lg text-deep-ash"
            >
              {business.address.suburb}
            </p>
            <p
              ref={(el) => {
                linesRef.current[2] = el;
              }}
              className="mt-6 max-w-xs text-sm leading-relaxed text-walnut"
            >
              A Vietnamese restaurant for noodles, rice dishes, soups and shared
              plates in Springvale South.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
