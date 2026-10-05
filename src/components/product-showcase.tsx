import { useRef } from "react";
import { products } from "@/data/site";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { Tilt3D } from "./ui/tilt-3d";

export function ProductShowcase() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: number) => {
    trackRef.current?.scrollBy({
      left: dir * (trackRef.current.clientWidth * 0.7),
      behavior: "smooth",
    });
  };

  return (
    <section id="products" className="section-dark aurora-green relative overflow-hidden py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Solar Product Showcase"
            title="Engineered for Better Energy"
            subtitle="Every component we supply is selected for output, durability and serviceability in Pakistani conditions."
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous products"
              className="glass flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:border-primary/50"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next products"
              className="glass flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:border-primary/50"
            >
              ›
            </button>
          </div>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-5 pb-6 [scrollbar-width:none] lg:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {products.map((product, i) => (
          <Reveal
            key={product.name}
            delay={i * 90}
            className="w-[82vw] shrink-0 snap-start sm:w-[420px]"
          >
            <Tilt3D intensity={12} lift={30} className="h-full">
              <article className="glass glow-border card-3d group relative h-full overflow-hidden rounded-3xl">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.alt}
                    width={1008}
                    height={1008}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1200ms] [transition-timing-function:var(--ease-cinema)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,color-mix(in_oklab,var(--color-background)_90%,transparent))]" />
                </div>
                <div
                  className="relative -mt-16 p-7"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <h3 className="font-display text-xl font-semibold">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.summary}
                  </p>
                  <ul className="mt-4 grid max-h-0 gap-2 overflow-hidden text-sm text-muted-foreground opacity-0 transition-all duration-700 [transition-timing-function:var(--ease-cinema)] group-hover:max-h-40 group-hover:opacity-100">
                    {product.specs.map((spec) => (
                      <li key={spec} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                  >
                    Request pricing
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </article>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
