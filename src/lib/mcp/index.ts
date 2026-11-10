import { defineMcp, type McpDefinitionInput } from "@lovable.dev/mcp-js";
import getCompanyInfo from "./tools/get-company-info";
import listServices from "./tools/list-services";
import listProducts from "./tools/list-products";
import getInstallationProcess from "./tools/get-installation-process";
import listProjects from "./tools/list-projects";

export default defineMcp({
  name: "reinvent-energies",
  title: "Reinvent Energies",
  version: "0.1.0",
  instructions:
    "Public tools for Reinvent Energies, a solar installation company in Gujranwala, Pakistan. Use `get_company_info` for contact details and headline stats, `list_services` for offered services, `list_products` for solar hardware and specs, and `get_installation_process` for the installation workflow.",
  tools: [
    getCompanyInfo,
    listServices,
    listProducts,
    getInstallationProcess,
    listProjects,
  ] as unknown as McpDefinitionInput["tools"],
});
