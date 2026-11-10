import logo from "@/assets/logo-mark.jpg.asset.json";
import { cn } from "@/lib/utils";

/**
 * Reinvent Energies emblem: the original circular logo (white plate intact)
 * set inside a glowing ring with a slow orbiting accent and halo pulse.
 */
export function BrandEmblem({
  size = 320,
  className,
  style,
}: {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size, ...style }}
      aria-hidden
    >
      {/* soft radial halo */}
      <div className="animate-halo-pulse absolute inset-[-6%] rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--primary)_32%,transparent),transparent_68%)] blur-2xl" />

      {/* orbiting dash ring */}
      <div className="animate-spin-slow absolute inset-0 rounded-full border border-dashed border-primary/40" />
      {/* counter-rotating fine ring */}
      <div className="animate-spin-rev absolute inset-[5%] rounded-full border border-primary/20" />

      {/* white logo plate with circular stroke */}
      <div className="animate-logo-breathe relative grid h-[86%] w-[86%] place-items-center overflow-hidden rounded-full bg-white ring-1 ring-primary/40 shadow-[0_40px_90px_-40px_color-mix(in_oklab,var(--primary)_65%,transparent)]">
        <img
          src={logo.url}
          alt="Reinvent Energies logo"
          width={size}
          height={size}
          className="h-[104%] w-[104%] max-w-none object-contain"
        />
      </div>

      {/* outer glow stroke */}
      <div className="pointer-events-none absolute inset-[7%] rounded-full border border-primary/50 shadow-[0_0_70px_-10px_color-mix(in_oklab,var(--primary)_55%,transparent)]" />
    </div>
  );
}
