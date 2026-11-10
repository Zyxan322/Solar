import { services } from "@/data/site";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { TiltCard } from "./ui/tilt-card";

const icons: Record<string, React.ReactNode> = {
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
    </>
  ),
  zap: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  chart: <path d="M4 20V10m5 10V4m5 16v-7m5 7V8" />,
};

export function Services() {
  return (
    <section id="services" className="relative py-24 lg:py-32">
      <SectionHeading
        eyebrow="Comprehensive Solar Solutions"
        title="Expert Solar Installation and Product Offerings"
        subtitle="Three core capabilities that cover the full lifecycle of a solar system — designed, installed and supported by our own engineers."
      />

      <div className="mx-auto mt-16 grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={i * 120}>
            <TiltCard className="shine h-full">
              <div className="relative h-56 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.alt}
                  width={1200}
                  height={912}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-250 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,color-mix(in_oklab,var(--color-background)_92%,transparent))]" />
                <span className="absolute top-5 right-6 font-display text-4xl font-bold text-foreground/15">
                  {service.number}
                </span>
                <span className="absolute bottom-4 left-6 grid h-12 w-12 place-items-center rounded-xl border border-border bg-background/70 text-primary transition-colors duration-250 group-hover:border-primary/40">
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
                    {icons[service.icon]}
                  </svg>
                </span>
              </div>

              <div className="p-7">
                <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.body}</p>
                <a
                  href="/contact"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary"
                >
                  Learn More
                  <span className="transition-transform duration-250 group-hover:translate-x-0.5">
                    →
                  </span>
                </a>
              </div>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
