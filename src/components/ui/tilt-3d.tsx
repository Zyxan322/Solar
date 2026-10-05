import { useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees. */
  intensity?: number;
  /** How far the content lifts toward the viewer on hover (px). */
  lift?: number;
  glare?: boolean;
};

/**
 * Unstyled 3D tilt wrapper: rotates its children in perspective space towards
 * the cursor and adds an optional moving specular glare.
 */
export function Tilt3D({
  children,
  className,
  intensity = 10,
  lift = 26,
  glare = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [rot, setRot] = useState({ x: 0, y: 0 });
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setPos({ x: px * 100, y: py * 100 });
    setRot({ x: (0.5 - py) * intensity, y: (px - 0.5) * intensity });
    setActive(true);
  };

  const onLeave = () => {
    setRot({ x: 0, y: 0 });
    setActive(false);
  };

  return (
    <div
      className={cn("[perspective:1200px]", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      ref={ref}
    >
      <div
        className="relative h-full [transform-style:preserve-3d] transition-transform duration-500 [transition-timing-function:var(--ease-cinema)] will-change-transform"
        style={{
          transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg) translateZ(${active ? lift : 0}px)`,
        }}
      >
        {children}
        {glare && (
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] opacity-0 transition-opacity duration-500"
            style={{
              opacity: active ? 1 : 0,
              background: `radial-gradient(420px circle at ${pos.x}% ${pos.y}%, color-mix(in oklab, var(--color-gold) 22%, transparent), transparent 60%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
