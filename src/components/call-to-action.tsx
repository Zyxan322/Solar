import ctaBg from "@/assets/cta-bg.jpg";
import { company } from "@/data/site";
import { Reveal } from "./ui/reveal";
import { MagneticButton } from "./ui/magnetic-button";
import { useParallax } from "@/hooks/use-reveal";

export function CallToAction() {
  const { ref, offset } = useParallax<HTMLDivElement>(110);

  return (
    <section ref={ref} className="relative isolate overflow-hidden">
      <img
        src={ctaBg}
        alt="Solar panels stretching toward the horizon at sunrise"
        width={1920}
        height={1008}
        loading="lazy"
        className="absolute inset-0 -z-10 h-[125%] w-full object-cover"
        style={{ transform: `translate3d(0, ${offset - 40}px, 0)` }}
      />
      <div className="absolute inset-0 -z-10 bg-background/72" />
      <div className="animate-sun-pulse absolute -top-24 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--color-gold)_45%,transparent),transparent_65%)] blur-2xl" />

      <div className="mx-auto max-w-4xl px-5 py-28 text-center lg:px-8 lg:py-36">
        <Reveal>
          <h2 className="text-3xl leading-[1.05] font-semibold text-balance sm:text-5xl lg:text-6xl">
            Join the Renewable Energy Revolution Today
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mx-auto mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
            Make the switch to smarter, cleaner, and more efficient energy.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <MagneticButton href="/contact">Get Started</MagneticButton>
            <MagneticButton href={company.phoneHref} variant="glass">
              Call {company.phone}
            </MagneticButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
