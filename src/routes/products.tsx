import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/page-hero";
import { Scroll3D } from "@/components/ui/scroll-3d";
import heroImage from "@/assets/page-products.jpg";
import { ProductShowcase } from "@/components/product-showcase";
import { CallToAction } from "@/components/call-to-action";

const title = "Solar Products | Panels, Inverters & Battery Storage";
const description =
  "Premium solar panels, hybrid inverters, battery storage and mounting structures supplied and installed by Reinvent Energies.";

export const Route = createFileRoute("/products")({
  component: ProductsPage,
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

function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="Engineered for Better Energy"
        description="High-efficiency hardware selected for Pakistani conditions — from photovoltaic modules to hybrid inverters and storage."
        image={heroImage}
        imageAlt="Premium solar panels with a hybrid inverter and battery storage"
        highlights={["High-Efficiency Panels", "Hybrid Inverters", "Battery Storage"]}
      />
      <Scroll3D shift={50} rotate={5}>
        <ProductShowcase />
      </Scroll3D>
      <Scroll3D shift={60} rotate={6}>
        <CallToAction />
      </Scroll3D>
    </>
  );
}
