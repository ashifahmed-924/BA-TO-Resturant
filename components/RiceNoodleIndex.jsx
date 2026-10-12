"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { riceNoodleIndex, formatPrice } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function RiceNoodleIndex() {
  const rootRef = useRef(null);
  const previewRef = useRef(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const items = riceNoodleIndex;
  const current = items[active];

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(rootRef.current.querySelectorAll("[data-rn-row]"), {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const select = (i) => {
    if (i === active) return;
    const { gsap } = registerGsap();
    if (reduced) {
      setActive(i);
      return;
    }
    gsap.to(previewRef.current, {
      opacity: 0,
      scale: 0.97,
      duration: 0.2,
      onComplete: () => {
        setActive(i);
        gsap.fromTo(
          previewRef.current,
          { opacity: 0, scale: 1.03 },
          { opacity: 1, scale: 1, duration: 0.4, ease: "power3.out" }
        );
      },
    });
  };

  if (!current) return null;

  return (
    <section
      ref={rootRef}
      className="bg-ash px-5 py-24 md:px-10 md:py-32"
      aria-label="Rice and noodle index"
    >
      <div className="mx-auto grid max-w-[1300px] gap-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <p className="text-xs tracking-[0.22em] text-cocoa/60">07 / INDEX</p>
          <h2 className="font-display mt-4 text-[clamp(2.2rem,5vw,3.8rem)] font-semibold leading-[0.95] text-cocoa">
            RICE +
            <br />
            NOODLE.
          </h2>

          <ul className="mt-12 space-y-0">
            {items.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  data-rn-row
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  onClick={() => select(i)}
                  className={`flex w-full items-baseline gap-4 border-b border-cocoa/15 py-5 text-left transition-colors ${
                    i === active ? "text-cocoa" : "text-cocoa/45 hover:text-cocoa/80"
                  }`}
                >
                  <span className="w-8 shrink-0 text-xs tracking-[0.16em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display flex-1 text-xl font-semibold md:text-2xl">
                    {item.name}
                  </span>
                  <span className="hidden text-sm md:inline">
                    {formatPrice(item)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:col-span-6">
          <div
            ref={previewRef}
            className="relative aspect-[4/5] overflow-hidden md:sticky md:top-28"
            data-cursor="VIEW"
          >
            <Image
              src={current.image}
              alt={`Illustrative ${current.name}`}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-soft-vanilla/90 to-transparent p-6 text-cocoa">
              <p className="text-lg font-medium">{current.name}</p>
              {current.description && (
                <p className="text-sm text-cocoa/70">{current.description}</p>
              )}
              <p className="mt-2 font-display text-xl">{formatPrice(current)}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
