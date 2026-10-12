"use client";

export default function PaperReveal({ children, className = "" }) {
  return <div className={`origin-center ${className}`}>{children}</div>;
}
