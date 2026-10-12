"use client";

import { useState } from "react";
import Image from "next/image";
import { business, formatPrice } from "@/data/baTo";
import MenuImagePreview from "./MenuImagePreview";

export default function MenuItemRow({ item, expanded, onToggle }) {
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className={`group relative border-b border-walnut/15 transition-colors duration-300 ${
        expanded ? "bg-rice/40" : "hover:bg-rice/60"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor="TASTE"
    >
      <MenuImagePreview item={item} visible={hovered && !expanded} />

      <button
        type="button"
        className="flex w-full items-start justify-between gap-4 py-5 pl-0 text-left md:py-6 md:pr-2 lg:pl-32"
        onClick={() => onToggle?.(item.id)}
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <div className="flex items-start gap-3">
            <h3 className="font-display relative inline-block text-xl font-semibold text-cocoa md:text-2xl">
              {item.name}
              <span
                className={`absolute -bottom-1 left-0 h-px origin-left bg-roasted transition-transform duration-300 ${
                  hovered || expanded ? "scale-x-100" : "scale-x-0"
                } w-full`}
              />
            </h3>
          </div>
          {item.description && (
            <p
              className={`mt-1.5 text-sm leading-snug text-deep-ash md:text-base ${
                expanded
                  ? "hidden lg:block"
                  : "line-clamp-2 lg:line-clamp-none"
              }`}
            >
              {item.description}
            </p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-3 md:gap-6">
          <span className="font-display text-lg text-roasted md:text-xl">
            {formatPrice(item)}
          </span>
          <span className="hidden text-[0.65rem] tracking-[0.2em] text-ash lg:inline">
            {item.imageIndex}
          </span>
          <span
            className={`flex h-7 w-7 items-center justify-center border border-walnut/30 text-cocoa transition-all duration-300 lg:hidden ${
              expanded
                ? "rotate-45 border-roasted bg-roasted text-soft-vanilla"
                : ""
            }`}
            aria-hidden
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 1v10M1 6h10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </span>
        </div>
      </button>

      <div
        className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${
          expanded
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0">
            <div className="pb-5 md:pr-2 lg:pl-32">
            <div className="overflow-hidden border border-walnut/15 bg-soft-vanilla">
              <div className="relative aspect-[16/10] w-full sm:aspect-[21/9]">
                <Image
                  src={item.image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent"
                  aria-hidden
                />
                <div className="absolute bottom-0 left-0 flex w-full items-end justify-between gap-3 p-4">
                  <span className="text-[0.65rem] tracking-[0.2em] text-cocoa/90">
                    {item.imageIndex || "—"} ·{" "}
                    {(item.category || "menu").toUpperCase()}
                  </span>
                  {item.verified && (
                    <span className="text-[0.65rem] tracking-[0.16em] text-accent">
                      LISTED
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-md text-sm leading-relaxed text-deep-ash">
                  {item.description ||
                    "Ask the team for today’s prep and spice level."}
                </p>
                <a
                  href={business.orderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-2 self-start text-[0.7rem] font-semibold tracking-[0.18em] text-roasted transition-opacity hover:opacity-70 sm:self-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  ORDER
                  <span aria-hidden>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
