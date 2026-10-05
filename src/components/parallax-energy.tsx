import parallaxImage from "@/assets/parallax-energy.jpg";
import { useParallax } from "@/hooks/use-reveal";
import { Reveal } from "./ui/reveal";
import { Particles } from "./particles";
import { MagneticButton } from "./ui/magnetic-button";

export function ParallaxEnergy() {
  const { ref, offset } = useParallax<HTMLDivElement>(140);

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[85svh] items-center overflow-hidden"
    >
      <img
        src={parallaxImage}
        alt="Wide rooftop solar installation photographed under dramatic sunlight"
        width={1920}
        height={1200}
        loading="lazy"
        className="absolute inset-0 -z-10 h-[135%] w-full object-cover"
        style={{ transform: `translate3d(0, ${offset - 60}px, 0)` }}
      />
      <div className="absolute inset-0 -z-10 bg-background/70" />
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1000px circle at 75% 20%, color-mix(in oklab, var(--color-gold) 22%, transparent), transparent 60%)",
        }}
      />
      <Particles count={16} />

      <div className="relative mx-auto w-full max-w-7xl px-5 py-28 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <span className="text-[0.7rem] font-semibold tracking-[0.24em] text-primary uppercase">
              Sustainable Energy Options
            </span>
          </Reveal>
          <Reveal delay={90}>
            <h2 className="mt-5 text-3xl leading-[1.06] font-semibold text-balance sm:text-5xl lg:text-6xl">
              Quick and Reliable Solar Solutions
            </h2>
          </Reveal>
          <Reveal delay={170}>
            <p className="mt-6 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Discover our range of services designed to help you transition to
              renewable energy effortlessly. From installation to maintenance,
              we provide quick and reliable solutions that meet your solar
              needs.
            </p>
          </Reveal>
          <Reveal delay={250}>
            <div className="mt-9">
              <MagneticButton href="/services" variant="glass">
                View Our Services
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
