import type { League, Standing } from "./league.js";

/**
 * Commissioner-oriented composite views built from base domain models.
 * These are the shapes commissioner tools operate on — never raw provider payloads.
 */

/** A high-level snapshot of a league: settings and current standings. */
export interface LeagueOverview {
  league: League;
  standings: Standing[];
}
