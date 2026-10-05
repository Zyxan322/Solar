import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Scroll3D } from "@/components/ui/scroll-3d";
import heroImage from "@/assets/page-blog.jpg";
import { Blog } from "@/components/blog";
import { CallToAction } from "@/components/call-to-action";

const title = "Solar Insights & Blog | Reinvent Energies";
const description =
  "Guides, insights and updates on solar energy, net metering, inverters and sustainable power for homes and businesses in Pakistan.";

export const Route = createFileRoute("/blog")({
  component: BlogPage,
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

function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Solar Knowledge Hub"
        description="Practical guidance on going solar — costs, savings, technology and maintenance."
        image={heroImage}
        imageAlt="Sunlight refracting across solar panel cells"
        highlights={["Guides", "Net Metering", "Maintenance"]}
      />
      <Scroll3D shift={50} rotate={5}>
        <Blog />
      </Scroll3D>
      <Scroll3D shift={60} rotate={6}>
        <CallToAction />
      </Scroll3D>
    </>
  );
}
