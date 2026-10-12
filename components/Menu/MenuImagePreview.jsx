"use client";

import Image from "next/image";

export default function MenuImagePreview({ item, visible }) {
  if (!item) return null;

  return (
    <div
      className={`pointer-events-none absolute left-0 top-1/2 z-20 hidden h-28 w-28 -translate-y-1/2 overflow-hidden shadow-lg transition-all duration-300 lg:block ${
        visible
          ? "translate-x-2 scale-100 opacity-100"
          : "-translate-x-6 scale-95 opacity-0"
      }`}
      aria-hidden
    >
      <Image
        src={item.image}
        alt=""
        fill
        sizes="112px"
        className="object-cover"
      />
    </div>
  );
}
