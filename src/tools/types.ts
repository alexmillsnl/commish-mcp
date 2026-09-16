import type { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import type { Env } from "../config/env.js";
import type { YahooProvider } from "../providers/yahoo/provider.js";
import type { LeagueOverviewService } from "../services/league-overview.js";

/**
 * Dependencies handed to every tool. Grows as providers and services are
 * added — keep tool handlers thin and push logic into services.
 */
export interface ToolContext {
  env: Env;
  /** Wired when Yahoo credentials are configured; null otherwise. */
  yahoo: YahooProvider | null;
  leagueOverview: LeagueOverviewService | null;
}

export type ToolRegistrar = (server: McpServer, context: ToolContext) => void;

export interface ToolModule {
  /** Stable MCP tool name (snake_case). */
  name: string;
  register: ToolRegistrar;
}
