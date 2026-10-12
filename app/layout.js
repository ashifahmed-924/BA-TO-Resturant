import { Fraunces, Manrope, Be_Vietnam_Pro } from "next/font/google";
import { business } from "@/data/baTo";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  variable: "--font-fraunces",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-manrope",
  display: "swap",
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-be-vietnam",
  display: "swap",
});

export const metadata = {
  title: "Bà TỒ | Vietnamese Restaurant in Springvale South",
  description:
    "Explore Bà TỒ at 22 Hosken Street, Springvale South, serving Vietnamese noodle soups, rice dishes, vermicelli, crispy pancakes and more.",
  openGraph: {
    title: "Bà TỒ | Vietnamese Restaurant in Springvale South",
    description:
      "Vietnamese restaurant at 22 Hosken St, Springvale South VIC — noodles, rice dishes, soups and crispy pancakes.",
    type: "website",
    locale: "en_AU",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: business.name,
  servesCuisine: "Vietnamese",
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.suburb,
    addressRegion: business.address.state,
    postalCode: business.address.postcode,
    addressCountry: "AU",
  },
  telephone: business.phone,
  openingHoursSpecification: business.openingHoursSpecification.map((spec) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: spec.dayOfWeek,
    opens: spec.opens,
    closes: spec.closes,
  })),
  url: business.mapsUrl,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en-AU"
      className={`${fraunces.variable} ${manrope.variable} ${beVietnam.variable}`}
    >
      <body
        className="font-body antialiased"
        style={{
          fontFamily: "var(--font-manrope), var(--font-be-vietnam), sans-serif",
          ["--font-display"]:
            "var(--font-fraunces), var(--font-be-vietnam), serif",
          ["--font-body"]:
            "var(--font-manrope), var(--font-be-vietnam), sans-serif",
          ["--font-viet"]:
            "var(--font-be-vietnam), var(--font-manrope), sans-serif",
        }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
