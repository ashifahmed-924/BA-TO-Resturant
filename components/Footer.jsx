import { business } from "@/data/baTo";
import BrandMark from "@/components/BrandMark";

const socialLinks = [
  {
    id: "facebook",
    label: "Facebook",
    href: business.social?.facebook,
    icon: (
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    ),
  },
  {
    id: "instagram",
    label: "Instagram",
    href: business.social?.instagram,
    icon: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    id: "youtube",
    label: "YouTube",
    href: business.social?.youtube,
    icon: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    id: "twitter",
    label: "Twitter",
    href: business.social?.twitter,
    icon: (
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    ),
  },
].filter((item) => item.href);

export default function Footer() {
  return (
    <footer className="bg-vanilla px-5 pb-10 pt-16 md:px-10 md:pt-20">
      <div className="mx-auto max-w-[1200px]">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <BrandMark size="lg" showSubtext={false} />

          <nav
            className="flex items-center gap-3"
            aria-label="Social media"
          >
            {socialLinks.map((item) => (
              <a
                key={item.id}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                data-cursor="GO"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-cocoa/15 text-cocoa transition-colors hover:border-roasted hover:bg-roasted hover:text-soft-vanilla"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  {item.icon}
                </svg>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 grid gap-10 border-t border-walnut/15 pt-10 md:grid-cols-3">
          <div>
            <p className="text-xs tracking-[0.2em] text-deep-ash">
              VIETNAMESE CUISINE
            </p>
          </div>
          <div className="md:text-center">
            <p className="text-sm leading-relaxed text-cocoa">
              {business.address.street}
              <br />
              {business.address.suburb} {business.address.state}{" "}
              {business.address.postcode}
            </p>
          </div>
          <div className="md:text-right">
            <a
              href={business.phoneHref}
              className="text-sm tracking-wide text-cocoa hover:text-roasted"
            >
              {business.phoneDisplay}
            </a>
          </div>
        </div>

        <nav
          className="mt-10 flex flex-wrap gap-6 text-xs font-semibold tracking-[0.18em] text-deep-ash"
          aria-label="Footer"
        >
          <a href="#menu" className="hover:text-cocoa">
            MENU
          </a>
          <a href="#specials" className="hover:text-cocoa">
            SPECIALS
          </a>
          <a href="#visit" className="hover:text-cocoa">
            VISIT
          </a>
          <a href={business.phoneHref} className="hover:text-cocoa">
            CALL
          </a>
          {business.orderUrl && (
            <a
              href={business.orderUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cocoa"
            >
              ORDER
            </a>
          )}
        </nav>

        <p className="mt-12 text-xs text-ash">© 2026 Bà TỒ</p>
      </div>
    </footer>
  );
}
