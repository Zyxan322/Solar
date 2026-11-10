import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "solar" | "glass" | "gold";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
  target?: string;
  rel?: string;
};

const variants: Record<Variant, string> = {
  solar: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
  glass: "glass text-foreground hover:border-primary/40 hover:bg-surface-2/70",
  gold: "bg-gold text-primary-foreground shadow-sm hover:opacity-90",
};

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "solar",
  className,
  type = "button",
  ariaLabel,
  target,
  rel,
}: Props) {
  const classes = cn(
    "btn-3d inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-[transform,background-color,border-color,box-shadow,opacity] duration-250 ease-out hover:-translate-y-0.5 active:translate-y-0",
    variants[variant],
    className,
  );

  if (href?.startsWith("/")) {
    return (
      <Link to={href} aria-label={ariaLabel} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        aria-label={ariaLabel}
        target={target}
        rel={rel}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
