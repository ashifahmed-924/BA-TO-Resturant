export default function BrandMark({
  size = "md",
  showSubtext = false,
  className = "",
}) {
  const sizes = {
    sm: "text-lg leading-none",
    md: "text-2xl leading-none md:text-[1.65rem]",
    lg: "text-4xl leading-none md:text-6xl",
  };

  return (
    <div className={`font-display font-viet text-cocoa ${className}`}>
      <span className={`block font-semibold tracking-[-0.02em] ${sizes[size]}`}>
        <span className="block">Bà</span>
        <span className="block">TỒ</span>
      </span>
      {showSubtext && (
        <span className="mt-2 block text-[0.55rem] font-semibold tracking-[0.22em] text-deep-ash md:text-[0.6rem]">
          VIETNAMESE CUISINE
          <br />
          SPRINGVALE SOUTH
        </span>
      )}
    </div>
  );
}
