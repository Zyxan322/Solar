import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { Tilt3D } from "./ui/tilt-3d";

type Feature = {
  title: string;
  body: string;
  icon: React.ReactNode;
};

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const features: Feature[] = [
  {
    title: "Engineered for Pakistan's grid",
    body: "Systems designed around load shedding, voltage swings and real Gujranwala irradiance data — not generic templates.",
    icon: <path d="M4 18h16M6 18V9m4 9V5m4 13v-7m4 7V8" />,
  },
  {
    title: "Certified crews",
    body: "In-house engineers handle mounting, DC/AC wiring and commissioning to IEC standards.",
    icon: <path d="M12 3l7 3v6c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3Zm-2.5 9 2 2 4-4" />,
  },
  {
    title: "Smart monitoring",
    body: "Track generation, consumption and battery health from your phone, day one.",
    icon: (
      <>
        <rect x="6" y="3" width="12" height="18" rx="2.5" />
        <path d="M9.5 14l2-2.5 2 2 2-3" />
      </>
    ),
  },
  {
    title: "Transparent pricing",
    body: "Itemised quotes — modules, inverter, structure, protection and labour. No hidden extras.",
    icon: <path d="M12 3v18M8 7h6a2.5 2.5 0 0 1 0 5h-4a2.5 2.5 0 0 0 0 5h6" />,
  },
  {
    title: "Net-metering support",
    body: "We prepare drawings, apply on your behalf and follow the approval through to bidirectional meter installation.",
    icon: (
      <>
        <path d="M3 12a9 9 0 0 1 18 0" />
        <path d="M12 12l4-3M7 19h10" />
      </>
    ),
  },
  {
    title: "24/7 aftercare",
    body: "Monitoring alerts, scheduled cleaning and a support line that answers — long after handover.",
    icon: (
      <>
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5V12l3 2" />
      </>
    ),
  },
];

export function WhyChoose() {
  return (
    <section className="section-dark aurora-green relative overflow-hidden py-24 lg:py-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="relative">
        <SectionHeading
          eyebrow="Why Reinvent Energies"
          title="Built on engineering, not guesswork"
          subtitle="Every system we deliver is sized, engineered and supported by the same team — from the first bill review to the day your meter starts running backwards."
        />

        <div className="scene-3d mx-auto mt-16 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 100}>
              <Tilt3D intensity={12} lift={20} className="h-full">
                <div className="glass glow-border card-3d group relative h-full overflow-hidden rounded-2xl p-7">
                  <span
                    className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-background/40 text-primary transition-colors duration-250 group-hover:border-primary/40"
                    style={{ transform: "translateZ(38px)" }}
                  >
                    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden {...stroke}>
                      {f.icon}
                    </svg>
                  </span>
                  <h3
                    className="mt-6 font-display text-xl font-semibold"
                    style={{ transform: "translateZ(26px)" }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="mt-3 text-sm leading-relaxed text-muted-foreground"
                    style={{ transform: "translateZ(16px)" }}
                  >
                    {f.body}
                  </p>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
