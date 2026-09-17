import { z } from "zod";

const EnvSchema = z.object({
  YAHOO_CLIENT_ID: z.string().min(1).optional(),
  YAHOO_CLIENT_SECRET: z.string().min(1).optional(),
  YAHOO_REDIRECT_URI: z.string().min(1).optional(),
  COMMISH_LOG_LEVEL: z.enum(["debug", "info", "warn", "error"]).default("info"),
});

export type Env = z.infer<typeof EnvSchema>;

/** Env narrowed to the variables required for Yahoo OAuth. */
export type YahooEnv = Env &
  Required<Pick<Env, "YAHOO_CLIENT_ID" | "YAHOO_CLIENT_SECRET" | "YAHOO_REDIRECT_URI">>;

/**
 * Parse and validate environment variables.
 *
 * All Yahoo variables are optional for now — the server runs without them and
 * Yahoo-backed tools degrade gracefully until OAuth is implemented.
 */
export function loadEnv(source: Record<string, string | undefined> = process.env): Env {
  const result = EnvSchema.safeParse(source);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid environment configuration:\n${issues}`);
  }
  return result.data;
}

/** True when all variables required for Yahoo OAuth are present. */
export function hasYahooCredentials(env: Env): env is YahooEnv {
  return Boolean(env.YAHOO_CLIENT_ID && env.YAHOO_CLIENT_SECRET && env.YAHOO_REDIRECT_URI);
}
