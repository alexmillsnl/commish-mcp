/** The human who manages a fantasy team. */
export interface Manager {
  name: string;
  /** Provider display nickname, when available. */
  nickname?: string;
}

/** A fantasy team, normalized across providers. */
export interface Team {
  id: string;
  name: string;
  manager?: Manager;
  /** Team logo URL, when available. */
  logoUrl?: string;
}
