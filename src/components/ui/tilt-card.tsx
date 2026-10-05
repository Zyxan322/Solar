import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

/** Glass card with cursor-following light and a real 3D perspective tilt. */
export function TiltCard({ children, className, intensity = 12 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [light, setLight] = useState({ x: 50, y: 50, on: false });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setLight({ x: px * 100, y: py * 100, on: true });
    setStyle({
      transform: `perspective(1100px) rotateX(${(0.5 - py) * intensity}deg) rotateY(${(px - 0.5) * intensity}deg) translate3d(0,-10px,32px)`,
    });
  };

  const onLeave = () => {
    setStyle({
      transform: "perspective(1100px) rotateX(0deg) rotateY(0deg) translateZ(0)",
    });
    setLight((l) => ({ ...l, on: false }));
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      className={cn(
        "glass glow-border group relative overflow-hidden rounded-2xl [transform-style:preserve-3d] transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-cinema)] will-change-transform hover:shadow-[var(--shadow-glow)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(340px circle at ${light.x}% ${light.y}%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 65%)`,
          opacity: light.on ? 1 : 0,
        }}
      />
      <div className="relative [transform-style:preserve-3d]">{children}</div>
    </div>
  );
}
