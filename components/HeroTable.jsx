"use client";

import { useEffect, useMemo, useRef } from "react";
import Masonry from "@/components/Masonry";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Swap file to try other restaurant backgrounds in /public/videos */
const HERO_BG_VIDEO = "/videos/hero-kitchen.mp4?v=food3";
// Alternatives: "/videos/hero-food-pan.mp4" | "/videos/hero-noodles.mp4" | "/videos/hero-wok.mp4"

const HERO_FOOD = [
  {
    id: "1",
    img: "/images/ba-to/pho.jpg",
    url: "#menu",
    height: 360,
  },
  {
    id: "2",
    img: "/images/ba-to/banh-xeo.jpg",
    url: "#menu",
    height: 240,
  },
  {
    id: "3",
    img: "/images/ba-to/nem-nuong.jpg",
    url: "#menu",
    height: 300,
  },
  {
    id: "4",
    img: "/images/ba-to/bun-rieu.jpg",
    url: "#menu",
    height: 400,
  },
  {
    id: "5",
    img: "/images/ba-to/com-ga.jpg",
    url: "#menu",
    height: 260,
  },
  {
    id: "6",
    img: "/images/ba-to/crispy-chicken.jpg",
    url: "#menu",
    height: 320,
  },
  {
    id: "7",
    img: "/images/ba-to/hu-tieu.jpg",
    url: "#menu",
    height: 220,
  },
  {
    id: "8",
    img: "/images/ba-to/shaking-beef.jpg",
    url: "#menu",
    height: 360,
  },
  {
    id: "9",
    img: "/images/ba-to/hero-bowl.jpg",
    url: "#menu",
    height: 280,
  },
];

export default function HeroTable() {
  const rootRef = useRef(null);
  const baRef = useRef(null);
  const toRef = useRef(null);
  const stripRef = useRef(null);
  const ctaRef = useRef(null);
  const masonryRef = useRef(null);
  const videoRef = useRef(null);
  const reduced = useReducedMotion();

  const items = useMemo(() => HERO_FOOD, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduced) {
      video.pause();
      video.removeAttribute("src");
      video.load();
      return;
    }
    video.play().catch(() => {});
  }, [reduced]);

  useEffect(() => {
    const { gsap, ScrollTrigger } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(
          [stripRef.current, baRef.current, toRef.current, ctaRef.current, masonryRef.current],
          {
            clearProps: "all",
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            clipPath: "none",
          }
        );
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      gsap.set(stripRef.current, { scaleY: 0, transformOrigin: "top center" });
      gsap.set(baRef.current, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(toRef.current, { clipPath: "inset(0 0 100% 0)" });
      gsap.set(ctaRef.current, { opacity: 0, x: -20 });
      gsap.set(masonryRef.current, { opacity: 0, x: 28 });

      tl.to(stripRef.current, { scaleY: 1, duration: 0.45 })
        .to(baRef.current, { clipPath: "inset(0% 0 0 0)", duration: 0.55 }, "-=0.15")
        .to(toRef.current, { clipPath: "inset(0 0 0% 0)", duration: 0.55 }, "-=0.35")
        .to(masonryRef.current, { opacity: 1, x: 0, duration: 0.55 }, "-=0.35")
        .to(ctaRef.current, { opacity: 1, x: 0, duration: 0.45 }, "-=0.25");

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          gsap.set(baRef.current, { xPercent: p * -2 });
          gsap.set(toRef.current, { xPercent: p * 2 });
          gsap.set(masonryRef.current, { yPercent: p * 6 });
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-soft-vanilla texture-rice pt-[var(--nav-h)]"
      aria-label="Bà TỒ hero"
    >
      {!reduced && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full scale-105 object-cover opacity-[0.42]"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/images/ba-to/hero-table.jpg"
          >
            <source src={HERO_BG_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-soft-vanilla/52" />
          <div className="absolute inset-0 bg-gradient-to-b from-soft-vanilla/60 via-soft-vanilla/25 to-soft-vanilla/80" />
        </div>
      )}

      <div className="relative z-10 mx-auto grid min-h-[calc(100svh-var(--nav-h))] max-w-[1440px] grid-cols-1 items-center gap-10 px-5 pb-16 pt-8 lg:grid-cols-12 lg:gap-8 lg:px-10 lg:pb-20">
        <div className="relative z-20 lg:col-span-5">
          <p className="mb-6 text-[0.7rem] font-semibold tracking-[0.28em] text-deep-ash">
            SPRINGVALE SOUTH · VIC
          </p>

          <div className="relative">
            <div
              ref={stripRef}
              className="absolute -left-3 top-4 hidden h-[72%] w-[3px] bg-ash md:block lg:-left-5"
              aria-hidden
            />

            <h1 className="font-display font-viet leading-[0.85] text-cocoa">
              <span
                ref={baRef}
                className="block text-[clamp(4.5rem,14vw,9.5rem)] font-semibold tracking-[-0.02em]"
              >
                BÀ
              </span>
              <span className="my-2 block text-[0.75rem] font-semibold tracking-[0.35em] text-walnut md:text-[0.85rem]">
                VIETNAMESE
                <br />
                CUISINE
              </span>
              <span
                ref={toRef}
                className="block text-[clamp(4.5rem,14vw,9.5rem)] font-semibold tracking-[-0.02em]"
              >
                TỒ
              </span>
            </h1>
          </div>

          <div ref={ctaRef} className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#menu" className="btn-primary" data-cursor="TASTE">
              Explore the Menu
            </a>
            <a href="#visit" className="btn-secondary" data-cursor="GO">
              Visit Us
            </a>
          </div>
        </div>

        <div
          ref={masonryRef}
          className="hero-masonry relative z-10 w-full lg:col-span-7 lg:min-h-[70vh]"
          aria-label="Featured dishes"
        >
          <div className="hero-masonry-frame mx-auto w-full max-w-[640px] lg:ml-auto lg:max-w-none lg:pl-4">
            <Masonry
              items={items}
              ease="power3.out"
              duration={0.75}
              stagger={0.06}
              animateFrom="bottom"
              scaleOnHover={!reduced}
              hoverScale={0.95}
              blurToFocus={!reduced}
              colorShiftOnHover={false}
              columnCounts={[3, 3, 2, 2]}
              defaultColumns={2}
              loop={!reduced}
              holdDuration={2}
              hideDuration={0.45}
              gapDuration={0.35}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
