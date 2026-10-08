import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function TiltCard({ children, className }: Props) {
  return (
    <article
      className={cn(
        "glass glow-border group relative overflow-hidden rounded-2xl transition-[transform,box-shadow,border-color] duration-250 ease-out hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]",
        className,
      )}
    >
      {children}
    </article>
  );
}
