import { z } from "zod";
import type { LeagueOverview } from "../../domain/commissioner.js";
import type { ToolModule } from "../types.js";

/** Render a league overview as readable text for the AI client. */
export function renderLeagueOverview(overview: LeagueOverview): string {
  const { league, standings } = overview;
  const lines: string[] = [
    `# ${league.name} (${league.season})`,
    `Provider: ${league.provider} | Teams: ${league.teamCount}`,
    "",
    "## Standings",
  ];
  for (const standing of standings) {
    const record = `${standing.wins}-${standing.losses}${standing.ties ? `-${standing.ties}` : ""}`;
    lines.push(
      `${standing.rank}. team ${standing.teamId} — ${record}, ` +
        `PF ${standing.pointsFor.toFixed(1)}, PA ${standing.pointsAgainst.toFixed(1)}`,
    );
  }
  return lines.join("\n");
}

export const getLeagueOverviewTool: ToolModule = {
  name: "get_league_overview",
  register(server, context) {
    server.registerTool(
      "get_league_overview",
      {
        title: "Get League Overview",
        description:
          "Get a commissioner's overview of a fantasy league: league settings and current standings.",
        inputSchema: {
          league_id: z
            .string()
            .min(1)
            .describe(
              "Provider-specific league identifier, e.g. a Yahoo league key like '423.l.12345'.",
            ),
        },
      },
      async ({ league_id }) => {
        const service = context.leagueOverview;
        if (!service) {
          return {
            content: [
              {
                type: "text",
                text:
                  "Yahoo Fantasy is not configured yet. Set YAHOO_CLIENT_ID, YAHOO_CLIENT_SECRET, " +
                  "and YAHOO_REDIRECT_URI (see .env.example) and restart the server to enable league data.",
              },
            ],
          };
        }
        try {
          const overview = await service.getOverview(league_id);
          return { content: [{ type: "text", text: renderLeagueOverview(overview) }] };
        } catch (error) {
          const message = error instanceof Error ? error.message : String(error);
          return {
            isError: true,
            content: [{ type: "text", text: `Failed to load league overview: ${message}` }],
          };
        }
      },
    );
  },
};
