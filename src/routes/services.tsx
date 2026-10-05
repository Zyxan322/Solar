import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Scroll3D } from "@/components/ui/scroll-3d";
import heroImage from "@/assets/page-services.jpg";
import { Services } from "@/components/services";
import { Process } from "@/components/process";
import { CallToAction } from "@/components/call-to-action";
import { Capabilities } from "@/components/capabilities";

const title = "Solar Services | Installation, Inverters & Consultation";
const description =
  "Professional solar panel installation, hybrid inverter solutions and expert energy consultation from Reinvent Energies in Gujranwala, Pakistan.";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
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

function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title="Comprehensive Solar Solutions"
        description="Expert solar installation and product offerings engineered for performance, reliability and long-term energy savings."
        image={heroImage}
        imageAlt="Solar engineers installing rooftop panels at golden hour"
        highlights={["Expert Installation", "Hybrid Inverters", "Energy Consultation"]}
      />
      <Scroll3D shift={50} rotate={5}>
        <Services />
      </Scroll3D>
      <Scroll3D shift={55} rotate={6}>
        <Capabilities />
      </Scroll3D>
      <Scroll3D shift={60} rotate={6}>
        <Process />
      </Scroll3D>
      <Scroll3D shift={70} rotate={7}>
        <CallToAction />
      </Scroll3D>
    </>
  );
}
