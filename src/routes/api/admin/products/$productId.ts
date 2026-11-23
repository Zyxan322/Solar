import { createFileRoute } from "@tanstack/react-router";
import { getSession } from "@/lib/admin-auth";
import { readStore, saveProduct, writeStore } from "@/lib/admin-store";

export const Route = createFileRoute("/api/admin/products/$productId")({
  server: {
    handlers: {
      PUT: async ({ request, params }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json();
        return Response.json(
          await saveProduct(body as Parameters<typeof saveProduct>[0], params.productId),
        );
      },
      DELETE: async ({ request, params }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const store = await readStore();
        store.products = store.products.filter((product) => product.id !== params.productId);
        await writeStore(store);
        return new Response(null, { status: 204 });
      },
    },
  },
});
