/**
 * Central business data for Bà TỒ Vietnamese Restaurant
 * Prices verified from Uber Eats store listing (Springvale South).
 * Hours may change — always confirm before visiting.
 */

export const business = {
  name: "Bà TỒ",
  category: "Vietnamese Restaurant",
  tagline: "Vietnamese Cuisine · Springvale South",

  address: {
    street: "22 Hosken St",
    suburb: "Springvale South",
    state: "VIC",
    postcode: "3172",
    country: "Australia",
    full: "22 Hosken St, Springvale South VIC 3172, Australia",
  },

  /** Client-supplied contact number */
  phone: "+61 422 896 789",
  phoneDisplay: "0422 896 789",
  phoneHref: "tel:+61422896789",

  mapsUrl:
    "https://www.google.com/maps/place/B%C3%A0+T%E1%BB%92/@-37.9647293,145.1607449,14z/data=!4m15!1m8!3m7!1s0x6ad615005db4db83:0x6b9707237adafc4e!2zQsOgIFThu5I!8m2!3d-37.9647198!4d145.160403!10e5!16s%2Fg%2F11lf1q8l6l",

  orderUrl:
    "https://www.ubereats.com/au/store/ba-to-vietnamese-cuisine/k7ZeXnBWVpS0gJxtOzNgQA",

  social: {
    facebook: "https://www.facebook.com/profile.php?id=61552718922214",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    twitter: "https://twitter.com/",
  },

  hours: {
    monday: "Closed",
    tuesday: "Closed",
    wednesday: "9:00 AM – 9:00 PM",
    thursday: "9:00 AM – 9:00 PM",
    friday: "9:00 AM – 9:00 PM",
    saturday: "9:00 AM – 9:00 PM",
    /** Uber Eats Sunday Menu lists ~8:45 PM; confirm before visiting */
    sunday: "9:00 AM – 8:45 PM",
  },

  hoursNote: "Trading hours may change. Please confirm before visiting.",

  hoursStructured: [
    { day: "Monday", short: "MON", hours: "Closed", open: false },
    { day: "Tuesday", short: "TUE", hours: "Closed", open: false },
    { day: "Wednesday", short: "WED", hours: "9:00 AM – 9:00 PM", open: true },
    { day: "Thursday", short: "THU", hours: "9:00 AM – 9:00 PM", open: true },
    { day: "Friday", short: "FRI", hours: "9:00 AM – 9:00 PM", open: true },
    { day: "Saturday", short: "SAT", hours: "9:00 AM – 9:00 PM", open: true },
    {
      day: "Sunday",
      short: "SUN",
      hours: "9:00 AM – 8:45 PM",
      open: true,
      note: "Confirm closing time before visiting",
    },
  ],

  /** Schema.org OpeningHoursSpecification */
  openingHoursSpecification: [
    {
      dayOfWeek: ["Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      dayOfWeek: "Sunday",
      opens: "09:00",
      closes: "20:45",
    },
  ],

  feedbackThemes: [
    {
      id: "authentic",
      theme: "FOOD",
      text: "Guests regularly describe the menu as authentically Vietnamese — from noodle soups to rice plates and crispy pancakes.",
    },
    {
      id: "atmosphere",
      theme: "TABLE",
      text: "Recent feedback highlights the restaurant’s warm and clean dining atmosphere in Springvale South.",
    },
    {
      id: "service",
      theme: "SERVICE",
      text: "Customers mention friendly service alongside Vietnamese noodle and rice dishes.",
    },
  ],

  intro:
    "Bà TỒ is a Vietnamese restaurant in Springvale South, serving noodles, rice dishes, soups, Vietnamese pancakes, coastal-style plates and other favourites.",

  tickerItems: [
    "BEEF NOODLE SOUP",
    "VIETNAMESE PANCAKE",
    "CRAB TOMATO NOODLES",
    "GRILLED SAUSAGE",
    "SQUID NOODLE SOUP",
    "CHICKEN RICE",
  ],

  heroLabels: [
    {
      id: "pho",
      label: "BEEF NOODLE SOUP",
      position: "top",
      image: "/images/ba-to/pho.jpg",
      alt: "Illustrative beef noodle soup bowl",
    },
    {
      id: "banh-xeo",
      label: "VIETNAMESE PANCAKE",
      position: "right",
      image: "/images/ba-to/banh-xeo.jpg",
      alt: "Illustrative Vietnamese pancake",
    },
    {
      id: "nem",
      label: "GRILLED SAUSAGE",
      position: "bottom",
      image: "/images/ba-to/nem-nuong.jpg",
      alt: "Illustrative grilled Vietnamese sausage",
    },
    {
      id: "bun-rieu",
      label: "CRAB TOMATO NOODLES",
      position: "left",
      image: "/images/ba-to/bun-rieu.jpg",
      alt: "Illustrative vermicelli soup with tomato broth",
    },
  ],
};

/**
 * Format price for display. Null prices show fallback copy.
 */
export function formatPrice(item) {
  if (item.price == null) {
    return item.priceFallback || "See current menu";
  }
  return `$${Number(item.price).toFixed(2)}`;
}

/** Featured / everyday menu — prices from Uber Eats everyday menu */
export const menu = [
  {
    id: "nem-nuong",
    name: "Grilled Meat Sausage Combo",
    description:
      "Grilled Vietnamese sausage served with a savoury sauce — a coastal classic.",
    price: 32,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "featured",
    tags: ["nha-trang", "featured"],
    image: "/images/ba-to/nem-nuong.jpg",
    imageIndex: "01",
    featured: true,
  },
  {
    id: "com-do-ga-gion",
    name: "Crispy Skin Chicken with Egg Rice",
    description:
      "Crispy chicken served with egg rice, offering a delightful blend of textures and flavours.",
    price: 23.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "rice",
    tags: ["featured"],
    image: "/images/ba-to/crispy-chicken.jpg",
    imageIndex: "02",
    featured: true,
  },
  {
    id: "banh-xeo",
    name: "Vietnamese Pancake",
    description: "Served with prawn and pork.",
    price: 28,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "featured",
    tags: ["featured"],
    image: "/images/ba-to/banh-xeo.jpg",
    imageIndex: "03",
    featured: true,
  },
  {
    id: "bun-rieu",
    name: "Vermicelli Soup with Pork, Prawn Paste & Tomato",
    description:
      "A tangy vermicelli soup with pork, prawn paste, and tomato.",
    price: 23.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "soups",
    tags: ["featured", "soup"],
    image: "/images/ba-to/bun-rieu.jpg",
    imageIndex: "04",
    featured: true,
  },
  {
    id: "com-bo-luc-lac",
    name: "Shaking Beef with Rice",
    description: "Tender beef cubes tossed with rice, seasoned for a savoury delight.",
    price: 25.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "rice",
    tags: ["featured"],
    image: "/images/ba-to/shaking-beef.jpg",
    imageIndex: "05",
    featured: true,
  },
  {
    id: "set-cuon",
    name: "Fried Fish & Pork Combo",
    description:
      "Fried fish and pork served with a tangy fermented fish sauce.",
    price: 32,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "featured",
    tags: ["featured"],
    image: "/images/ba-to/gallery-01.jpg",
    imageIndex: "06",
    featured: true,
  },
  {
    id: "com-ga-nha-trang",
    name: "Coastal Chicken Rice",
    description: "Chicken rice in the style of Vietnam’s central coast.",
    price: 28.5,
    priceSource: "Client / public menu",
    verified: true,
    verifiedAt: "2026-03",
    category: "rice",
    tags: ["nha-trang", "featured"],
    image: "/images/ba-to/com-ga.jpg",
    imageIndex: "07",
    featured: true,
  },
  {
    id: "hu-tieu-muc",
    name: "Squid Noodle Soup",
    description: "Served with squid, fried fish cake, prawn and minced pork.",
    price: 29,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "soups",
    tags: ["featured", "soup", "noodles"],
    image: "/images/ba-to/hu-tieu.jpg",
    imageIndex: "08",
    featured: true,
  },
  {
    id: "bun-thit-nuong",
    name: "Vermicelli with Grilled Pork & Spring Rolls",
    description:
      "Vermicelli noodles with grilled pork and crispy spring rolls, served with fresh herbs and a tangy dipping sauce.",
    price: 25.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "vermicelli",
    tags: ["featured"],
    image: "/images/ba-to/gallery-02.jpg",
    imageIndex: "09",
    featured: true,
  },
  {
    id: "com-chien",
    name: "Vietnamese Fried Rice",
    description:
      "A savoury classic: Yangzhou-style fried rice with light, fluffy grains and balanced seasoning.",
    price: 25,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "rice",
    tags: [],
    image: "/images/ba-to/gallery-03.jpg",
    imageIndex: "10",
    featured: false,
  },
  {
    id: "bun-cha-gio",
    name: "Vermicelli with Spring Rolls",
    description:
      "Vermicelli noodles with crispy spring rolls, served with fresh herbs and a tangy dipping sauce.",
    price: 23.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "vermicelli",
    tags: [],
    image: "/images/ba-to/gallery-04.jpg",
    imageIndex: "11",
    featured: false,
  },
  {
    id: "bun-mam-nem",
    name: "Vermicelli with Fermented Fish Sauce & Boiled Pork",
    description:
      "Savoury vermicelli noodles paired with fermented fish sauce and tender boiled pork.",
    price: 23,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "vermicelli",
    tags: [],
    image: "/images/ba-to/gallery-05.jpg",
    imageIndex: "12",
    featured: false,
  },
  {
    id: "banh-canh",
    name: "Thick Noodles with Fried Fish Cake",
    description: "Thick noodles or macaroni soup with fried fish cake.",
    price: 25.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "noodles",
    tags: ["soup"],
    image: "/images/ba-to/gallery-06.jpg",
    imageIndex: "13",
    featured: false,
  },
  {
    id: "pho",
    name: "Beef Noodle Soup",
    description:
      "A comforting bowl of beef noodle soup with aromatic herbs and spices — a Vietnamese classic.",
    price: 24,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "soups",
    tags: ["soup"],
    image: "/images/ba-to/pho.jpg",
    imageIndex: "14",
    featured: false,
  },
  {
    id: "hu-tieu-tom-thit",
    name: "Dry Rice Noodles with Prawn & Pork",
    description: "Served dry.",
    price: 26,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "noodles",
    tags: [],
    image: "/images/ba-to/gallery-07.jpg",
    imageIndex: "15",
    featured: false,
  },
  {
    id: "my-xao",
    name: "Stir-Fried Seafood Egg Noodles",
    description:
      "Stir-fried egg noodles with a medley of seafood, offering a delightful blend of flavours and textures.",
    price: 25.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "noodles",
    tags: [],
    image: "/images/ba-to/gallery-08.jpg",
    imageIndex: "16",
    featured: false,
  },
  {
    id: "cha-gio",
    name: "Spring Rolls",
    description:
      "Crispy spring rolls, served with fresh herbs and a tangy dipping sauce.",
    price: 20.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "featured",
    tags: [],
    image: "/images/ba-to/gallery-09.jpg",
    imageIndex: "17",
    featured: false,
  },
  {
    id: "my-ga-gion",
    name: "Crispy Skin Chicken with Dry Noodles",
    description: "Crispy chicken served with dry noodles.",
    price: 23.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "noodles",
    tags: [],
    image: "/images/ba-to/gallery-10.jpg",
    imageIndex: "18",
    featured: false,
  },
  {
    id: "my-goi-tron",
    name: "Instant Noodles with Pork Crackling, Beef, Prawn & Fried Egg",
    description:
      "Instant noodles with mixed pork crackling, beef, prawn, and a fried egg.",
    price: 23.5,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "noodles",
    tags: [],
    image: "/images/ba-to/gallery-11.jpg",
    imageIndex: "19",
    featured: false,
  },
  {
    id: "my-trung-bo",
    name: "Egg Noodles with Shaking Beef",
    description: "Tender beef cubes paired with egg noodles.",
    price: 26,
    priceSource: "Uber Eats",
    verified: true,
    verifiedAt: "2026-03",
    category: "noodles",
    tags: [],
    image: "/images/ba-to/gallery-12.jpg",
    imageIndex: "20",
    featured: false,
  },
];

/**
 * Special / weekend rotating dishes.
 * Shown on Uber Eats as Special / Saturday / Sunday menus.
 * Prices omitted when not confirmed on current everyday listing.
 */
export const specials = [
  {
    id: "bun-mang-vit",
    name: "Duck Vermicelli Soup with Bamboo Shoots",
    price: null,
    priceFallback: "See current menu",
    priceSource: null,
    verified: false,
    availability: "weekend",
    availabilityLabel: "WEEKEND / SPECIAL MENU",
  },
  {
    id: "mi-suon-bo",
    name: "Beef Ribs Egg Noodle Soup",
    price: null,
    priceFallback: "See current menu",
    priceSource: null,
    verified: false,
    availability: "special",
    availabilityLabel: "WEEKEND / SPECIAL MENU",
  },
  {
    id: "bun-bo-hue",
    name: "Spicy Beef Noodle Soup",
    price: null,
    priceFallback: "See current menu",
    priceSource: null,
    verified: false,
    availability: "weekend",
    availabilityLabel: "WEEKEND / SPECIAL MENU",
  },
];

/** No restaurant-owned promotional offers verified — use Today section for specials */
export const offers = [];

export const menuCategories = [
  { id: "featured", label: "FEATURED" },
  { id: "soups", label: "SOUPS" },
  { id: "noodles", label: "NOODLES" },
  { id: "rice", label: "RICE" },
  { id: "vermicelli", label: "VERMICELLI" },
  { id: "specials", label: "SPECIALS" },
];

export const nhaTrangDishes = [
  menu.find((m) => m.id === "nem-nuong"),
  menu.find((m) => m.id === "com-ga-nha-trang"),
].filter(Boolean);

export const soupHighlight = [
  menu.find((m) => m.id === "pho"),
  menu.find((m) => m.id === "bun-rieu"),
  menu.find((m) => m.id === "hu-tieu-muc"),
].filter(Boolean);

export const riceNoodleIndex = [
  menu.find((m) => m.id === "com-do-ga-gion"),
  menu.find((m) => m.id === "com-bo-luc-lac"),
  menu.find((m) => m.id === "com-ga-nha-trang"),
  menu.find((m) => m.id === "hu-tieu-muc"),
  menu.find((m) => m.id === "my-xao"),
].filter(Boolean);

export const gallery = [
  {
    id: "g1",
    src: "/images/ba-to/hero-table.jpg",
    alt: "Shared Vietnamese table with multiple dishes — illustrative photography",
    lane: 1,
  },
  {
    id: "g2",
    src: "/images/ba-to/pho.jpg",
    alt: "Close-up of a beef noodle soup bowl — illustrative",
    lane: 2,
  },
  {
    id: "g3",
    src: "/images/ba-to/banh-xeo.jpg",
    alt: "Golden Vietnamese pancake — illustrative",
    lane: 3,
  },
  {
    id: "g4",
    src: "/images/ba-to/nem-nuong.jpg",
    alt: "Grilled Vietnamese sausage — illustrative",
    lane: 1,
  },
  {
    id: "g5",
    src: "/images/ba-to/com-ga.jpg",
    alt: "Coastal-style chicken rice plate — illustrative",
    lane: 2,
  },
  {
    id: "g6",
    src: "/images/ba-to/crispy-chicken.jpg",
    alt: "Crispy chicken with rice — illustrative",
    lane: 3,
  },
  {
    id: "g7",
    src: "/images/ba-to/bun-rieu.jpg",
    alt: "Vermicelli soup with tomato broth — illustrative",
    lane: 1,
  },
  {
    id: "g8",
    src: "/images/ba-to/hu-tieu.jpg",
    alt: "Squid noodle soup bowl — illustrative",
    lane: 2,
  },
  {
    id: "g9",
    src: "/images/ba-to/herbs.jpg",
    alt: "Fresh Vietnamese herbs and dipping sauce — illustrative",
    lane: 3,
  },
  {
    id: "g10",
    src: "/images/ba-to/drink.jpg",
    alt: "Iced Vietnamese-style beverage — illustrative",
    lane: 1,
  },
  {
    id: "g11",
    src: "/images/ba-to/interior.jpg",
    alt: "Warm restaurant interior dining setting — illustrative",
    lane: 2,
  },
  {
    id: "g12",
    src: "/images/ba-to/tableware.jpg",
    alt: "Ceramic bowls and tableware details — illustrative",
    lane: 3,
  },
  {
    id: "g13",
    src: "/images/ba-to/storefront.jpg",
    alt: "Restaurant storefront exterior — illustrative",
    lane: 1,
  },
  {
    id: "g14",
    src: "/images/ba-to/macro.jpg",
    alt: "Food detail macro photograph — illustrative",
    lane: 2,
  },
  {
    id: "g15",
    src: "/images/ba-to/shaking-beef.jpg",
    alt: "Shaking beef with rice — illustrative",
    lane: 3,
  },
];

export const tableDetails = [
  {
    id: "d1",
    title: "Fresh herbs",
    note: "Mint, coriander and greens brought to the table for every bowl.",
    src: "/images/ba-to/herbs.jpg",
    alt: "Fresh herbs on the table — illustrative",
  },
  {
    id: "d2",
    title: "Dipping sauces",
    note: "Small dishes of fish sauce, chilli and house dips beside each plate.",
    src: "/images/ba-to/sauce.jpg",
    alt: "Dipping sauce in a ceramic dish — illustrative",
  },
  {
    id: "d3",
    title: "Noodle bowls",
    note: "Slippery rice noodles and egg noodles in clear or rich broths.",
    src: "/images/ba-to/noodles-detail.jpg",
    alt: "Noodle texture detail — illustrative",
  },
  {
    id: "d4",
    title: "Steamed rice",
    note: "Plain or egg rice as the quiet base for grilled and fried plates.",
    src: "/images/ba-to/rice-detail.jpg",
    alt: "Steamed rice grains — illustrative",
  },
  {
    id: "d5",
    title: "Cold drinks",
    note: "Iced teas and soft drinks to cut through spice and heat.",
    src: "/images/ba-to/drink.jpg",
    alt: "Iced Vietnamese-style drink — illustrative",
  },
];

export const drinksNote =
  "Explore current drinks and desserts in store. Cold beverages, special teas, iced drinks and desserts appear on the ordering menu — ask the team for today’s selection.";
