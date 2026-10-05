import type { ReactNode } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "li" | "article" | "span";
  /** "3d" (default) rotates in from depth, "fade" is a plain rise. */
  variant?: "3d" | "fade";
};

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variant = "3d",
}: Props) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const Tag = as as "div";

  const hidden =
    variant === "3d"
      ? "opacity-0 blur-[6px] [transform:perspective(1400px)_translate3d(0,44px,-140px)_rotateX(14deg)]"
      : "opacity-0 blur-[6px] [transform:translate3d(0,32px,0)]";

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-[1000ms] [transform-style:preserve-3d] [transition-timing-function:var(--ease-cinema)] will-change-transform",
        visible
          ? "opacity-100 blur-0 [transform:perspective(1400px)_translate3d(0,0,0)_rotateX(0deg)]"
          : hidden,
        className,
      )}
    >
      {children}
    </Tag>
  );
}
