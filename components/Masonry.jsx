'use client';

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

import './Masonry.css';

const useMedia = (queries, values, defaultValue) => {
  const get = () => {
    if (typeof window === 'undefined') return defaultValue;
    return values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  };

  const [value, setValue] = useState(get);

  useEffect(() => {
    const mediaQueries = queries.map(q => matchMedia(q));
    const handler = () => setValue(get);
    mediaQueries.forEach(query => query.addEventListener('change', handler));
    return () => mediaQueries.forEach(query => query.removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);

  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(
      src =>
        new Promise(resolve => {
          const img = new Image();
          img.src = src;
          img.onload = img.onerror = () => resolve();
        })
    )
  );
};

const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
  columnCounts = [5, 4, 3, 2],
  defaultColumns = 2,
  loop = false,
  holdDuration = 2.8,
  hideDuration = 0.55,
  gapDuration = 0.45,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    columnCounts,
    defaultColumns
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);
  const loopTlRef = useRef(null);
  const hasMounted = useRef(false);

  const getOffscreenY = (item) => {
    if (animateFrom === 'top') return -220;
    if (animateFrom === 'bottom') {
      const containerH = containerRef.current?.offsetHeight || window.innerHeight;
      return Math.max(containerH + 180, item.y + item.h + 220);
    }
    return item.y + 160;
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const { grid, gridHeight } = useMemo(() => {
    if (!width) return { grid: [], gridHeight: 0 };

    const colHeights = new Array(columns).fill(0);
    const columnWidth = width / columns;

    const next = items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = columnWidth * col;
      const height = child.height / 2;
      const y = colHeights[col];

      colHeights[col] += height;

      return { ...child, x, y, w: columnWidth, h: height };
    });

    return { grid: next, gridHeight: Math.max(...colHeights, 0) };
  }, [columns, items, width]);

  useLayoutEffect(() => {
    if (!imagesReady || !grid.length) return;

    // Kill any previous loop before rebuilding
    if (loopTlRef.current) {
      loopTlRef.current.kill();
      loopTlRef.current = null;
    }

    // Position + size every tile to its grid slot first
    grid.forEach((item) => {
      const el = containerRef.current?.querySelector(`[data-key="${item.id}"]`);
      if (!el) return;
      gsap.set(el, {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      });
    });

    if (loop) {
      const els = grid
        .map((item) => containerRef.current?.querySelector(`[data-key="${item.id}"]`))
        .filter(Boolean);

      // Start hidden below
      els.forEach((el, index) => {
        const item = grid[index];
        gsap.set(el, {
          opacity: 0,
          x: item.x,
          y: getOffscreenY(item),
          width: item.w,
          height: item.h,
          ...(blurToFocus ? { filter: 'blur(10px)' } : {}),
        });
      });

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { ease },
      });

      // Rise in from bottom
      tl.to(els, {
        opacity: 1,
        y: (i) => grid[i].y,
        ...(blurToFocus ? { filter: 'blur(0px)' } : {}),
        duration: Math.max(duration, 0.75),
        stagger,
        ease: 'power3.out',
      });

      // Hold in place
      tl.to({}, { duration: holdDuration });

      // Fade out in place (no movement)
      tl.to(els, {
        opacity: 0,
        ...(blurToFocus ? { filter: 'blur(6px)' } : {}),
        duration: hideDuration,
        stagger: stagger * 0.5,
        ease: 'power2.out',
      });

      // Reset below for next rise (invisible)
      tl.set(els, {
        y: (i) => getOffscreenY(grid[i]),
        ...(blurToFocus ? { filter: 'blur(10px)' } : {}),
      });

      // Brief gap before next cycle
      tl.to({}, { duration: gapDuration });

      loopTlRef.current = tl;
      hasMounted.current = true;

      return () => {
        tl.kill();
        loopTlRef.current = null;
      };
    }

    // One-shot enter (original behavior)
    grid.forEach((item, index) => {
      const selector = `[data-key="${item.id}"]`;
      const animationProps = {
        x: item.x,
        y: item.y,
        width: item.w,
        height: item.h,
      };

      if (!hasMounted.current) {
        const offY = getOffscreenY(item);
        gsap.fromTo(
          selector,
          {
            opacity: 0,
            x: item.x,
            y: offY,
            width: item.w,
            height: item.h,
            ...(blurToFocus && { filter: 'blur(10px)' }),
          },
          {
            opacity: 1,
            ...animationProps,
            ...(blurToFocus && { filter: 'blur(0px)' }),
            duration: 0.8,
            ease: 'power3.out',
            delay: index * stagger,
          }
        );
      } else {
        gsap.to(selector, {
          ...animationProps,
          duration,
          ease,
          overwrite: 'auto',
        });
      }
    });

    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    grid,
    imagesReady,
    stagger,
    animateFrom,
    blurToFocus,
    duration,
    ease,
    loop,
    holdDuration,
    hideDuration,
    gapDuration,
  ]);

  const handleMouseEnter = (e, item) => {
    if (loop) return; // avoid fighting the loop timeline
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: hoverScale,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, { opacity: 0.3, duration: 0.3 });
      }
    }
  };

  const handleMouseLeave = (e, item) => {
    if (loop) return;
    const selector = `[data-key="${item.id}"]`;

    if (scaleOnHover) {
      gsap.to(selector, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }

    if (colorShiftOnHover) {
      const overlay = e.currentTarget.querySelector('.color-overlay');
      if (overlay) {
        gsap.to(overlay, { opacity: 0, duration: 0.3 });
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="list"
      style={{ height: gridHeight || undefined, overflow: 'hidden' }}
    >
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          className="item-wrapper"
          onClick={() => {
            if (!item.url) return;
            if (item.url.startsWith('#')) {
              window.location.hash = item.url;
              return;
            }
            window.open(item.url, '_blank', 'noopener');
          }}
          onMouseEnter={e => handleMouseEnter(e, item)}
          onMouseLeave={e => handleMouseLeave(e, item)}
        >
          <div className="item-img" style={{ backgroundImage: `url(${item.img})` }}>
            {colorShiftOnHover && (
              <div
                className="color-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background:
                    'linear-gradient(45deg, rgba(255,0,150,0.5), rgba(0,150,255,0.5))',
                  opacity: 0,
                  pointerEvents: 'none',
                  borderRadius: '8px',
                }}
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
