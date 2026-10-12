"use client";

import { useEffect, useRef, useState } from "react";
import BrandMark from "@/components/BrandMark";
import MobileMenu from "@/components/MobileMenu";
import { business } from "@/data/baTo";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const midLinks = [
  { href: "#menu", label: "MENU" },
  { href: "#specials", label: "SPECIALS" },
  { href: "#story", label: "STORY" },
];

export default function Navbar() {
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.fromTo(
        logoRef.current,
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.7, ease: "power3.out" }
      );
      if (linksRef.current) {
        gsap.fromTo(
          linksRef.current.querySelectorAll("a, button"),
          { y: -8, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.05,
            ease: "power3.out",
            delay: 0.15,
          }
        );
      }
    }, navRef);
    return () => ctx.revert();
  }, [reduced]);

  useEffect(() => {
    const { gsap } = registerGsap();
    if (reduced || !navRef.current) return;
    gsap.to(navRef.current, {
      height: scrolled ? 68 : 84,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [scrolled, reduced]);

  return (
    <>
      <header
        ref={navRef}
        className={`fixed inset-x-0 top-0 z-50 flex h-[84px] items-center transition-[background,backdrop-filter,border-color] duration-300 ${
          scrolled
            ? "border-b border-roasted/40 bg-vanilla/90 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 md:px-10">
          <a
            href="#top"
            ref={logoRef}
            className="relative z-[70] block"
            aria-label="Bà TỒ home"
          >
            <BrandMark size="sm" />
          </a>

          <nav
            ref={linksRef}
            className="hidden items-center gap-10 lg:flex"
            aria-label="Primary"
          >
            <div className="flex items-center gap-8">
              {midLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-[0.7rem] font-semibold tracking-[0.2em] text-cocoa transition-opacity hover:opacity-60"
                >
                  {l.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-5">
              <a
                href="#visit"
                className="text-[0.7rem] font-semibold tracking-[0.2em] text-cocoa transition-opacity hover:opacity-60"
                data-cursor="GO"
              >
                VISIT
              </a>
              <span className="h-5 w-px bg-ash" aria-hidden />
              <a
                href={business.phoneHref}
                className="btn-primary !px-4 !py-2.5 text-[0.65rem]"
                aria-label={`Call ${business.phoneDisplay}`}
              >
                Call
              </a>
            </div>
          </nav>

          <button
            type="button"
            className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={`block h-[1.5px] w-6 bg-cocoa transition-transform ${
                open ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[1.5px] w-6 bg-cocoa transition-transform ${
                open ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </header>

      <MobileMenu open={open} onClose={() => setOpen(false)} />
    </>
  );
}
