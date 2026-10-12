"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { tableDetails } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function TableDetails() {
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const current = tableDetails[active] || tableDetails[0];

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;

      gsap.from(listRef.current?.children || [], {
        opacity: 0,
        x: -16,
        duration: 0.5,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    if (!previewRef.current || !current) return;
    const { gsap } = registerGsap();
    if (reduced) {
      gsap.set(previewRef.current, { opacity: 1 });
      return;
    }
    gsap.fromTo(
      previewRef.current,
      { opacity: 0.4, y: 12 },
      { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
    );
  }, [active, reduced, current]);

  return (
    <section
      ref={rootRef}
      className="bg-rice px-5 py-16 md:px-10 md:py-24"
      aria-label="Table details"
    >
      <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
        <div className="lg:col-span-6">
          <p className="text-xs tracking-[0.22em] text-deep-ash">06 / DETAILS</p>
          <h2 className="font-display mt-3 text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[0.95] text-cocoa">
            What arrives
            <span className="mt-1 block text-walnut">with the meal.</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-walnut">
            A quiet read of the table — not another gallery. Hover or tap each
            line to see what sits beside the bowls.
          </p>

          <ul
            ref={listRef}
            className="mt-8 border-t border-cocoa/15"
            role="listbox"
            aria-label="Table elements"
          >
            {tableDetails.map((item, i) => {
              const isActive = i === active;
              return (
                <li key={item.id} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    data-cursor="VIEW"
                    className={`flex w-full items-start gap-4 border-b border-cocoa/15 py-4 text-left transition-colors ${
                      isActive ? "text-cocoa" : "text-cocoa/45 hover:text-cocoa/80"
                    }`}
                  >
                    <span
                      className={`mt-1 shrink-0 text-[0.65rem] tracking-[0.18em] ${
                        isActive ? "text-roasted" : "text-ash"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-display block text-xl font-semibold md:text-2xl">
                        {item.title}
                      </span>
                      <span
                        className={`mt-1 block text-sm leading-relaxed transition-opacity ${
                          isActive ? "text-walnut opacity-100" : "opacity-0 md:opacity-60"
                        }`}
                      >
                        {item.note}
                      </span>
                    </span>
                    <span
                      className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors ${
                        isActive ? "bg-roasted" : "bg-transparent"
                      }`}
                      aria-hidden
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-6 lg:sticky lg:top-28">
          <div
            ref={previewRef}
            className="relative aspect-[4/5] overflow-hidden md:aspect-[5/6]"
            data-cursor="VIEW"
          >
            <Image
              key={current.id}
              src={current.src}
              alt={current.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-soft-vanilla/90 via-soft-vanilla/40 to-transparent p-5 md:p-6">
              <p className="text-[0.65rem] tracking-[0.2em] text-roasted">
                {String(active + 1).padStart(2, "0")} / {String(tableDetails.length).padStart(2, "0")}
              </p>
              <p className="font-display mt-1 text-2xl font-semibold text-cocoa">
                {current.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
