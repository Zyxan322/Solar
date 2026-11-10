import { defineTool } from "@lovable.dev/mcp-js";
import { capabilities, projectHighlights, vision, mission } from "../content";

export default defineTool({
  name: "list_projects_and_capabilities",
  title: "List projects and capabilities",
  description:
    "Get Reinvent Energies' completed solar project highlights (capacities in kW), full capability list including electrical panels and security systems, plus vision and mission.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const data = { vision, mission, capabilities, projectHighlights };
    return {
      content: [{ type: "text" as const, text: JSON.stringify(data, null, 2) }],
      structuredContent: data,
    };
  },
});
