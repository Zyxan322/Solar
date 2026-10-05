import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "./use-reveal";

/**
 * Smooth, spring-damped pointer parallax normalised to -0.5..0.5 on both axes.
 * Values are eased with a rAF lerp so movement feels weighted, not twitchy.
 */
export function usePointerParallax(damping = 0.08) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      target.current = {
        x: e.clientX / window.innerWidth - 0.5,
        y: e.clientY / window.innerHeight - 0.5,
      };
    };

    const loop = () => {
      const c = current.current;
      const t = target.current;
      c.x += (t.x - c.x) * damping;
      c.y += (t.y - c.y) * damping;
      setPos({ x: c.x, y: c.y });
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [damping, reduced]);

  return pos;
}
