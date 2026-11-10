import { projectHighlights } from "@/data/site";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { Tilt3D } from "./ui/tilt-3d";
import { CountUp } from "./ui/count-up";
import { MagneticButton } from "./ui/magnetic-button";
import profile from "@/assets/company-profile.pdf.asset.json";

export function ProjectHighlights() {
  return (
    <section id="projects" className="relative py-24 lg:py-32">
      <SectionHeading
        eyebrow="Project Highlights"
        title="Delivered from 8 kW rooftops to 400 kW industrial plants"
        subtitle="A selection of on-grid, hybrid and agricultural solar projects commissioned by our engineering teams."
      />

      <div className="scene-3d mx-auto mt-16 grid max-w-7xl gap-5 px-5 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        {projectHighlights.map((p, i) => (
          <Reveal key={p.type} delay={i * 90}>
            <Tilt3D intensity={12} lift={20} className="h-full">
              <div className="glass glow-border card-3d h-full rounded-2xl p-7">
                <p
                  className="font-display text-4xl font-semibold text-primary"
                  style={{ transform: "translateZ(32px)" }}
                >
                  <CountUp value={p.kw} suffix=" kW" />
                </p>
                <p
                  className="mt-3 text-sm leading-relaxed text-muted-foreground"
                  style={{ transform: "translateZ(16px)" }}
                >
                  {p.type}
                </p>
              </div>
            </Tilt3D>
          </Reveal>
        ))}
      </div>

      <Reveal delay={300}>
        <div className="mt-12 flex justify-center">
          <MagneticButton
            href={profile.url}
            target="_blank"
            rel="noopener"
            className="px-7 py-3.5"
            ariaLabel="Download company profile"
          >
            Download Company Profile
          </MagneticButton>
        </div>
      </Reveal>
    </section>
  );
}
