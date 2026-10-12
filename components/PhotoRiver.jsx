"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gallery } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function PhotoRiver() {
  const rootRef = useRef(null);
  const col1Ref = useRef(null);
  const col2Ref = useRef(null);
  const col3Ref = useRef(null);
  const reduced = useReducedMotion();

  const lane1 = gallery.filter((g) => g.lane === 1);
  const lane2 = gallery.filter((g) => g.lane === 2);
  const lane3 = gallery.filter((g) => g.lane === 3);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      if (window.matchMedia("(max-width: 767px)").matches) return;

      const scrub = true;
      gsap.to(col1Ref.current, {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub,
        },
      });
      gsap.to(col2Ref.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub,
        },
      });
      gsap.to(col3Ref.current, {
        yPercent: -28,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  const renderCol = (items, ref, className = "") => (
    <div ref={ref} className={`flex flex-col gap-4 will-change-transform ${className}`}>
      {items.map((img) => (
        <div
          key={img.id}
          className="relative aspect-[3/4] w-full overflow-hidden"
          data-cursor="VIEW"
        >
          <Image
            src={img.src}
            alt={img.alt}
            fill
            sizes="(max-width: 768px) 82vw, 30vw"
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-soft-vanilla py-20 md:py-28"
      aria-label="Photo river gallery"
    >
      <div className="mb-10 px-5 md:px-10">
        <p className="text-xs tracking-[0.22em] text-ash">05 / GALLERY</p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-cocoa md:text-5xl">
          ALONG THE TABLE.
        </h2>
        <p className="mt-3 max-w-md text-sm text-deep-ash">
          Illustrative Vietnamese food and dining photography — not labelled as
          official Bà TỒ restaurant photography.
        </p>
      </div>

      {/* Mobile horizontal snap */}
      <div className="hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 md:hidden">
        {gallery.map((img) => (
          <div
            key={`m-${img.id}`}
            className="relative aspect-[3/4] w-[82vw] shrink-0 snap-center overflow-hidden"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="82vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Desktop three lanes */}
      <div className="mx-auto hidden max-w-[1400px] grid-cols-3 gap-4 px-6 md:grid lg:gap-6 lg:px-10">
        {renderCol(lane1, col1Ref, "pt-0")}
        {renderCol(lane2, col2Ref, "pt-16")}
        {renderCol(lane3, col3Ref, "pt-8")}
      </div>
    </section>
  );
}
