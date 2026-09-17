/** One side of a head-to-head matchup. */
export interface MatchupSide {
  teamId: string;
  points: number;
  /** Projected points, when the provider supplies them. */
  projectedPoints?: number;
}

/** A head-to-head matchup between two teams for a given week. */
export interface Matchup {
  week: number;
  /** The two competing sides. */
  teams: [MatchupSide, MatchupSide];
  /** True once the matchup is final. */
  isComplete: boolean;
  /** Winning team id, set once the matchup is complete. */
  winnerTeamId?: string;
}
