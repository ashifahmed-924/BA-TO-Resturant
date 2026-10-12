"use client";

import { useId } from "react";

const tones = {
  brown: "#2F8F7A",
  ash: "#4A5C55",
  cream: "#E8E2D4",
};

export default function VietnamesePattern({
  variant = "woven",
  opacity = 0.1,
  scale = 1,
  tone = "brown",
  className = "",
}) {
  const uid = useId().replace(/:/g, "");
  const color = tones[tone] || tones.brown;
  const id = `${variant}-${uid}`;

  let patternInner = null;

  if (variant === "woven") {
    patternInner = (
      <>
        <path
          d="M0 12 H24 M12 0 V24"
          stroke={color}
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M0 0 L24 24 M24 0 L0 24"
          stroke={color}
          strokeWidth="0.35"
          fill="none"
          opacity="0.5"
        />
      </>
    );
  } else if (variant === "drum") {
    patternInner = (
      <>
        <circle cx="24" cy="24" r="18" fill="none" stroke={color} strokeWidth="0.7" />
        <circle cx="24" cy="24" r="10" fill="none" stroke={color} strokeWidth="0.5" />
        <circle cx="24" cy="24" r="3" fill={color} opacity="0.5" />
        {[0, 45, 90, 135].map((deg) => (
          <line
            key={deg}
            x1="24"
            y1="6"
            x2="24"
            y2="14"
            stroke={color}
            strokeWidth="0.6"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
      </>
    );
  } else if (variant === "tile") {
    patternInner = (
      <>
        <rect x="1" y="1" width="14" height="14" fill="none" stroke={color} strokeWidth="0.5" />
        <rect x="17" y="17" width="14" height="14" fill="none" stroke={color} strokeWidth="0.5" />
        <circle cx="8" cy="8" r="2" fill={color} opacity="0.4" />
        <circle cx="24" cy="24" r="2" fill={color} opacity="0.4" />
      </>
    );
  } else {
    patternInner = (
      <>
        <path d="M0 10 Q10 0 20 10 T40 10" fill="none" stroke={color} strokeWidth="0.6" />
        <path d="M0 16 Q10 8 20 16 T40 16" fill="none" stroke={color} strokeWidth="0.35" opacity="0.6" />
      </>
    );
  }

  const dims =
    variant === "ceramic"
      ? { w: 40, h: 20 }
      : variant === "drum"
        ? { w: 48, h: 48 }
        : variant === "tile"
          ? { w: 32, h: 32 }
          : { w: 24, h: 24 };

  return (
    <svg
      className={`pointer-events-none h-full w-full ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ opacity }}
    >
      <defs>
        <pattern
          id={id}
          width={dims.w * scale}
          height={dims.h * scale}
          patternUnits="userSpaceOnUse"
          patternTransform={`scale(${scale})`}
        >
          {patternInner}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
