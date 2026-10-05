import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Scroll3D } from "@/components/ui/scroll-3d";
import heroImage from "@/assets/page-about.jpg";
import { About } from "@/components/about";
import { VisionMission } from "@/components/vision-mission";
import { ProjectHighlights } from "@/components/project-highlights";
import { Statistics } from "@/components/statistics";
import { Testimonials } from "@/components/testimonials";
import { CallToAction } from "@/components/call-to-action";

const title = "About Reinvent Energies | Solar Experts in Gujranwala";
const description =
  "Reinvent Energies leads solar installation and energy solutions for residential and commercial clients across Pakistan.";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Who We Are"
        title="Leading the Way in Solar Installation and Energy Solutions"
        description="We help homes and businesses achieve sustainable energy while reducing costs and environmental impact."
        image={heroImage}
        imageAlt="Aerial view of a large solar farm at sunrise"
        highlights={["Certified Team", "Nationwide Projects", "Long-Term Support"]}
      />
      <Scroll3D shift={50} rotate={5}>
        <About />
      </Scroll3D>
      <Scroll3D shift={55} rotate={5}>
        <VisionMission />
      </Scroll3D>
      <Scroll3D shift={60} rotate={6}>
        <Statistics />
      </Scroll3D>
      <Scroll3D shift={65} rotate={6}>
        <ProjectHighlights />
      </Scroll3D>
      <Scroll3D shift={70} rotate={7}>
        <Testimonials />
      </Scroll3D>
      <Scroll3D shift={80} rotate={8}>
        <CallToAction />
      </Scroll3D>
    </>
  );
}
