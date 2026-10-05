import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { products } from "../content";

export default defineTool({
  name: "list_products",
  title: "List products",
  description:
    "List the solar products Reinvent Energies supplies (panels, hybrid inverters, battery storage, mounting structures) with their specifications.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional case-insensitive filter matched against product name, summary and specs."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.trim().toLowerCase();
    const items = q
      ? products.filter((p) =>
          [p.name, p.summary, ...p.specs].some((v) => v.toLowerCase().includes(q)),
        )
      : products;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(items, null, 2) }],
      structuredContent: { products: items },
    };
  },
});
