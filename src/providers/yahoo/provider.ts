import type { League, ProviderId, Standing } from "../../domain/league.js";
import type { Matchup } from "../../domain/matchup.js";
import type { Transaction } from "../../domain/transaction.js";
import { NotImplementedError } from "../../utils/errors.js";
import type { FantasyProvider } from "../provider.js";
import type { YahooClient } from "./client.js";

/**
 * Yahoo Fantasy implementation of {@link FantasyProvider}.
 *
 * Normalizes raw Yahoo payloads (see `./types.ts`) into domain models.
 * Individual methods are scaffolded pending the OAuth2 client (`YahooClient`).
 */
export class YahooProvider implements FantasyProvider {
  readonly id: ProviderId = "yahoo";

  constructor(private readonly client: YahooClient) {}

  async getLeague(_leagueId: string): Promise<League> {
    void this.client;
    throw new NotImplementedError("YahooProvider.getLeague");
  }

  async getStandings(_leagueId: string): Promise<Standing[]> {
    void this.client;
    throw new NotImplementedError("YahooProvider.getStandings");
  }

  async getMatchups(_leagueId: string, _week: number): Promise<Matchup[]> {
    void this.client;
    throw new NotImplementedError("YahooProvider.getMatchups");
  }

  async getTransactions(_leagueId: string): Promise<Transaction[]> {
    void this.client;
    throw new NotImplementedError("YahooProvider.getTransactions");
  }
}
