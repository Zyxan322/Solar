import { createFileRoute } from "@tanstack/react-router";
import { getSession } from "@/lib/admin-auth";
import { readStore, saveProduct, writeStore } from "@/lib/admin-store";

export const Route = createFileRoute("/api/admin/products")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        return Response.json((await readStore()).products);
      },
      POST: async ({ request }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = await request.json();
        return Response.json(await saveProduct(body as Parameters<typeof saveProduct>[0]));
      },
      PATCH: async ({ request }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = (await request.json()) as {
          ids?: string[];
          changes?: Record<string, unknown>;
        };
        if (!body.ids?.length)
          return Response.json({ error: "No products selected." }, { status: 400 });
        const store = await readStore();
        store.products = store.products.map((product) =>
          body.ids?.includes(product.id) ? { ...product, ...body.changes } : product,
        );
        await writeStore(store);
        return Response.json({ updated: body.ids.length });
      },
    },
  },
});
