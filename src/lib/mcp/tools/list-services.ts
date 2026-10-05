import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { services } from "../content";

export default defineTool({
  name: "list_services",
  title: "List services",
  description:
    "List the solar services Reinvent Energies offers, optionally filtered by a search term.",
  inputSchema: {
    query: z
      .string()
      .optional()
      .describe("Optional case-insensitive filter matched against service name and summary."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query }) => {
    const q = query?.trim().toLowerCase();
    const items = q
      ? services.filter(
          (s) => s.name.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q),
        )
      : services;
    return {
      content: [{ type: "text" as const, text: JSON.stringify(items, null, 2) }],
      structuredContent: { services: items },
    };
  },
});
