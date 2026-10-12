"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { business } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function FinalCTA() {
  const rootRef = useRef(null);
  const seeRef = useRef(null);
  const atRef = useRef(null);
  const tableRef = useRef(null);
  const visualRef = useRef(null);
  const btnsRef = useRef(null);
  const metaRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.set(seeRef.current, { x: -50, opacity: 0 });
      gsap.set(atRef.current, { x: 50, opacity: 0 });
      gsap.set(tableRef.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(visualRef.current, { clipPath: "inset(0 0 0 100%)" });
      gsap.set(btnsRef.current?.children || [], { opacity: 0, y: 16 });
      gsap.set(metaRef.current, { opacity: 0, y: 12 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        defaults: { ease: "power3.out" },
      });

      tl.to(seeRef.current, { x: 0, opacity: 1, duration: 0.6 })
        .to(atRef.current, { x: 0, opacity: 1, duration: 0.6 }, "-=0.4")
        .to(
          tableRef.current,
          { clipPath: "inset(0% 0 0 0)", duration: 0.65 },
          "-=0.3"
        )
        .to(
          visualRef.current,
          { clipPath: "inset(0 0 0 0%)", duration: 0.9 },
          "-=0.55"
        )
        .to(
          btnsRef.current?.children || [],
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.08 },
          "-=0.45"
        )
        .to(metaRef.current, { opacity: 1, y: 0, duration: 0.45 }, "-=0.25");
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      className="relative overflow-hidden bg-charcoal px-5 py-24 text-cocoa md:px-10 md:py-32"
      aria-label="Final call to action"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at 15% 80%, rgba(47,143,122,0.16), transparent 45%), radial-gradient(ellipse at 90% 20%, rgba(212,168,75,0.08), transparent 40%)",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16 xl:gap-20">
        <div>
          <h2 className="font-display text-[clamp(3rem,9vw,6.5rem)] font-semibold leading-[0.9]">
            <span ref={seeRef} className="block">
              SEE YOU
            </span>
            <span ref={atRef} className="block">
              AT THE
            </span>
            <span ref={tableRef} className="block text-roasted">
              TABLE.
            </span>
          </h2>

          <p className="mt-6 max-w-md text-sm leading-relaxed text-deep-ash md:text-base">
            Noodles, rice, and coastal plates in Springvale South — pull up a
            chair when you are ready.
          </p>

          <div ref={btnsRef} className="mt-10 flex flex-wrap gap-4">
            <a href="#menu" className="btn-primary">
              View Menu
            </a>
            <a
              href={business.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary after:!bg-cocoa/40"
              data-cursor="GO"
            >
              Get Directions
            </a>
            <a
              href={business.phoneHref}
              className="btn-secondary after:!bg-cocoa/40"
              data-cursor="GO"
            >
              Call
            </a>
          </div>
        </div>

        <div
          ref={visualRef}
          className="relative"
          data-cursor="VIEW"
        >
          <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src="/images/ba-to/hero-bowl.jpg"
              alt="Illustrative Vietnamese soup bowl"
              fill
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
              priority={false}
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/10 to-transparent"
              aria-hidden
            />

            <div
              ref={metaRef}
              className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 md:p-6"
            >
              <div>
                <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-accent">
                  VISIT
                </p>
                <p className="mt-2 font-display text-xl font-semibold leading-tight text-cocoa md:text-2xl">
                  {business.address.street}
                  <br />
                  {business.address.suburb}
                </p>
              </div>
              <p className="pb-1 text-right text-[0.65rem] leading-relaxed tracking-[0.14em] text-cocoa/75">
                WED–SAT
                <br />
                9AM–9PM
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
