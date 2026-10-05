import { advantages } from "@/data/site";
import splitImage from "@/assets/split-install.jpg";
import { Reveal } from "./ui/reveal";
import { TiltCard } from "./ui/tilt-card";
import { useParallax } from "@/hooks/use-reveal";

const icons: Record<string, React.ReactNode> = {
  wrench: (
    <path d="M14.7 6.3a4 4 0 0 1-5 5L5 16v3h3l4.7-4.7a4 4 0 0 0 5-5l-2.1 2.1-2.1-.6-.6-2.1 2.1-2.1Z" />
  ),
  shield: <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Z" />,
  leaf: (
    <path d="M5 19c0-8 6-13 14-13 0 8-5 14-13 14H5v-1Zm2 0c3-4 6-6 9-7" />
  ),
};

export function IntroSection() {
  const { ref, offset } = useParallax<HTMLDivElement>(70);

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        <div ref={ref} className="relative overflow-hidden rounded-3xl">
          <img
            src={splitImage}
            alt="Certified installers mounting solar panels on a modern residential roof"
            width={1008}
            height={1200}
            loading="lazy"
            className="h-[420px] w-full object-cover sm:h-[560px] lg:h-[640px]"
            style={{ transform: `translate3d(0, ${offset}px, 0) scale(1.12)` }}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,color-mix(in_oklab,var(--color-background)_75%,transparent))]" />
          <div className="glass absolute bottom-6 left-6 rounded-2xl px-5 py-4">
            <p className="font-display text-2xl font-semibold text-primary">
              Certified crews
            </p>
            <p className="text-xs text-muted-foreground">
              Residential &amp; commercial installations
            </p>
          </div>
        </div>

        <div>
          <Reveal>
            <span className="text-[0.7rem] font-semibold tracking-[0.24em] text-primary uppercase">
              Why Reinvent Energies
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 text-3xl leading-[1.08] font-semibold text-balance sm:text-4xl lg:text-5xl">
              Exceptional Solar Services for Every Need
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              From the first consultation to activation day, every system we
              deliver is engineered around your load profile, your roof and your
              long-term savings.
            </p>
          </Reveal>

          <div className="mt-10 space-y-4">
            {advantages.map((item, i) => (
              <Reveal key={item.title} delay={200 + i * 100}>
                <TiltCard intensity={5} className="p-6">
                  <div className="flex gap-5">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-border bg-surface-2/70 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-6 w-6"
                        aria-hidden
                      >
                        {icons[item.icon]}
                      </svg>
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.body}
                      </p>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
