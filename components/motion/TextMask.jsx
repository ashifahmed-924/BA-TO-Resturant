"use client";

export default function TextMask({ children, className = "" }) {
  return <div className={`overflow-hidden ${className}`}>{children}</div>;
}
