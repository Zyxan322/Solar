import heroCity from "@/assets/hero-3.jpg";
import heroPanels from "@/assets/hero-4.jpg";
import serviceInverter from "@/assets/service-inverter.jpg";
import { SectionHeading } from "./ui/section-heading";
import { Reveal } from "./ui/reveal";
import { Tilt3D } from "./ui/tilt-3d";

const posts = [
  {
    title: "Sizing a rooftop system for Pakistani load shedding",
    excerpt:
      "How panel count, inverter capacity and storage work together to keep essential loads running.",
    image: heroPanels,
    alt: "Close-up of photovoltaic solar panel cells",
    tag: "Guide",
  },
  {
    title: "Net metering explained for homeowners",
    excerpt: "What exporting surplus generation means for your monthly bill and payback period.",
    image: heroCity,
    alt: "Rooftop solar panels overlooking a city skyline",
    tag: "Savings",
  },
  {
    title: "Hybrid inverters vs. string inverters",
    excerpt: "Choosing the right conversion strategy when battery storage is on your roadmap.",
    image: serviceInverter,
    alt: "Hybrid solar inverter mounted on a wall",
    tag: "Technology",
  },
];

export function Blog() {
  return (
    <section id="blog" className="relative py-24 lg:py-32">
      <SectionHeading eyebrow="Insights" title="Solar Knowledge from Our Engineers" />
      <div className="mx-auto mt-14 grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
        {posts.map((post, i) => (
          <Reveal key={post.title} delay={i * 110}>
            <Tilt3D intensity={12} lift={24} className="h-full">
              <article className="glass glow-border shine card-3d group h-full overflow-hidden rounded-2xl">
                <div className="h-44 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-250 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="p-6" style={{ transform: "translateZ(40px)" }}>
                  <span className="text-[0.65rem] font-semibold tracking-[0.2em] text-primary uppercase">
                    {post.tag}
                  </span>
                  <h3 className="mt-3 font-display text-lg leading-snug font-semibold">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                </div>
              </article>
            </Tilt3D>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
