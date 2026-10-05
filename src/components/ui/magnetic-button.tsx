import { useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

type Variant = "solar" | "glass" | "gold";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
};

const variants: Record<Variant, string> = {
  solar:
    "bg-primary text-primary-foreground shadow-[var(--shadow-glow)] hover:brightness-110",
  glass:
    "glass text-foreground hover:border-primary/40 hover:bg-surface-2/70",
  gold: "bg-gold text-primary-foreground hover:brightness-110",
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solar",
  className,
  type = "button",
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const [t, setT] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || reduced) return;
    const r = el.getBoundingClientRect();
    setT({
      x: (e.clientX - (r.left + r.width / 2)) * 0.22,
      y: (e.clientY - (r.top + r.height / 2)) * 0.3,
    });
  };

  const classes = cn(
    "btn-3d inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[transform,filter,background-color,border-color,box-shadow] duration-300 [transition-timing-function:var(--ease-cinema)]",
    variants[variant],
    className,
  );

  const style = { transform: `translate3d(${t.x}px, ${t.y}px, 0)` };
  const reset = () => setT({ x: 0, y: 0 });

  if (href?.startsWith("/")) {
    return (
      <Link
        ref={ref as React.RefObject<HTMLAnchorElement>}
        to={href}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        aria-label={ariaLabel}
        className={classes}
        style={style}
        onClick={onClick}
        onMouseMove={onMove}
        onMouseLeave={reset}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      className={classes}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={reset}
    >
      {children}
    </button>
  );
}
