"use client";

import { useEffect } from "react";
import { business } from "@/data/baTo";

const links = [
  { href: "#menu", label: "MENU", index: "01" },
  { href: "#specials", label: "SPECIALS", index: "02" },
  { href: "#story", label: "STORY", index: "03" },
  { href: "#visit", label: "VISIT", index: "04" },
];

export default function MobileMenu({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] lg:hidden ${
        open ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={`absolute inset-0 bg-charcoal/70 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`absolute inset-y-0 right-0 flex w-full max-w-md flex-col border-l border-walnut/20 bg-vanilla shadow-[-24px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          aria-hidden
          style={{
            background:
              "radial-gradient(ellipse at 80% 0%, rgba(47,143,122,0.18), transparent 55%), radial-gradient(ellipse at 10% 100%, rgba(212,168,75,0.08), transparent 45%)",
          }}
        />

        <div className="relative flex items-end justify-between border-b border-walnut/15 px-6 pb-5 pt-24">
          <div>
            <p className="text-[0.65rem] font-semibold tracking-[0.22em] text-roasted">
              NAVIGATE
            </p>
            <p className="mt-1 font-display text-2xl font-semibold text-cocoa">
              {business.name}
            </p>
          </div>
          <p className="pb-1 text-[0.65rem] tracking-[0.18em] text-deep-ash">
            SPRINGVALE SOUTH
          </p>
        </div>

        <nav className="relative flex flex-1 flex-col justify-center px-6 py-8">
          <ul className="flex flex-col">
            {links.map((link, i) => (
              <li
                key={link.href}
                className={`border-b border-walnut/12 transition-[opacity,transform] duration-500 ${
                  open
                    ? "translate-x-0 opacity-100"
                    : "translate-x-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${120 + i * 60}ms` : "0ms" }}
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  tabIndex={open ? 0 : -1}
                  className="group flex items-baseline justify-between gap-4 py-5"
                >
                  <span className="font-display text-[clamp(2.4rem,8vw,3.25rem)] font-semibold leading-none tracking-[-0.03em] text-cocoa transition-colors group-hover:text-roasted">
                    {link.label}
                  </span>
                  <span className="text-[0.7rem] tracking-[0.2em] text-ash transition-colors group-hover:text-accent">
                    {link.index}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="relative border-t border-walnut/15 px-6 pb-10 pt-6">
          <a
            href={business.phoneHref}
            className="btn-primary w-full"
            tabIndex={open ? 0 : -1}
            onClick={onClose}
          >
            Call {business.phoneDisplay}
          </a>
          <p className="mt-4 text-xs leading-relaxed tracking-[0.12em] text-deep-ash">
            {business.address.street.toUpperCase()}
            <br />
            {business.address.suburb.toUpperCase()} ·{" "}
            {business.address.postcode}
          </p>
        </div>
      </div>
    </div>
  );
}
