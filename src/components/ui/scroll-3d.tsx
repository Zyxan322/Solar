import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Vertical drift in px across the full scroll pass. */
  shift?: number;
  /** Max rotateX in degrees at the edges of the viewport. */
  rotate?: number;
  /** How much the block scales down when far from centre. */
  scale?: number;
};

/**
 * Scroll-driven 3D parallax wrapper. Blocks rise, straighten and settle as they
 * approach the centre of the viewport, then tilt away again as they leave.
 */
export function Scroll3D({
  children,
  className,
  shift = 60,
  rotate = 6,
  scale = 0.04,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [p, setP] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // -1 (below viewport) .. 0 (centred) .. 1 (above viewport)
      const raw = (vh / 2 - (r.top + r.height / 2)) / (vh / 2 + r.height / 2);
      setP(Math.max(-1, Math.min(1, raw)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);

  const eased = Math.sign(p) * Math.pow(Math.abs(p), 1.4);
  const style = reduced
    ? undefined
    : {
        transform: `perspective(1600px) translate3d(0, ${-eased * shift}px, 0) rotateX(${-eased * rotate}deg) scale(${1 - Math.abs(eased) * scale})`,
        opacity: 1 - Math.abs(eased) * 0.18,
      };

  return (
    <div
      ref={ref}
      style={style}
      className={cn(
        "[transform-style:preserve-3d] will-change-transform",
        className,
      )}
    >
      {children}
    </div>
  );
}
