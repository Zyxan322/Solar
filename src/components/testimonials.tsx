import { useEffect, useState } from "react";
import { testimonials } from "@/data/site";
import { SectionHeading } from "./ui/section-heading";
import { cn } from "@/lib/utils";
import { usePrefersReducedMotion } from "@/hooks/use-reveal";

function Stars() {
  return (
    <span className="text-sm tracking-[0.25em] text-gold" aria-label="5 out of 5 stars">
      ★★★★★
    </span>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const t = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      7000,
    );
    return () => clearInterval(t);
  }, [reduced]);

  return (
    <section className="section-dark aurora-green relative overflow-hidden py-24 lg:py-32">
      <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" />

      <div className="mx-auto mt-16 max-w-5xl px-5 lg:px-8">
        <div className="relative h-[360px] [perspective:1400px] sm:h-[300px]">
          {testimonials.map((t, i) => {
            const offset =
              (i - index + testimonials.length) % testimonials.length;
            const depth = offset > 1 ? offset - testimonials.length : offset;
            return (
              <figure
                key={t.name}
                className={cn(
                  "glass absolute inset-x-0 top-0 rounded-3xl p-8 transition-all duration-[900ms] [transition-timing-function:var(--ease-cinema)] sm:p-12",
                  depth === 0 ? "z-20" : "z-10",
                )}
                style={{
                  transform: `translate3d(0, ${Math.abs(depth) * 26}px, ${-Math.abs(depth) * 140}px) rotateX(${depth * 4}deg) scale(${1 - Math.abs(depth) * 0.06})`,
                  opacity: Math.abs(depth) > 1 ? 0 : 1 - Math.abs(depth) * 0.55,
                }}
              >
                <Stars />
                <blockquote className="mt-5 font-display text-lg leading-relaxed text-balance sm:text-2xl">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface-2 text-sm font-semibold text-primary">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.role}
                    </span>
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Show testimonial from ${t.name}`}
              className={cn(
                "h-[3px] rounded-full transition-all duration-500",
                i === index ? "w-10 bg-primary" : "w-5 bg-foreground/25",
              )}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 grid max-w-3xl gap-4 px-5 sm:grid-cols-2 lg:px-8">
        {["Based on Google Reviews", "Based on Yelp Reviews"].map((label) => (
          <div
            key={label}
            className="glass glow-border rounded-2xl px-6 py-7 text-center transition-all duration-500 [transition-timing-function:var(--ease-cinema)] hover:border-primary/40 hover:shadow-[var(--shadow-glow)] hover:[transform:perspective(900px)_rotateX(8deg)_translateZ(24px)]"
          >
            <Stars />
            <p className="mt-3 text-sm text-muted-foreground">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
