import { useCallback, useEffect, useRef, useState } from "react";
import beforeImg from "@/assets/before.jpg";
import afterImg from "@/assets/after.jpg";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const set = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(
      Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)),
    );
  }, []);

  useEffect(() => {
    const move = (e: PointerEvent) => dragging.current && set(e.clientX);
    const up = () => (dragging.current = false);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [set]);

  return (
    <section className="relative py-24 lg:py-32">
      <SectionHeading
        eyebrow="Before / After"
        title="See the Solar Transformation"
        subtitle="Drag the handle to compare the same property before and after a professionally installed rooftop system."
      />

      <Reveal delay={120} className="mx-auto mt-14 max-w-5xl px-5 lg:px-8">
        <div
          ref={ref}
          onPointerDown={(e) => {
            dragging.current = true;
            set(e.clientX);
          }}
          className="glass relative aspect-[16/10] cursor-ew-resize touch-none overflow-hidden rounded-3xl select-none"
        >
          <img
            src={afterImg}
            alt="Modern villa after a professional rooftop solar system installation"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={beforeImg}
              alt="The same modern villa before solar panels were installed"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ width: ref.current?.clientWidth ?? "100%" }}
            />
            <span className="absolute top-5 left-5 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold tracking-[0.18em] uppercase backdrop-blur-md">
              Before
            </span>
          </div>
          <span className="absolute top-5 right-5 rounded-full bg-background/70 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase backdrop-blur-md">
            After
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-primary"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute top-1/2 left-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-primary/60 bg-background/80 text-sm backdrop-blur-md">
              ⇄
            </span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
