import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
  lift?: number;
  glare?: boolean;
};

export function Tilt3D({ children, className }: Props) {
  return <div className={cn("h-full", className)}>{children}</div>;
}
