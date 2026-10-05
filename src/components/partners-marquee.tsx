const badges = [
  "Tier-1 Modules",
  "Hybrid Inverters",
  "Lithium Storage",
  "Net Metering",
  "IEC Certified",
  "25-Year Warranty",
  "Wind-Load Engineered",
  "On-Grid & Off-Grid",
];

/** Infinite scrolling trust strip — duplicated track for a seamless loop. */
export function PartnersMarquee() {
  const track = [...badges, ...badges];

  return (
    <section
      aria-label="Certifications and capabilities"
      className="relative overflow-hidden border-y border-border bg-surface/50 py-5"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-[linear-gradient(90deg,var(--color-background),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-[linear-gradient(270deg,var(--color-background),transparent)]" />
      <div className="flex w-max animate-marquee items-center gap-10 will-change-transform">
        {track.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className="flex shrink-0 items-center gap-3 text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase transition-colors duration-300 hover:text-primary"
          >
            <span className="h-1.5 w-1.5 animate-tick-glow rounded-full bg-primary" />
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}
