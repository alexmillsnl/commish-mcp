import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { hasYahooCredentials, type Env } from "../config/env.js";
import { YahooClient } from "../providers/yahoo/client.js";
import { YahooProvider } from "../providers/yahoo/provider.js";
import { LeagueOverviewService } from "../services/league-overview.js";
import { registerAllTools } from "../tools/index.js";
import type { ToolContext } from "../tools/types.js";

export const SERVER_NAME = "commish-mcp";
export const SERVER_VERSION = "0.1.0";

/** Build the MCP server with all commissioner tools registered. */
export function createCommishServer(env: Env): McpServer {
  const server = new McpServer(
    { name: SERVER_NAME, version: SERVER_VERSION },
    {
      instructions:
        "Commish MCP gives fantasy sports league commissioners league-wide context and " +
        "commissioner-oriented tools. Start with get_league_overview.",
    },
  );

  registerAllTools(server, buildToolContext(env));
  return server;
}

function buildToolContext(env: Env): ToolContext {
  if (!hasYahooCredentials(env)) {
    return { env, yahoo: null, leagueOverview: null };
  }
  const yahoo = new YahooProvider(
    new YahooClient({
      clientId: env.YAHOO_CLIENT_ID,
      clientSecret: env.YAHOO_CLIENT_SECRET,
      redirectUri: env.YAHOO_REDIRECT_URI,
    }),
  );
  return { env, yahoo, leagueOverview: new LeagueOverviewService(yahoo) };
}
