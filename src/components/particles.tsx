import { useEffect, useMemo, useState } from "react";

/** Extremely subtle floating light dust (client-only to avoid SSR mismatch). */
export function Particles({ count = 22 }: { count?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const dots = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 55 + Math.random() * 45,
        size: 1 + Math.random() * 2.5,
        duration: 14 + Math.random() * 18,
        delay: Math.random() * 18,
      })),
    [count],
  );

  if (!mounted) return null;



  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d) => (
        <span
          key={d.id}
          className="animate-drift absolute rounded-full bg-gold/70 blur-[0.5px]"
          style={{
            left: `${d.left}%`,
            top: `${d.top}%`,
            width: d.size,
            height: d.size,
            animationDuration: `${d.duration}s`,
            animationDelay: `${d.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
