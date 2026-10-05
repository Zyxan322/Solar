import { aboutImage } from "@/data/site";
import { Reveal } from "./ui/reveal";
import { MagneticButton } from "./ui/magnetic-button";
import { useParallax } from "@/hooks/use-reveal";

export function About() {
  const { ref, offset } = useParallax<HTMLDivElement>(80);

  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        <div>
          <Reveal>
            <span className="text-[0.7rem] font-semibold tracking-[0.24em] text-primary uppercase">
              Who We Are
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl lg:text-5xl">
              Leading the Way in Solar Installation and Energy Solutions
            </h2>
          </Reveal>
          <Reveal delay={150}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground">
              At Reinvent Energies, we specialize in expert solar installation
              and provide a comprehensive range of high-quality solar products.
              Our focus is on helping residential and commercial clients achieve
              sustainable energy solutions while reducing costs and
              environmental impact.
            </p>
          </Reveal>
          <Reveal delay={220}>
            <div className="mt-9">
              <MagneticButton href="/contact">Discover More</MagneticButton>
            </div>
          </Reveal>
        </div>

        <div ref={ref} className="relative overflow-hidden rounded-3xl">
          <img
            src={aboutImage}
            alt="Engineer inspecting a premium solar installation on a contemporary building"
            width={1008}
            height={1200}
            loading="lazy"
            className="h-[420px] w-full object-cover sm:h-[560px]"
            style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.12)` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,color-mix(in_oklab,var(--color-background)_70%,transparent))]" />
        </div>
      </div>
    </section>
  );
}
