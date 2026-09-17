export type TransactionType = "waiver" | "trade" | "free_agent" | "drop" | "commissioner";

export type TransactionStatus = "pending" | "executed" | "failed" | "vetoed";

/** A player reference, normalized across providers. */
export interface PlayerRef {
  id: string;
  name: string;
  position?: string;
  /** The player's pro team, e.g. "KC". */
  proTeam?: string;
}

/** A single player movement within a transaction. */
export interface PlayerMove {
  player: PlayerRef;
  /** Whether the player was added to or dropped from a team. */
  action: "add" | "drop";
  /** Team the move applies to. */
  teamId?: string;
}

/** A league transaction (waiver claim, trade, drop, ...). */
export interface Transaction {
  id: string;
  type: TransactionType;
  status: TransactionStatus;
  /** ISO-8601 timestamp of when the transaction occurred. */
  occurredAt: string;
  /** Teams involved in the transaction. */
  teamIds: string[];
  /** Player movements, when applicable. */
  moves: PlayerMove[];
}
