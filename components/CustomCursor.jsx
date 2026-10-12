"use client";

import { useEffect, useRef, useState } from "react";
import { useIsTouch } from "@/hooks/useIsTouch";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CustomCursor() {
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  const touch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (touch || reduced) return;

    const ring = ringRef.current;
    if (!ring) return;

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let raf;

    const onMove = (e) => {
      x = e.clientX;
      y = e.clientY;
    };

    const loop = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };

    const onOver = (e) => {
      const target = e.target.closest("[data-cursor]");
      if (target) {
        const raw = target.getAttribute("data-cursor") || "";
        setLabel(raw.toUpperCase());
        setExpanded(true);
      }
    };

    const onOut = (e) => {
      const related = e.relatedTarget;
      if (related && related.closest?.("[data-cursor]")) return;
      if (!e.target.closest("[data-cursor]")) {
        setExpanded(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    document.documentElement.classList.add("custom-cursor-active");
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [touch, reduced]);

  if (touch || reduced) return null;

  return (
    <div
      ref={ringRef}
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden mix-blend-difference md:block"
      aria-hidden
      style={{ transform: "translate(-50%, -50%)" }}
    >
      <div
        className={`flex items-center justify-center rounded-full border border-cocoa transition-all duration-300 ${
          expanded ? "h-[58px] w-[58px]" : "h-3 w-3"
        }`}
      >
        <span
          ref={labelRef}
          className={`text-[0.55rem] font-semibold tracking-[0.16em] text-cocoa transition-opacity ${
            expanded ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
    </div>
  );
}
