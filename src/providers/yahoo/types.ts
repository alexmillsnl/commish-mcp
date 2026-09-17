/**
 * Raw Yahoo Fantasy API payload types.
 *
 * These are deliberately separate from the normalized domain models in
 * `src/domain` — nothing in this file may leak into the tool layer. Yahoo
 * responses are normalized by `YahooProvider` before crossing that boundary.
 *
 * The sketch below follows the Yahoo Fantasy Sports API shape (numeric fields
 * arrive as strings); it will be refined as the integration is implemented.
 */

/** Minimal sketch of a Yahoo league resource. */
export interface YahooLeague {
  league_key: string;
  name: string;
  season: string;
  num_teams: string;
  current_week?: string;
  playoff_start_week?: string;
}
