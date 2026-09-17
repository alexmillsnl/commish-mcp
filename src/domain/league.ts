/**
 * Identifies the fantasy platform a league lives on.
 * New providers (e.g. Sleeper, ESPN) extend this union.
 */
export type ProviderId = "yahoo" | "sleeper" | "espn";

/** A fantasy league, normalized across providers. */
export interface League {
  /** Provider-specific league identifier (e.g. a Yahoo league key like "423.l.12345"). */
  id: string;
  provider: ProviderId;
  name: string;
  /** Season year, e.g. 2026. */
  season: number;
  teamCount: number;
  /** Week the league is currently in, once the season is underway. */
  currentWeek?: number;
  /** First week of the playoffs, when the league defines one. */
  playoffStartWeek?: number;
}

/** A team's position in the league standings. */
export interface Standing {
  teamId: string;
  rank: number;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  /** Streak as reported by the provider, e.g. "W3". */
  streak?: string;
}
