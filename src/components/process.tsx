import { useEffect, useRef, useState } from "react";
import { processSteps } from "@/data/site";
import { SectionHeading } from "./ui/section-heading";
import { cn } from "@/lib/utils";
import { Tilt3D } from "./ui/tilt-3d";

export function Process() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(
        Math.max((vh * 0.8 - rect.top) / (rect.height * 0.85), 0),
        1,
      );
      setProgress(p);
      setActive(
        Math.min(processSteps.length - 1, Math.floor(p * processSteps.length)),
      );
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="section-dark aurora-green relative overflow-hidden py-24 lg:py-32">
      <SectionHeading
        eyebrow="How It Works"
        title="Five Steps from First Call to Clean Power"
      />

      <div
        ref={sectionRef}
        className="mx-auto mt-16 grid max-w-7xl gap-10 px-5 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8"
      >
        <Tilt3D intensity={10} lift={24}>
          <div className="relative overflow-hidden rounded-3xl shadow-[var(--shadow-elegant)]">
            {processSteps.map((step, i) => (
              <img
                key={step.number}
                src={step.image}
                alt={step.alt}
                loading="lazy"
                className={cn(
                  "h-[340px] w-full object-cover transition-all duration-[900ms] [transition-timing-function:var(--ease-cinema)] sm:h-[460px]",
                  i === active
                    ? "relative opacity-100"
                    : "absolute inset-0 scale-105 opacity-0",
                )}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_oklab,var(--color-background)_80%,transparent))]" />
          </div>
        </Tilt3D>

        <div className="relative pl-8">
          <div className="absolute top-2 bottom-2 left-[13px] w-px bg-border" />
          <div
            className="absolute top-2 left-[13px] w-px origin-top bg-[var(--gradient-primary)] transition-[height] duration-300"
            style={{ height: `calc(${progress * 100}% - 8px)` }}
          />
          <ol className="space-y-6">
            {processSteps.map((step, i) => (
              <li
                key={step.number}
                className={cn(
                  "relative [perspective:900px] transition-all duration-700 [transition-timing-function:var(--ease-cinema)] will-change-transform",
                  i === active
                    ? "opacity-100 [transform:translate3d(0,0,26px)_rotateY(0deg)]"
                    : "opacity-45 [transform:translate3d(0,0,-30px)_rotateY(-6deg)]",
                )}
              >
                <span
                  className={cn(
                    "absolute top-2 -left-8 h-3.5 w-3.5 rounded-full border transition-all duration-500",
                    i <= active
                      ? "border-primary bg-primary shadow-[0_0_18px_color-mix(in_oklab,var(--color-primary)_70%,transparent)]"
                      : "border-border bg-surface",
                  )}
                />
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-sm font-bold text-primary">
                    {step.number}
                  </span>
                  <h3 className="font-display text-lg font-semibold sm:text-xl">
                    {step.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
