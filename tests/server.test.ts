import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";
import type { CallToolResult } from "@modelcontextprotocol/sdk/types.js";
import { describe, expect, it } from "vitest";
import { loadEnv } from "../src/config/env.js";
import { createCommishServer, SERVER_NAME } from "../src/server/server.js";

async function connectClient(envSource: Record<string, string | undefined> = {}) {
  const server = createCommishServer(loadEnv(envSource));
  const client = new Client({ name: "test-client", version: "0.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  await server.connect(serverTransport);
  await client.connect(clientTransport);
  return client;
}

function textOf(result: CallToolResult): string {
  const first = result.content[0];
  return first?.type === "text" ? first.text : "";
}

describe("commish-mcp server", () => {
  it("identifies itself and exposes the get_league_overview tool", async () => {
    const client = await connectClient();
    const version = client.getServerVersion();
    expect(version?.name).toBe(SERVER_NAME);

    const { tools } = await client.listTools();
    expect(tools.map((tool) => tool.name)).toContain("get_league_overview");
    await client.close();
  });

  it("reports a helpful message when Yahoo is not configured", async () => {
    const client = await connectClient();
    const result = (await client.callTool({
      name: "get_league_overview",
      arguments: { league_id: "423.l.12345" },
    })) as CallToolResult;

    expect(result.isError).toBeFalsy();
    expect(textOf(result)).toContain("not configured");
    await client.close();
  });

  it("surfaces provider errors as tool errors when Yahoo is configured", async () => {
    const client = await connectClient({
      YAHOO_CLIENT_ID: "test-id",
      YAHOO_CLIENT_SECRET: "test-secret",
      YAHOO_REDIRECT_URI: "http://localhost:8787/callback",
    });
    const result = (await client.callTool({
      name: "get_league_overview",
      arguments: { league_id: "423.l.12345" },
    })) as CallToolResult;

    expect(result.isError).toBe(true);
    expect(textOf(result)).toContain("not implemented yet");
    await client.close();
  });
});
