import { vision, mission, values } from "@/data/site";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { Tilt3D } from "./ui/tilt-3d";

export function VisionMission() {
  return (
    <section id="vision" className="relative py-24 lg:py-32">
      <SectionHeading
        eyebrow="Vision & Mission"
        title="Powering a Sustainable Pakistan"
        subtitle="Renewable energy and electro-mechanical solutions for residential, commercial, industrial and agricultural clients."
      />

      <div className="scene-3d mx-auto mt-14 grid max-w-7xl gap-5 px-5 lg:grid-cols-2 lg:px-8">
        {[
          { label: "Vision", text: vision },
          { label: "Mission", text: mission },
        ].map((item, i) => (
          <Reveal key={item.label} delay={i * 120}>
            <Tilt3D intensity={10} lift={18} className="h-full">
              <div className="glass glow-border card-3d h-full rounded-2xl p-8">
                <span
                  className="text-[0.7rem] font-semibold tracking-[0.24em] text-primary uppercase"
                  style={{ transform: "translateZ(30px)" }}
                >
                  {item.label}
                </span>
                <p
                  className="mt-5 text-lg leading-relaxed text-balance"
                  style={{ transform: "translateZ(18px)" }}
                >
                  {item.text}
                </p>
              </div>
            </Tilt3D>
          </Reveal>
        ))}
      </div>

      <div className="scene-3d mx-auto mt-5 grid max-w-7xl gap-5 px-5 md:grid-cols-3 lg:px-8">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={200 + i * 100}>
            <Tilt3D intensity={12} lift={20} className="h-full">
              <div className="glass card-3d h-full rounded-2xl p-7">
                <h3
                  className="font-display text-lg font-semibold"
                  style={{ transform: "translateZ(24px)" }}
                >
                  {v.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  style={{ transform: "translateZ(14px)" }}
                >
                  {v.body}
                </p>
              </div>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
