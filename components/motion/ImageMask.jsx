"use client";

export default function ImageMask({ children, className = "" }) {
  return <div className={`overflow-hidden ${className}`}>{children}</div>;
}
