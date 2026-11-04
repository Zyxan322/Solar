import { createFileRoute } from "@tanstack/react-router";
import { ProductsPageContent } from "@/components/products-page";

const title = "Solar Inverters | Reinvent Energies";
const description =
  "Explore hybrid solar inverter products available from Reinvent Energies in Pakistan.";

export const Route = createFileRoute("/inverters")({
  component: InvertersPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
});

function InvertersPage() {
  return <ProductsPageContent categoryId="inverters" />;
}
