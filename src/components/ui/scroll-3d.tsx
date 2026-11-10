import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  shift?: number;
  rotate?: number;
  scale?: number;
};

export function Scroll3D({ children, className }: Props) {
  return <div className={cn(className)}>{children}</div>;
}
