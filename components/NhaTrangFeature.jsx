"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { nhaTrangDishes, formatPrice } from "@/data/baTo";
import SectionLabel from "@/components/SectionLabel";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function NhaTrangFeature() {
  const rootRef = useRef(null);
  const imageWrapRef = useRef(null);
  const detailsRef = useRef(null);
  const [active, setActive] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const reduced = useReducedMotion();
  const dishes = nhaTrangDishes;
  const current = dishes[active];

  const switchDish = (index) => {
    if (index === active || !dishes[index]) return;
    const { gsap } = registerGsap();

    if (reduced) {
      setActive(index);
      return;
    }

    const img = imageWrapRef.current;
    const details = detailsRef.current;

    gsap
      .timeline()
      .to(img, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.35,
        ease: "power3.in",
      })
      .add(() => setActive(index))
      .fromTo(
        img,
        { clipPath: "inset(100% 0 0 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.45, ease: "power3.out" }
      )
      .fromTo(
        details,
        { y: 24, opacity: 0.4 },
        { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
        "-=0.25"
      );
  };

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(rootRef.current.querySelectorAll("[data-nt-anim]"), {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart == null) return;
    const dx = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(dx) > 40) {
      if (dx < 0) switchDish((active + 1) % dishes.length);
      else switchDish((active - 1 + dishes.length) % dishes.length);
    }
    setTouchStart(null);
  };

  if (!current) return null;

  return (
    <section
      ref={rootRef}
      className="relative bg-rice px-5 py-24 texture-plaster md:px-10 md:py-32"
      aria-label="Coastal dishes"
    >
      <div className="mx-auto max-w-[1300px]">
        <div data-nt-anim className="mb-8">
          <SectionLabel number="02" label="COASTAL" />
        </div>

        <h2
          data-nt-anim
          className="font-display mb-14 text-[clamp(2.8rem,8vw,6rem)] font-semibold leading-[0.9] text-cocoa"
        >
          FROM THE
          <br />
          COAST.
        </h2>

        {/* Mobile */}
        <div className="lg:hidden">
          <div
            className="relative mb-6 aspect-[4/5] overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            data-cursor="VIEW"
          >
            <Image
              src={current.image}
              alt={`Illustrative ${current.name}`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
          <div className="mb-6 flex gap-2" role="tablist" aria-label="Coastal dishes">
            {dishes.map((d, i) => (
              <button
                key={d.id}
                type="button"
                role="tab"
                aria-selected={i === active}
                onClick={() => switchDish(i)}
                className={`rounded-sm px-4 py-2 text-xs tracking-[0.16em] transition-colors ${
                  i === active
                    ? "bg-roasted text-soft-vanilla"
                    : "bg-vanilla text-cocoa"
                }`}
              >
                {String(i + 1).padStart(2, "0")} {d.name.split(" ").slice(0, 2).join(" ").toUpperCase()}
              </button>
            ))}
          </div>
          <div>
            <h3 className="font-display text-3xl font-semibold text-cocoa">
              {current.name}
            </h3>
            {current.description && (
              <p className="mt-2 text-sm text-deep-ash">{current.description}</p>
            )}
            <p className="mt-4 font-display text-2xl text-roasted">
              {formatPrice(current)}
            </p>
          </div>
        </div>

        {/* Desktop three-column */}
        <div className="hidden grid-cols-12 gap-8 lg:grid">
          <nav
            className="col-span-3 flex flex-col justify-center gap-6"
            aria-label="Dish index"
          >
            {dishes.map((d, i) => (
              <button
                key={d.id}
                type="button"
                onClick={() => switchDish(i)}
                onMouseEnter={() => switchDish(i)}
                className={`group text-left transition-opacity ${
                  i === active ? "opacity-100" : "opacity-40 hover:opacity-70"
                }`}
              >
                <span className="block text-xs tracking-[0.2em] text-deep-ash">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display mt-1 block text-2xl font-semibold text-cocoa">
                  {i === 0 ? "GRILLED SAUSAGE" : "CHICKEN RICE"}
                </span>
                <span
                  className={`mt-2 block h-px origin-left bg-cocoa transition-transform duration-300 ${
                    i === active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                  }`}
                />
              </button>
            ))}
          </nav>

          <div
            ref={imageWrapRef}
            className="relative col-span-5 aspect-[4/5] overflow-hidden"
            style={{ clipPath: "inset(0 0 0% 0)" }}
            data-cursor="VIEW"
          >
            <Image
              src={current.image}
              alt={`Illustrative ${current.name}`}
              fill
              sizes="40vw"
              className="object-cover"
            />
          </div>

          <div
            ref={detailsRef}
            className="col-span-4 flex flex-col justify-center"
          >
            <p className="text-xs tracking-[0.22em] text-ash">FEATURED</p>
            <h3 className="font-display mt-4 text-4xl font-semibold leading-tight text-cocoa">
              {current.name}
            </h3>
            {current.description && (
              <p className="mt-4 text-base leading-relaxed text-deep-ash">
                {current.description}
              </p>
            )}
            <p className="font-display mt-8 text-3xl text-roasted">
              {formatPrice(current)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
