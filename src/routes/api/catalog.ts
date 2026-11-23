import { createFileRoute } from "@tanstack/react-router";
import { readStore } from "@/lib/admin-store";

export const Route = createFileRoute("/api/catalog")({
  server: {
    handlers: {
      GET: async () => {
        const store = await readStore();
        return Response.json(
          {
            brands: store.brands.filter((brand) => brand.status === "active"),
            categories: store.categories.filter((category) => category.status === "active"),
            settings: store.settings,
          },
          { headers: { "cache-control": "no-store" } },
        );
      },
    },
  },
});
