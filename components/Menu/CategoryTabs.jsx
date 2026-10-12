"use client";

export default function CategoryTabs({ categories, active, onChange }) {
  return (
    <div
      className="hide-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 md:mx-0 md:flex-wrap md:overflow-visible md:px-0"
      role="tablist"
      aria-label="Menu categories"
    >
      {categories.map((cat) => {
        const isActive = cat.id === active;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={`shrink-0 rounded-sm px-4 py-2.5 text-[0.7rem] font-semibold tracking-[0.18em] transition-colors duration-300 ${
              isActive
                ? "bg-roasted text-soft-vanilla"
                : "bg-transparent text-deep-ash hover:text-cocoa"
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
