import { defineTool } from "@lovable.dev/mcp-js";
import { processSteps } from "../content";

export default defineTool({
  name: "get_installation_process",
  title: "Get installation process",
  description:
    "Get the five-step Reinvent Energies solar installation process, from energy consultation through system activation.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => ({
    content: [{ type: "text" as const, text: JSON.stringify(processSteps, null, 2) }],
    structuredContent: { steps: processSteps },
  }),
});
