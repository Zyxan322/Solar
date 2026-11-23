import { createFileRoute } from "@tanstack/react-router";
import { readStore } from "@/lib/admin-store";

export const Route = createFileRoute("/api/products")({
  server: {
    handlers: {
      GET: async () =>
        Response.json(
          (await readStore()).products.filter((product) => product.status === "published"),
          { headers: { "cache-control": "no-store" } },
        ),
    },
  },
});
