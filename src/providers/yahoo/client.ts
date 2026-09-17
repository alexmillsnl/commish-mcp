import { NotImplementedError } from "../../utils/errors.js";

/** Credentials for Yahoo OAuth2 (see .env.example). */
export interface YahooCredentials {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}

/**
 * Thin HTTP client for the Yahoo Fantasy Sports API.
 *
 * TODO: implement the OAuth2 authorization-code flow (authorize URL, callback
 * exchange, refresh tokens) and persist tokens outside the repository.
 * Docs: https://developer.yahoo.com/oauth2/guide/
 */
export class YahooClient {
  constructor(private readonly credentials: YahooCredentials) {}

  /** Perform an authenticated GET against the Yahoo Fantasy API. */
  async get<T>(_path: string): Promise<T> {
    void this.credentials;
    throw new NotImplementedError("YahooClient.get (OAuth2 flow not yet wired up)");
  }
}
