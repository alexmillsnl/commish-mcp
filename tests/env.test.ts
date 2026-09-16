import { describe, expect, it } from "vitest";
import { hasYahooCredentials, loadEnv } from "../src/config/env.js";

describe("loadEnv", () => {
  it("returns defaults with no variables set", () => {
    const env = loadEnv({});
    expect(env.COMMISH_LOG_LEVEL).toBe("info");
    expect(env.YAHOO_CLIENT_ID).toBeUndefined();
  });

  it("parses Yahoo credentials when present", () => {
    const env = loadEnv({
      YAHOO_CLIENT_ID: "id",
      YAHOO_CLIENT_SECRET: "secret",
      YAHOO_REDIRECT_URI: "http://localhost:8787/callback",
    });
    expect(env.YAHOO_CLIENT_ID).toBe("id");
    expect(env.YAHOO_CLIENT_SECRET).toBe("secret");
  });

  it("rejects an unknown log level", () => {
    expect(() => loadEnv({ COMMISH_LOG_LEVEL: "loud" })).toThrow(/Invalid environment/);
  });
});

describe("hasYahooCredentials", () => {
  it("is false when any credential is missing", () => {
    expect(hasYahooCredentials(loadEnv({}))).toBe(false);
    expect(hasYahooCredentials(loadEnv({ YAHOO_CLIENT_ID: "id" }))).toBe(false);
  });

  it("is true when all credentials are present", () => {
    const env = loadEnv({
      YAHOO_CLIENT_ID: "id",
      YAHOO_CLIENT_SECRET: "secret",
      YAHOO_REDIRECT_URI: "http://localhost:8787/callback",
    });
    expect(hasYahooCredentials(env)).toBe(true);
  });
});
