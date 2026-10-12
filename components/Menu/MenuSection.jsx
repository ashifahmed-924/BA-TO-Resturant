"use client";

import { useEffect, useRef, useState } from "react";
import {
  menu,
  specials,
  menuCategories,
  formatPrice,
} from "@/data/baTo";
import SectionLabel from "@/components/SectionLabel";
import CategoryTabs from "./CategoryTabs";
import MenuItemRow from "./MenuItemRow";
import { registerGsap } from "@/lib/gsapSetup";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function getItemsForCategory(categoryId) {
  if (categoryId === "featured") {
    return menu.filter((m) => m.featured);
  }
  if (categoryId === "specials") {
    return specials.map((s) => ({
      ...s,
      image: "/images/ba-to/gallery-01.jpg",
      imageIndex: "—",
      description: s.availabilityLabel,
    }));
  }
  return menu.filter((m) => m.category === categoryId);
}

export default function MenuSection() {
  const rootRef = useRef(null);
  const listRef = useRef(null);
  const [active, setActive] = useState("featured");
  const [expanded, setExpanded] = useState(null);
  const [items, setItems] = useState(() => getItemsForCategory("featured"));
  const reduced = useReducedMotion();

  const changeCategory = (id) => {
    if (id === active) return;
    const { gsap } = registerGsap();
    const next = getItemsForCategory(id);

    if (reduced || !listRef.current) {
      setActive(id);
      setItems(next);
      setExpanded(null);
      return;
    }

    gsap.to(listRef.current.children, {
      opacity: 0,
      y: -12,
      duration: 0.28,
      stagger: 0.02,
      ease: "power2.in",
      onComplete: () => {
        setActive(id);
        setItems(next);
        setExpanded(null);
        requestAnimationFrame(() => {
          if (!listRef.current) return;
          gsap.fromTo(
            listRef.current.children,
            { opacity: 0, y: 18 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.035,
              ease: "power3.out",
            }
          );
        });
      },
    });
  };

  useEffect(() => {
    const { gsap } = registerGsap();
    const ctx = gsap.context(() => {
      if (reduced) return;
      gsap.from(rootRef.current.querySelector("[data-menu-head]"), {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: { trigger: rootRef.current, start: "top 70%" },
      });
    }, rootRef);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      ref={rootRef}
      id="menu"
      className="relative bg-soft-vanilla px-5 py-24 md:px-10 md:py-32"
      aria-label="Full menu"
    >
      <div className="mx-auto max-w-[1100px]">
        <div data-menu-head>
          <SectionLabel number="03" label="MENU" />
          <h2 className="font-display mt-6 text-[clamp(2.4rem,6vw,4.5rem)] font-semibold leading-[0.95] text-cocoa">
            MARKET BOARD
            <br />
            <span className="text-walnut">&amp; CATALOGUE.</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm text-deep-ash md:text-base">
            Prices from current public ordering listings. Availability of
            specials can vary — please confirm in store or on the order
            platform.
          </p>
        </div>

        <div className="sticky top-[68px] z-30 -mx-5 mt-10 border-b border-walnut/10 bg-soft-vanilla/95 px-5 py-3 backdrop-blur-md md:mx-0 md:px-0">
          <CategoryTabs
            categories={menuCategories}
            active={active}
            onChange={changeCategory}
          />
        </div>

        <div ref={listRef} className="mt-2" role="tabpanel">
          {items.map((item) => (
            <MenuItemRow
              key={item.id}
              item={item}
              expanded={expanded === item.id}
              onToggle={(id) =>
                setExpanded((prev) => (prev === id ? null : id))
              }
            />
          ))}
          {items.length === 0 && (
            <p className="py-12 text-deep-ash">No items in this category.</p>
          )}
        </div>

        {active === "specials" && (
          <p className="mt-6 text-sm italic text-walnut">
            Special and weekend dishes are not guaranteed daily.{" "}
            {formatPrice({ price: null })} for live pricing.
          </p>
        )}
      </div>
    </section>
  );
}
