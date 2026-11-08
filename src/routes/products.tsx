import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { ProductsPageContent } from "@/components/products-page";

const title = "Solar Products | Panels, Inverters, Batteries & VFDs";
const description =
  "Browse solar panels, inverters, lithium batteries, VFDs and accessories from Reinvent Energies.";

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
  const isProductDetails = useRouterState({
    select: ({ matches }) => matches.some((match) => match.routeId === "/products/$productId"),
  });

  return isProductDetails ? <Outlet /> : <ProductsPageContent />;
}
