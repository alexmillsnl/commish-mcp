import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { getLeagueOverviewTool } from "./league/get-league-overview.js";
import type { ToolContext, ToolModule } from "./types.js";

/**
 * Registry of all commissioner tools.
 * To add a tool: create a module under the matching subdirectory and list it here.
 */
const toolModules: ToolModule[] = [getLeagueOverviewTool];

export function registerAllTools(server: McpServer, context: ToolContext): void {
  for (const mod of toolModules) {
    mod.register(server, context);
  }
}
