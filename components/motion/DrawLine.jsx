"use client";

import { useEffect, useRef } from "react";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function DrawLine({ className = "", pathD = "M0 1 H100" }) {
  const pathRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const { gsap } = registerGsap();
    const path = pathRef.current;
    if (!path || reduced) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: path, start: "top 85%" },
    });
  }, [reduced]);

  return (
    <svg
      className={className}
      viewBox="0 0 100 2"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        ref={pathRef}
        d={pathD}
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
