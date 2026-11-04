import { createFileRoute } from "@tanstack/react-router";
import { ProductsPageContent } from "@/components/products-page";

const title = "Solar Panels | Reinvent Energies";
const description =
  "Explore solar panel products and modules available from Reinvent Energies in Pakistan.";

export const Route = createFileRoute("/solar-panels")({
  component: SolarPanelsPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
});

function SolarPanelsPage() {
  return <ProductsPageContent categoryId="solar-panels" />;
}
