import { capabilities, systemTypes } from "@/data/site";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { Tilt3D } from "./ui/tilt-3d";

export function Capabilities() {
  return (
    <section
      id="capabilities"
      className="section-dark aurora-green relative overflow-hidden py-24 lg:py-32"
    >
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_78%)]" />
      <div className="relative">
        <SectionHeading
          eyebrow="What We Offer"
          title="Solar, switchgear and security under one roof"
          subtitle="Beyond solar plants, we design and build electrical control systems and surveillance infrastructure for industrial and commercial sites."
        />

        <div className="scene-3d mx-auto mt-16 grid max-w-7xl gap-5 px-5 lg:grid-cols-3 lg:px-8">
          {capabilities.map((group, i) => (
            <Reveal key={group.group} delay={i * 120}>
              <Tilt3D intensity={11} lift={20} className="h-full">
                <div className="glass glow-border card-3d h-full rounded-2xl p-7">
                  <h3
                    className="font-display text-xl font-semibold"
                    style={{ transform: "translateZ(28px)" }}
                  >
                    {group.group}
                  </h3>
                  <ul
                    className="mt-5 space-y-3"
                    style={{ transform: "translateZ(16px)" }}
                  >
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 animate-tick-glow rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Tilt3D>
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-5 grid max-w-7xl gap-5 px-5 md:grid-cols-2 lg:px-8">
          {systemTypes.map((s, i) => (
            <Reveal key={s.title} delay={360 + i * 100}>
              <div className="glass card-3d rounded-2xl p-7">
                <h3 className="font-display text-lg font-semibold text-primary">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
