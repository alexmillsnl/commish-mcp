import type { League, ProviderId, Standing } from "../domain/league.js";
import type { Matchup } from "../domain/matchup.js";
import type { Transaction } from "../domain/transaction.js";

/**
 * The provider-agnostic contract every fantasy platform integration implements.
 *
 * Commissioner tools depend on this interface and the normalized domain models
 * in `src/domain` — never on provider-specific payloads.
 */
export interface FantasyProvider {
  readonly id: ProviderId;
  getLeague(leagueId: string): Promise<League>;
  getStandings(leagueId: string): Promise<Standing[]>;
  getMatchups(leagueId: string, week: number): Promise<Matchup[]>;
  getTransactions(leagueId: string): Promise<Transaction[]>;
}
