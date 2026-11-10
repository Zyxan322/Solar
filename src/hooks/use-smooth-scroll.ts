import { useEffect } from "react";

/** Lenis smooth scrolling, disabled under reduced-motion. */
export function useSmoothScroll() {
  useEffect(() => {
    let lenis: { destroy: () => void; raf: (t: number) => void } | null = null;
    let raf = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({ duration: 1.1, smoothWheel: true });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
}
