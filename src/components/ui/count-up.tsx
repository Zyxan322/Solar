import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Props = {
  /** Target number to animate to. */
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  /** Thousand separators (en-PK grouping). */
  group?: boolean;
  duration?: number;
  /** Start only when scrolled into view (default) or immediately. */
  onView?: boolean;
  className?: string;
  /** Extra class for the suffix span. */
  suffixClassName?: string;
};

const fmt = (n: number, decimals: number, group: boolean) =>
  group
    ? n.toLocaleString("en-PK", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : n.toFixed(decimals);

/**
 * Animated number that "calculates" up to its target — on first view and again
 * whenever the target changes (e.g. calculator inputs).
 */
export function CountUp({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  group = false,
  duration = 1400,
  onView = true,
  className,
  suffixClassName,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduced = usePrefersReducedMotion();
  const [started, setStarted] = useState(!onView);
  const [display, setDisplay] = useState(onView ? 0 : value);
  const [running, setRunning] = useState(false);
  const from = useRef(0);

  // viewport trigger
  useEffect(() => {
    if (started) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setStarted(true);
          io.disconnect();
        }
      },
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [started]);

  // tween whenever target changes (after start)
  useEffect(() => {
    if (!started) return;
    if (reduced) {
      setDisplay(value);
      return;
    }
    const start = performance.now();
    const begin = from.current;
    const delta = value - begin;
    setRunning(true);
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      const next = begin + delta * eased;
      setDisplay(next);
      from.current = next;
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        from.current = value;
        setDisplay(value);
        setRunning(false);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, started, reduced, duration]);

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-baseline tabular-nums transition-all duration-300",
        running && "[text-shadow:0_0_18px_color-mix(in_oklab,var(--color-primary)_45%,transparent)]",
        className,
      )}
    >
      {prefix.replace(/ $/, "\u00A0")}
      {fmt(display, decimals, group)}
      {suffix && (
        <span className={suffixClassName}>{suffix.replace(/^ /, "\u00A0")}</span>
      )}
    </span>
  );
}
