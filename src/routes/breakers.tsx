import { createFileRoute } from "@tanstack/react-router";
import { ProductsPageContent } from "@/components/products-page";

const title = "Solar Circuit Breakers | Reinvent Energies";
const description =
  "Explore AC and DC circuit breakers available from Reinvent Energies in Pakistan.";

export const Route = createFileRoute("/breakers")({
  component: BreakersPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
});

function BreakersPage() {
  return <ProductsPageContent categoryId="breakers" />;
}
