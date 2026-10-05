import { useCallback, useEffect, useRef, useState } from "react";
import { heroSlides, statistics } from "@/data/site";
import { MagneticButton } from "./ui/magnetic-button";
import { CountUp } from "./ui/count-up";

import { Particles } from "./particles";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { cn } from "@/lib/utils";

const DURATION = 6000;

/** Floating glass chips orbiting the emblem — depth values drive parallax. */
const floaters = [
  {
    label: "Expert Installation",
    depth: 44,
    delay: "0s",
  },
  {
    label: "High-Quality Products",
    depth: 64,
    delay: "1.2s",
  },
  {
    label: "Environmental Impact",
    depth: 34,
    delay: "2.1s",
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const reduced = usePrefersReducedMotion();
  const parallax = usePointerParallax();
  const touchX = useRef<number | null>(null);

  const go = useCallback((dir: number) => {
    setIndex((i) => (i + dir + heroSlides.length) % heroSlides.length);
  }, []);

  useEffect(() => setLoaded(true), []);

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(() => go(1), DURATION);
    return () => clearInterval(t);
  }, [reduced, go]);


  const layer = (depth: number) => ({
    transform: `translate3d(${parallax.x * depth}px, ${parallax.y * depth}px, 0)`,
  });

  return (
    <section
      id="home"
      className="section-dark scene-3d relative flex min-h-[100svh] items-center overflow-hidden bg-background text-foreground"
      onTouchStart={(e) => (touchX.current = e.touches[0]?.clientX ?? null)}
      onTouchEnd={(e) => {
        const start = touchX.current;
        const end = e.changedTouches[0]?.clientX;
        if (start != null && end != null && Math.abs(end - start) > 50) {
          go(end < start ? 1 : -1);
        }
        touchX.current = null;
      }}
    >
      {/* ---------- background layer ---------- */}
      <div
        className="absolute inset-[-4%] will-change-transform"
        style={layer(-18)}
      >
        {heroSlides.map((slide, i) => (
          <img
            key={slide.alt}
            src={slide.image}
            alt={slide.alt}
            width={1920}
            height={1088}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "low"}
            className={cn(
              "absolute inset-0 h-full w-full object-cover will-change-transform",
              i === index ? "opacity-100" : "opacity-0",
            )}
            style={{
              transform: i === index && !reduced ? "scale(1.09)" : "scale(1)",
              transition:
                "opacity 1600ms var(--ease-cinema), transform 10000ms linear",
            }}
          />
        ))}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, color-mix(in oklab, var(--background) 92%, transparent) 0%, color-mix(in oklab, var(--background) 72%, transparent) 42%, transparent 78%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 70%, transparent) 0%, transparent 35%, color-mix(in oklab, var(--background) 85%, transparent) 100%)",
          }}
        />
        <div aria-hidden className="grid-lines absolute inset-0 opacity-[0.12]" />
      </div>

      <Particles />

      {/* ---------- content layer ---------- */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pt-36 pb-32 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div
          className={cn(
            "max-w-2xl transition-all duration-[1100ms] [transition-timing-function:var(--ease-cinema)]",
            loaded
              ? "translate-y-0 opacity-100 blur-0"
              : "translate-y-8 opacity-0 blur-md",
          )}
          style={layer(10)}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.28em] text-primary uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            Empowering Your Energy Choices
          </span>

          <h1 className="mt-8 text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.035em] text-balance sm:text-6xl lg:text-[4.4rem]">
            <span
              className="block transition-all duration-[1200ms] [transition-timing-function:var(--ease-cinema)]"
              style={{
                transitionDelay: "120ms",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(26px)",
              }}
            >
              Solar Solutions for a
            </span>
            <span
              className="text-gradient block transition-all duration-[1200ms] [transition-timing-function:var(--ease-cinema)]"
              style={{
                transitionDelay: "240ms",
                opacity: loaded ? 1 : 0,
                transform: loaded ? "none" : "translateY(26px)",
              }}
            >
              Sustainable Future
            </span>
          </h1>

          <p
            className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground transition-all duration-[1100ms] [transition-timing-function:var(--ease-cinema)] sm:text-lg"
            style={{
              transitionDelay: "380ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(20px)",
            }}
          >
            Expert solar installation and high-quality energy solutions designed
            to reduce costs, improve efficiency, and build a more sustainable
            future.
          </p>

          <div
            className="mt-10 flex flex-wrap gap-3 transition-all duration-[1100ms] [transition-timing-function:var(--ease-cinema)]"
            style={{
              transitionDelay: "500ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(18px)",
            }}
          >
            <MagneticButton href="/contact" className="btn-3d">
              Get Started
            </MagneticButton>
            <MagneticButton href="/services" variant="glass" className="btn-3d">
              Explore Solutions
            </MagneticButton>
          </div>

          <div
            className="mt-14 grid max-w-lg grid-cols-2 gap-x-8 gap-y-5 border-t border-border pt-7 sm:grid-cols-4 sm:gap-x-4"
            style={{
              transitionDelay: "620ms",
              opacity: loaded ? 1 : 0,
              transform: loaded ? "none" : "translateY(18px)",
              transition: "all 1100ms var(--ease-cinema)",
            }}
          >
            {statistics.map((s) => (
              <div key={s.label}>
                <p className="font-display text-2xl font-semibold">
                  <CountUp
                    value={s.value}
                    suffix={s.suffix}
                    suffixClassName="text-primary"
                  />
                </p>
                <p className="mt-1 text-[0.7rem] leading-tight tracking-wide text-muted-foreground uppercase">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- foreground 3D visual ---------- */}
        <div className="relative hidden justify-end lg:flex">
          <div
            className={cn(
              "relative flex flex-col items-start transition-all duration-[1400ms] [transition-timing-function:var(--ease-cinema)]",
              loaded
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "translate-y-10 scale-95 opacity-0 blur-md",
            )}
            style={{
              transitionDelay: "260ms",
              transformStyle: "preserve-3d",
            }}
          >
            {floaters.map((f, i) => (
              <div
                key={f.label}
                className="glass animate-bob btn-3d flex items-center gap-3.5 rounded-2xl border border-primary/20 px-5 py-4 shadow-[var(--shadow-elegant)]"
                style={{
                  animationDelay: f.delay,
                  marginLeft: `${i * 34}px`,
                  marginTop: i === 0 ? 0 : "1.25rem",
                  transform: `perspective(1100px) rotateX(${-parallax.y * 10}deg) rotateY(${parallax.x * 14}deg) translate3d(${parallax.x * f.depth}px, ${parallax.y * f.depth}px, 0)`,
                  transition: "transform 220ms linear",
                }}
              >
                <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/12 text-primary">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                </span>
                <p className="text-xs font-semibold tracking-wide whitespace-nowrap">
                  {f.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute inset-x-0 bottom-24 z-20 hidden justify-center lg:flex">
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-foreground/25">
          <span className="animate-scroll-cue mt-2 h-2 w-[3px] rounded-full bg-primary" />
        </span>
      </div>

      {/* carousel controls */}
      <div className="absolute inset-x-0 bottom-8 z-20 mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <div className="flex items-center gap-2">
          {heroSlides.map((s, i) => (
            <button
              key={s.alt}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show slide ${i + 1}`}
              className={cn(
                "h-[3px] rounded-full transition-all duration-500",
                i === index
                  ? "w-10 bg-primary"
                  : "w-5 bg-foreground/25 hover:bg-foreground/50",
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            className="glass btn-3d flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:border-primary/50"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next slide"
            className="glass btn-3d flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:border-primary/50"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
}
