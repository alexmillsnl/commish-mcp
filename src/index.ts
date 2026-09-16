#!/usr/bin/env node
/**
 * Commish MCP entrypoint.
 *
 * Runs the server over stdio — the standard transport for locally-installed
 * MCP servers. IMPORTANT: stdout is reserved for the MCP protocol; all
 * diagnostics must go to stderr.
 */
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { loadEnv } from "./config/env.js";
import { createCommishServer } from "./server/server.js";

async function main(): Promise<void> {
  const env = loadEnv();
  const server = createCommishServer(env);
  await server.connect(new StdioServerTransport());
  console.error(`[commish-mcp] listening on stdio (log level: ${env.COMMISH_LOG_LEVEL})`);
}

main().catch((error: unknown) => {
  console.error("[commish-mcp] fatal:", error);
  process.exit(1);
});
