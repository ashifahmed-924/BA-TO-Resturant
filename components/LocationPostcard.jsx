"use client";

import { useEffect, useRef } from "react";
import { business } from "@/data/baTo";
import VietnamesePattern from "@/components/VietnamesePattern";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function LocationPostcard() {
  const rootRef = useRef(null);
  const cardRef = useRef(null);
  const linesRef = useRef([]);
  const weaveRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.fromTo(
        cardRef.current,
        { rotate: 4, y: 70, opacity: 0 },
        {
          rotate: 0,
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
        }
      );

      gsap.from(linesRef.current, {
        y: 14,
        opacity: 0,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.25,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });

      if (weaveRef.current) {
        gsap.fromTo(
          weaveRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 0.8,
            delay: 0.35,
            ease: "power3.out",
            scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
          }
        );
      }
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="visit"
      className="relative overflow-hidden bg-ash px-5 py-24 md:px-10 md:py-32"
      aria-label="Location and contact"
    >
      <VietnamesePattern
        variant="tile"
        opacity={0.06}
        tone="brown"
        className="absolute inset-0"
      />

      <div className="relative z-10 mx-auto max-w-[900px]">
        <div
          ref={cardRef}
          className="relative grid gap-10 bg-vanilla p-8 shadow-[0_24px_60px_rgba(0,0,0,0.45)] ring-1 ring-cocoa/10 md:grid-cols-2 md:p-12"
        >
          {/* Decorative postage mark — not an official stamp */}
          <div
            className="absolute right-6 top-6 flex h-16 w-14 flex-col items-center justify-center border border-dashed border-ash/60 text-[0.55rem] tracking-widest text-ash"
            aria-hidden
          >
            <span>VIC</span>
            <span className="mt-1 text-lg">✉</span>
          </div>

          <div>
            <p
              ref={(el) => {
                linesRef.current[0] = el;
              }}
              className="font-display font-viet text-4xl font-semibold text-cocoa md:text-5xl"
            >
              BÀ TỒ
            </p>
            <p
              ref={(el) => {
                linesRef.current[1] = el;
              }}
              className="mt-3 text-xs tracking-[0.22em] text-deep-ash"
            >
              VIETNAMESE CUISINE
            </p>
            <div
              ref={weaveRef}
              className="mt-8 h-px w-full origin-left bg-walnut/40"
              aria-hidden
            />
          </div>

          <div>
            <p
              ref={(el) => {
                linesRef.current[2] = el;
              }}
              className="text-sm tracking-[0.12em] text-cocoa"
            >
              {business.address.street.toUpperCase()}
              <br />
              {business.address.suburb.toUpperCase()}
              <br />
              {business.address.state} {business.address.postcode}
            </p>
            <p
              ref={(el) => {
                linesRef.current[3] = el;
              }}
              className="mt-6 text-xs tracking-[0.18em] text-deep-ash"
            >
              PHONE
            </p>
            <a
              ref={(el) => {
                linesRef.current[4] = el;
              }}
              href={business.phoneHref}
              className="font-display mt-1 block text-2xl text-cocoa"
            >
              {business.phoneDisplay}
            </a>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={business.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                data-cursor="GO"
              >
                Get Directions
              </a>
              <a
                href={business.phoneHref}
                className="btn-secondary"
                data-cursor="GO"
              >
                Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
