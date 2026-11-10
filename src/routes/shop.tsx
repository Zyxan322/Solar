import { createFileRoute } from "@tanstack/react-router";
import { ProductShowcase } from "@/components/product-showcase";

const title = "Shop Solar Products | Reinvent Energies";
const description =
  "Explore solar panels, hybrid inverters, battery storage and mounting structures from Reinvent Energies.";

export const Route = createFileRoute("/shop")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
});

function ShopPage() {
  return (
    <div className="pt-28 lg:pt-32">
      <ProductShowcase layout="grid" />
    </div>
  );
}
