export default function SectionLabel({ number, label, className = "" }) {
  return (
    <p
      className={`text-[0.7rem] font-semibold tracking-[0.24em] text-deep-ash ${className}`}
    >
      <span className="text-walnut">{number}</span>
      <span className="mx-2 text-ash">/</span>
      <span>{label}</span>
    </p>
  );
}
