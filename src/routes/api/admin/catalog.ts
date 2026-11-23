import { createFileRoute } from "@tanstack/react-router";
import { randomUUID } from "node:crypto";
import { getSession } from "@/lib/admin-auth";
import { readStore, writeStore } from "@/lib/admin-store";

export const Route = createFileRoute("/api/admin/catalog")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const store = await readStore();
        return Response.json({
          brands: store.brands,
          categories: store.categories,
          settings: store.settings,
        });
      },
      PUT: async ({ request }) => {
        if (!getSession(request)) return Response.json({ error: "Unauthorized" }, { status: 401 });
        const body = (await request.json()) as {
          brands?: unknown[];
          categories?: unknown[];
          settings?: Record<string, string>;
        };
        const store = await readStore();
        if (Array.isArray(body.brands)) {
          store.brands = body.brands as typeof store.brands;
        }
        if (Array.isArray(body.categories)) {
          store.categories = body.categories as typeof store.categories;
        }
        if (body.settings) {
          store.settings = { ...store.settings, ...body.settings };
        }
        store.activity.unshift({
          id: randomUUID(),
          actor: "Administrator",
          action: "Updated brands, categories, or website settings",
          createdAt: new Date().toISOString(),
        });
        await writeStore(store);
        return Response.json({
          brands: store.brands,
          categories: store.categories,
          settings: store.settings,
        });
      },
    },
  },
});
