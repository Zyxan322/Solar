import { defineTool } from "@lovable.dev/mcp-js";
import { company, statistics } from "../content";

export default defineTool({
  name: "get_company_info",
  title: "Get company info",
  description:
    "Get Reinvent Energies' public company details: name, tagline, phone, email, address and headline statistics.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const info = { ...company, statistics };
    return {
      content: [{ type: "text" as const, text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
