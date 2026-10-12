"use client";

export default function CircleReveal({ children, className = "" }) {
  return (
    <div
      className={`overflow-hidden rounded-full ${className}`}
      style={{ clipPath: "circle(72% at 50% 50%)" }}
    >
      {children}
    </div>
  );
}
