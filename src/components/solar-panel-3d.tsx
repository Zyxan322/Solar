import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import panel from "@/assets/solar-panel-3d.png";

/** Photoreal 3D solar panel render with pointer-reactive parallax tilt and glow. */
export function SolarPanel3D() {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      setTilt({ x: -y * 16, y: x * 22 });
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none relative h-[340px] w-[340px] [perspective:1400px] sm:h-[440px] sm:w-[440px]"
    >
      {/* sun glow behind the panel */}
      <div className="animate-sun-pulse absolute inset-6 rounded-full bg-[radial-gradient(circle_at_60%_40%,color-mix(in_oklab,var(--color-gold)_45%,transparent),transparent_65%)] blur-2xl" />

      <div className="animate-float-slow absolute inset-0 grid place-items-center [transform-style:preserve-3d]">
        <img
          src={panel}
          alt=""
          width={1024}
          height={1024}
          className="h-full w-full object-contain drop-shadow-[0_40px_60px_oklch(0_0_0/0.35)] transition-transform duration-700 ease-out will-change-transform"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(0)`,
          }}
        />
      </div>

      {/* soft ground shadow */}
      <div className="absolute inset-x-16 bottom-8 h-8 rounded-[50%] bg-[radial-gradient(ellipse_at_center,oklch(0_0_0/0.28),transparent_70%)] blur-xl" />
    </div>
  );
}
