import type { LeagueOverview } from "../domain/commissioner.js";
import type { FantasyProvider } from "../providers/provider.js";

/**
 * Commissioner service that assembles a league-wide overview from normalized
 * provider data. Tools call services; services call providers.
 */
export class LeagueOverviewService {
  constructor(private readonly provider: FantasyProvider) {}

  async getOverview(leagueId: string): Promise<LeagueOverview> {
    const [league, standings] = await Promise.all([
      this.provider.getLeague(leagueId),
      this.provider.getStandings(leagueId),
    ]);
    return { league, standings };
  }
}
