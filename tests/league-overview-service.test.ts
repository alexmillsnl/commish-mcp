import { describe, expect, it } from "vitest";
import type { League, Standing } from "../src/domain/league.js";
import type { Matchup } from "../src/domain/matchup.js";
import type { Transaction } from "../src/domain/transaction.js";
import type { FantasyProvider } from "../src/providers/provider.js";
import { LeagueOverviewService } from "../src/services/league-overview.js";

const league: League = {
  id: "423.l.12345",
  provider: "yahoo",
  name: "Test League",
  season: 2026,
  teamCount: 12,
  currentWeek: 3,
};

const standings: Standing[] = [
  { teamId: "t1", rank: 1, wins: 3, losses: 0, ties: 0, pointsFor: 412.5, pointsAgainst: 350.2 },
  { teamId: "t2", rank: 2, wins: 2, losses: 1, ties: 0, pointsFor: 390.1, pointsAgainst: 372.8 },
];

/** In-memory fake provider — stands in for a real integration in tests. */
const fakeProvider: FantasyProvider = {
  id: "yahoo",
  getLeague: async () => league,
  getStandings: async () => standings,
  getMatchups: async (): Promise<Matchup[]> => [],
  getTransactions: async (): Promise<Transaction[]> => [],
};

describe("LeagueOverviewService", () => {
  it("assembles an overview from provider data", async () => {
    const service = new LeagueOverviewService(fakeProvider);
    const overview = await service.getOverview("423.l.12345");
    expect(overview.league.name).toBe("Test League");
    expect(overview.standings).toHaveLength(2);
    expect(overview.standings[0]?.teamId).toBe("t1");
  });

  it("propagates provider failures", async () => {
    const failing: FantasyProvider = {
      ...fakeProvider,
      getLeague: async () => {
        throw new Error("boom");
      },
    };
    const service = new LeagueOverviewService(failing);
    await expect(service.getOverview("423.l.12345")).rejects.toThrow("boom");
  });
});
