import { useEffect, useState } from "react";
import { Particles } from "./particles";
import { usePointerParallax } from "@/hooks/use-pointer-parallax";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: string;
  description: string;
  /** Cinematic background image for the page hero. */
  image: string;
  imageAlt: string;
  /** Small floating glass chips that drift around the hero. */
  highlights?: string[];
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  highlights = [],
}: Props) {
  const parallax = usePointerParallax();
  const reduced = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [scroll, setScroll] = useState(0);

  useEffect(() => setLoaded(true), []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const update = () => setScroll(window.scrollY);
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [reduced]);

  const layer = (depth: number) => ({
    transform: `translate3d(${parallax.x * depth}px, ${parallax.y * depth}px, 0)`,
  });

  return (
    <section className="section-dark scene-3d relative isolate flex min-h-[72svh] items-center overflow-hidden bg-background text-foreground">
      {/* background image — scroll + pointer parallax */}
      <div
        className="absolute inset-[-8%] will-change-transform"
        style={{
          transform: `translate3d(${parallax.x * -20}px, ${parallax.y * -20 + scroll * 0.22}px, 0) scale(${1.08 + Math.min(scroll, 600) * 0.00012})`,
        }}
      >
        <img
          src={image}
          alt={imageAlt}
          width={1920}
          height={1088}
          loading="eager"
          fetchPriority="high"
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-all duration-[1600ms] [transition-timing-function:var(--ease-cinema)]",
            loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-md",
          )}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, color-mix(in oklab, var(--background) 92%, transparent) 0%, color-mix(in oklab, var(--background) 68%, transparent) 46%, transparent 80%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--background) 72%, transparent) 0%, transparent 40%, color-mix(in oklab, var(--background) 88%, transparent) 100%)",
          }}
        />
        <div aria-hidden className="grid-lines absolute inset-0 opacity-[0.12]" />
      </div>

      <Particles count={14} />

      {/* content */}
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-5 pt-40 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <div
          className={cn(
            "max-w-2xl transition-all duration-[1100ms] [transition-timing-function:var(--ease-cinema)]",
            loaded ? "translate-y-0 opacity-100 blur-0" : "translate-y-8 opacity-0 blur-md",
          )}
          style={{
            transform: `perspective(1200px) rotateY(${parallax.x * 4}deg) rotateX(${-parallax.y * 3}deg)`,
          }}
        >
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[0.68rem] font-semibold tracking-[0.28em] text-primary uppercase">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-primary" />
            {eyebrow}
          </span>
          <h1
            className={cn(
              "mt-7 text-[2.4rem] leading-[1.04] font-semibold tracking-[-0.03em] text-balance transition-all duration-[1200ms] [transition-timing-function:var(--ease-cinema)] sm:text-5xl lg:text-6xl",
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: "120ms" }}
          >
            {title}
          </h1>
          <p
            className={cn(
              "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground transition-all duration-[1200ms] [transition-timing-function:var(--ease-cinema)] sm:text-lg",
              loaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            )}
            style={{ transitionDelay: "240ms" }}
          >
            {description}
          </p>
        </div>

        {highlights.length > 0 && (
          <div className="relative hidden h-[300px] lg:block" style={layer(26)}>
            {highlights.slice(0, 3).map((h, i) => (
              <div
                key={h}
                className={cn(
                  "absolute",
                  i === 0 && "top-2 left-6",
                  i === 1 && "top-1/2 right-2",
                  i === 2 && "bottom-2 left-16",
                )}
                style={{
                  transform: `translate3d(${parallax.x * (30 + i * 18)}px, ${parallax.y * (24 + i * 14)}px, 0)`,
                }}
              >
                <div
                  className="animate-float-slow card-3d glass rounded-2xl px-5 py-4 text-sm font-medium"
                  style={{ animationDelay: `${i * 1.1}s` }}
                >
                  <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
                  {h}
                </div>
              </div>
            ))}

          </div>
        )}
      </div>
    </section>
  );
}
