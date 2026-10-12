/**
 * Generates distinctive JPEG-compatible SVG placeholders for Bà TỒ.
 * Images are illustrative — not claimed as restaurant-owned photography.
 */
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = join(__dirname, "..", "public", "images", "ba-to");
mkdirSync(outDir, { recursive: true });

const palette = {
  cocoa: "#3A2923",
  roasted: "#5A4034",
  walnut: "#745345",
  vanilla: "#F2E4C8",
  soft: "#FAF1DF",
  rice: "#E6D5B7",
  ash: "#9B9993",
  moss: "#7B8065",
  accent: "#8A3E32",
  broth: "#C4A574",
  herb: "#5F6B4A",
  chili: "#A35A3C",
};

function svg({ w = 1200, h = 900, bg, shapes, label }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <filter id="grain">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch"/>
      <feColorMatrix type="matrix" values="0 0 0 0 0.2  0 0 0 0 0.15  0 0 0 0 0.1  0 0 0 0.12 0"/>
    </filter>
    <radialGradient id="vignette" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="${bg}" stop-opacity="1"/>
      <stop offset="100%" stop-color="${palette.cocoa}" stop-opacity="0.35"/>
    </radialGradient>
  </defs>
  <rect width="100%" height="100%" fill="${bg}"/>
  <rect width="100%" height="100%" fill="url(#vignette)"/>
  ${shapes}
  <rect width="100%" height="100%" filter="url(#grain)" opacity="0.55"/>
  <text x="48" y="${h - 48}" font-family="Georgia, serif" font-size="28" fill="${palette.vanilla}" opacity="0.55">${label}</text>
</svg>`;
}

const images = {
  "hero-table.svg": svg({
    w: 1400,
    h: 1400,
    bg: palette.rice,
    label: "Shared table",
    shapes: `
      <circle cx="700" cy="700" r="520" fill="${palette.walnut}" opacity="0.25"/>
      <circle cx="700" cy="700" r="460" fill="${palette.soft}" opacity="0.9"/>
      <ellipse cx="520" cy="560" rx="140" ry="100" fill="${palette.broth}"/>
      <ellipse cx="780" cy="520" rx="160" ry="110" fill="${palette.accent}" opacity="0.85"/>
      <ellipse cx="640" cy="780" rx="150" ry="105" fill="${palette.herb}" opacity="0.8"/>
      <ellipse cx="880" cy="760" rx="120" ry="90" fill="${palette.chili}" opacity="0.75"/>
      <circle cx="480" cy="820" r="55" fill="${palette.moss}" opacity="0.7"/>
      <circle cx="900" cy="580" r="40" fill="${palette.cocoa}" opacity="0.5"/>
    `,
  }),
  "hero-bowl.svg": svg({
    w: 1000,
    h: 1000,
    bg: palette.cocoa,
    label: "Bowl",
    shapes: `
      <circle cx="500" cy="520" r="320" fill="${palette.roasted}"/>
      <circle cx="500" cy="500" r="260" fill="${palette.broth}"/>
      <circle cx="500" cy="500" r="180" fill="${palette.walnut}" opacity="0.35"/>
      <path d="M320 480 Q500 420 680 490" stroke="${palette.herb}" stroke-width="8" fill="none" opacity="0.7"/>
    `,
  }),
  "pho.svg": svg({
    bg: palette.roasted,
    label: "Phở",
    shapes: `
      <ellipse cx="600" cy="480" rx="380" ry="280" fill="${palette.cocoa}" opacity="0.4"/>
      <ellipse cx="600" cy="470" rx="320" ry="240" fill="${palette.broth}"/>
      <path d="M340 450 Q600 380 860 470" stroke="${palette.soft}" stroke-width="6" fill="none" opacity="0.5"/>
      <circle cx="500" cy="460" r="35" fill="${palette.accent}" opacity="0.8"/>
      <circle cx="680" cy="500" r="28" fill="${palette.chili}" opacity="0.7"/>
    `,
  }),
  "banh-xeo.svg": svg({
    bg: palette.ash,
    label: "Bánh Xèo",
    shapes: `
      <ellipse cx="620" cy="480" rx="420" ry="260" fill="${palette.vanilla}" transform="rotate(-18 620 480)"/>
      <ellipse cx="620" cy="480" rx="380" ry="220" fill="#E8C56A" transform="rotate(-18 620 480)"/>
      <ellipse cx="560" cy="470" rx="80" ry="50" fill="${palette.herb}" opacity="0.8" transform="rotate(-18 560 470)"/>
      <circle cx="700" cy="500" r="40" fill="${palette.chili}" opacity="0.75"/>
    `,
  }),
  "nem-nuong.svg": svg({
    bg: palette.soft,
    label: "Nem Nướng",
    shapes: `
      <rect x="380" y="280" width="440" height="420" rx="20" fill="${palette.rice}"/>
      <ellipse cx="520" cy="420" rx="55" ry="140" fill="${palette.accent}" transform="rotate(12 520 420)"/>
      <ellipse cx="640" cy="440" rx="50" ry="130" fill="${palette.chili}" transform="rotate(-8 640 440)"/>
      <ellipse cx="580" cy="620" rx="120" ry="40" fill="${palette.moss}" opacity="0.7"/>
    `,
  }),
  "com-ga.svg": svg({
    bg: palette.vanilla,
    label: "Cơm Gà",
    shapes: `
      <ellipse cx="600" cy="520" rx="360" ry="260" fill="${palette.rice}"/>
      <ellipse cx="480" cy="480" rx="140" ry="100" fill="${palette.soft}"/>
      <ellipse cx="720" cy="500" rx="150" ry="110" fill="${palette.broth}" opacity="0.9"/>
      <path d="M650 420 Q720 380 790 450" stroke="${palette.herb}" stroke-width="10" fill="none"/>
    `,
  }),
  "crispy-chicken.svg": svg({
    bg: palette.rice,
    label: "Cơm Đỏ Gà Giòn",
    shapes: `
      <ellipse cx="580" cy="500" rx="340" ry="250" fill="${palette.soft}"/>
      <ellipse cx="500" cy="480" rx="160" ry="120" fill="#D4A574"/>
      <ellipse cx="720" cy="520" rx="130" ry="100" fill="${palette.accent}" opacity="0.85"/>
      <circle cx="680" cy="400" r="45" fill="#F0D78C"/>
    `,
  }),
  "bun-rieu.svg": svg({
    bg: palette.cocoa,
    label: "Bún Riêu",
    shapes: `
      <circle cx="600" cy="470" r="290" fill="${palette.roasted}"/>
      <circle cx="600" cy="470" r="240" fill="#C45C45"/>
      <circle cx="560" cy="450" r="50" fill="${palette.soft}" opacity="0.8"/>
      <circle cx="660" cy="500" r="35" fill="${palette.herb}" opacity="0.7"/>
    `,
  }),
  "hu-tieu.svg": svg({
    bg: palette.walnut,
    label: "Hủ Tiếu",
    shapes: `
      <ellipse cx="600" cy="480" rx="340" ry="260" fill="${palette.cocoa}" opacity="0.5"/>
      <ellipse cx="600" cy="470" rx="290" ry="220" fill="${palette.broth}"/>
      <path d="M380 460 Q600 400 820 480" stroke="${palette.soft}" stroke-width="5" fill="none" opacity="0.6"/>
      <ellipse cx="640" cy="520" rx="70" ry="40" fill="${palette.ash}" opacity="0.5"/>
    `,
  }),
  "shaking-beef.svg": svg({
    bg: palette.soft,
    label: "Bò Lúc Lắc",
    shapes: `
      <ellipse cx="600" cy="520" rx="340" ry="240" fill="${palette.rice}"/>
      <rect x="420" y="360" width="360" height="260" rx="12" fill="${palette.cocoa}" opacity="0.15"/>
      <circle cx="520" cy="460" r="45" fill="${palette.accent}"/>
      <circle cx="620" cy="500" r="40" fill="${palette.chili}"/>
      <circle cx="700" cy="450" r="38" fill="${palette.roasted}"/>
      <ellipse cx="600" cy="600" rx="160" ry="50" fill="${palette.herb}" opacity="0.55"/>
    `,
  }),
  "herbs.svg": svg({
    w: 900,
    h: 1200,
    bg: palette.vanilla,
    label: "Herbs",
    shapes: `
      <ellipse cx="450" cy="520" rx="280" ry="360" fill="${palette.herb}" opacity="0.25"/>
      <path d="M300 700 Q450 200 600 700" stroke="${palette.herb}" stroke-width="18" fill="none"/>
      <path d="M360 680 Q480 280 580 720" stroke="${palette.moss}" stroke-width="12" fill="none"/>
      <circle cx="420" cy="380" r="50" fill="${palette.herb}" opacity="0.7"/>
      <circle cx="520" cy="340" r="40" fill="${palette.moss}" opacity="0.8"/>
    `,
  }),
  "sauce.svg": svg({
    w: 1100,
    h: 700,
    bg: palette.ash,
    label: "Dipping sauce",
    shapes: `
      <ellipse cx="550" cy="360" rx="280" ry="200" fill="${palette.rice}"/>
      <ellipse cx="550" cy="360" rx="200" ry="140" fill="${palette.chili}" opacity="0.85"/>
      <circle cx="500" cy="340" r="20" fill="${palette.soft}" opacity="0.6"/>
      <circle cx="600" cy="380" r="12" fill="${palette.herb}" opacity="0.7"/>
    `,
  }),
  "drink.svg": svg({
    w: 800,
    h: 1200,
    bg: palette.soft,
    label: "Iced drink",
    shapes: `
      <rect x="280" y="220" width="240" height="720" rx="20" fill="${palette.rice}"/>
      <rect x="300" y="260" width="200" height="560" rx="12" fill="#8B5A3C" opacity="0.75"/>
      <ellipse cx="400" cy="280" rx="90" ry="30" fill="${palette.soft}" opacity="0.5"/>
      <rect x="340" y="200" width="40" height="80" fill="${palette.ash}" opacity="0.6"/>
    `,
  }),
  "interior.svg": svg({
    w: 1600,
    h: 1000,
    bg: palette.roasted,
    label: "Interior",
    shapes: `
      <rect x="0" y="0" width="1600" height="1000" fill="${palette.cocoa}" opacity="0.3"/>
      <rect x="120" y="200" width="500" height="600" fill="${palette.walnut}" opacity="0.4"/>
      <rect x="700" y="280" width="700" height="520" fill="${palette.vanilla}" opacity="0.2"/>
      <ellipse cx="400" cy="700" rx="180" ry="60" fill="${palette.ash}" opacity="0.35"/>
      <ellipse cx="1000" cy="720" rx="200" ry="70" fill="${palette.ash}" opacity="0.3"/>
      <rect x="200" y="120" width="300" height="40" fill="${palette.moss}" opacity="0.4"/>
    `,
  }),
  "storefront.svg": svg({
    w: 1400,
    h: 900,
    bg: palette.ash,
    label: "Storefront",
    shapes: `
      <rect x="200" y="180" width="1000" height="620" fill="${palette.cocoa}" opacity="0.5"/>
      <rect x="280" y="260" width="840" height="460" fill="${palette.vanilla}" opacity="0.35"/>
      <rect x="400" y="100" width="600" height="80" fill="${palette.roasted}"/>
      <text x="700" y="155" text-anchor="middle" font-family="Georgia, serif" font-size="36" fill="${palette.vanilla}">Bà TỒ</text>
    `,
  }),
  "tableware.svg": svg({
    bg: palette.soft,
    label: "Tableware",
    shapes: `
      <circle cx="420" cy="450" r="180" fill="${palette.rice}" stroke="${palette.ash}" stroke-width="8"/>
      <circle cx="780" cy="500" r="140" fill="${palette.vanilla}" stroke="${palette.walnut}" stroke-width="6"/>
      <rect x="560" y="300" width="18" height="280" rx="4" fill="${palette.cocoa}" opacity="0.4" transform="rotate(25 569 440)"/>
    `,
  }),
  "macro.svg": svg({
    w: 1000,
    h: 1000,
    bg: palette.broth,
    label: "Macro detail",
    shapes: `
      <circle cx="500" cy="500" r="400" fill="${palette.chili}" opacity="0.3"/>
      <circle cx="400" cy="420" r="120" fill="${palette.herb}" opacity="0.5"/>
      <circle cx="620" cy="560" r="90" fill="${palette.accent}" opacity="0.45"/>
    `,
  }),
  "noodles-detail.svg": svg({
    bg: palette.vanilla,
    label: "Noodles",
    shapes: `
      <path d="M100 300 Q400 100 700 350 T1100 280" stroke="${palette.broth}" stroke-width="14" fill="none"/>
      <path d="M80 400 Q450 200 750 420 T1120 380" stroke="${palette.walnut}" stroke-width="12" fill="none"/>
      <path d="M120 500 Q420 300 720 500 T1100 480" stroke="${palette.rice}" stroke-width="16" fill="none"/>
    `,
  }),
  "rice-detail.svg": svg({
    w: 900,
    h: 1200,
    bg: palette.soft,
    label: "Rice",
    shapes: `
      ${Array.from({ length: 40 }, (_, i) => {
        const x = 150 + (i % 8) * 80 + (i % 2) * 20;
        const y = 200 + Math.floor(i / 8) * 160;
        return `<ellipse cx="${x}" cy="${y}" rx="28" ry="16" fill="${palette.rice}" opacity="0.85"/>`;
      }).join("")}
    `,
  }),
  "gallery-01.svg": svg({ bg: palette.rice, label: "Set cuốn", shapes: `<ellipse cx="600" cy="450" rx="300" ry="200" fill="${palette.moss}" opacity="0.4"/><rect x="400" y="350" width="400" height="200" rx="16" fill="${palette.soft}" opacity="0.7"/>` }),
  "gallery-02.svg": svg({ bg: palette.vanilla, label: "Bún thịt nướng", shapes: `<ellipse cx="600" cy="480" rx="320" ry="240" fill="${palette.herb}" opacity="0.35"/><circle cx="520" cy="460" r="60" fill="${palette.accent}" opacity="0.7"/>` }),
  "gallery-03.svg": svg({ bg: palette.ash, label: "Cơm chiên", shapes: `<ellipse cx="600" cy="500" rx="340" ry="220" fill="${palette.broth}" opacity="0.7"/>` }),
  "gallery-04.svg": svg({ bg: palette.soft, label: "Bún chả giò", shapes: `<rect x="380" y="300" width="80" height="280" rx="12" fill="${palette.chili}" opacity="0.8" transform="rotate(-10 420 440)"/><ellipse cx="700" cy="500" rx="200" ry="150" fill="${palette.herb}" opacity="0.4"/>` }),
  "gallery-05.svg": svg({ bg: palette.rice, label: "Bún mắm nêm", shapes: `<circle cx="600" cy="470" r="250" fill="${palette.walnut}" opacity="0.35"/>` }),
  "gallery-06.svg": svg({ bg: palette.roasted, label: "Bánh canh", shapes: `<ellipse cx="600" cy="480" rx="300" ry="220" fill="${palette.broth}"/>` }),
  "gallery-07.svg": svg({ bg: palette.vanilla, label: "Hủ tiếu khô", shapes: `<ellipse cx="600" cy="500" rx="320" ry="200" fill="${palette.ash}" opacity="0.5"/>` }),
  "gallery-08.svg": svg({ bg: palette.soft, label: "Mỳ xào", shapes: `<path d="M200 400 Q600 200 1000 500" stroke="${palette.accent}" stroke-width="20" fill="none" opacity="0.6"/>` }),
  "gallery-09.svg": svg({ bg: palette.ash, label: "Chả giò", shapes: `<rect x="450" y="280" width="70" height="320" rx="14" fill="${palette.chili}" transform="rotate(-15 485 440)"/><rect x="560" y="300" width="70" height="300" rx="14" fill="${palette.accent}" transform="rotate(8 595 450)"/>` }),
  "gallery-10.svg": svg({ bg: palette.rice, label: "Mỳ gà giòn", shapes: `<ellipse cx="580" cy="480" rx="300" ry="220" fill="${palette.broth}" opacity="0.8"/>` }),
  "gallery-11.svg": svg({ bg: palette.vanilla, label: "Mỳ gói", shapes: `<circle cx="600" cy="470" r="260" fill="${palette.walnut}" opacity="0.3"/>` }),
  "gallery-12.svg": svg({ bg: palette.soft, label: "Mỳ trứng bò", shapes: `<ellipse cx="600" cy="500" rx="340" ry="230" fill="${palette.accent}" opacity="0.35"/>` }),
};

for (const [name, content] of Object.entries(images)) {
  writeFileSync(join(outDir, name), content);
  console.log("wrote", name);
}

// Also write .jpg aliases as SVG copies so next/image paths resolve;
// Next.js serves SVG fine; we map jpg paths to svg via rewrites or duplicate names.
// Create symlink-style copies with .jpg extension won't work as SVG.
// Instead: update data to use .svg OR convert. We'll use .svg in public and rewrite in next.config.

console.log("Done:", Object.keys(images).length, "images");
