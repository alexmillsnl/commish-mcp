# Commish MCP

An MCP (Model Context Protocol) server for **fantasy sports league commissioners** — giving AI assistants league-wide context and commissioner-oriented tools.

Commish MCP is not a thin wrapper around a single fantasy API. The domain is **fantasy commissioner operations**: league overviews, standings, matchup results, manager activity, transactions, recaps, and storylines. Provider-specific APIs (Yahoo first) sit underneath a provider abstraction.

## Current state

🚧 **Early development — initial scaffolding.**

- MCP server boots over stdio and registers one example tool (`get_league_overview`)
- Provider-agnostic architecture with a Yahoo skeleton in place
- **No live fantasy data yet** — the Yahoo OAuth2 client and API integration are not implemented

## Planned providers

| Provider      | Status                                         |
| ------------- | ---------------------------------------------- |
| Yahoo Fantasy | First — skeleton in place, integration pending |
| Sleeper       | Future                                         |
| ESPN          | Potential future                               |

## Planned capabilities

Commissioner-focused tools on the roadmap (none implemented yet):

- Weekly recaps and league storylines
- League health and manager activity
- Lineup auditing
- Transaction reports
- Playoff context and standings deep-dives

## Architecture

```text
Yahoo API
   ↓
YahooProvider            (src/providers/yahoo)
   ↓
Normalized domain models (src/domain)
   ↓
Commissioner services    (src/services)
   ↓
MCP tools                (src/tools)
   ↓
AI client
```

Key principles:

- **Provider independence** — tools operate on normalized domain models (`src/domain`), never raw provider payloads. Raw Yahoo types live in `src/providers/yahoo/types.ts` and must not leak upward.
- **Commissioner-first** — services (`src/services`) combine provider data into league-level views; tool handlers stay thin.
- **Strong typing** — provider payloads and domain objects are separate types; no `any`.

## Getting started

Requires Node.js 22+ (`.nvmrc` provided).

```bash
npm install
npm run build
npm test
npm run typecheck
```

### Scripts

| Command             | Purpose                        |
| ------------------- | ------------------------------ |
| `npm run build`     | Compile `src/` → `dist/`       |
| `npm run dev`       | Run with watch mode via tsx    |
| `npm start`         | Run the compiled server        |
| `npm test`          | Run unit tests (vitest)        |
| `npm run typecheck` | Type-check `src/` and `tests/` |
| `npm run lint`      | ESLint                         |
| `npm run format`    | Prettier                       |

### Adding to an MCP client

Example Claude Desktop configuration:

```json
{
  "mcpServers": {
    "commish-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/commish-mcp/dist/index.js"]
    }
  }
}
```

## Configuration

Copy `.env.example` to `.env` (never committed) and fill in Yahoo credentials from an app registered at [developer.yahoo.com/apps](https://developer.yahoo.com/apps/):

```text
YAHOO_CLIENT_ID=
YAHOO_CLIENT_SECRET=
YAHOO_REDIRECT_URI=http://localhost:8787/callback
```

All variables are optional today: without them the server runs and tools explain what is missing. OAuth2 support (authorization-code flow, token refresh, secure local token storage) is the next milestone.

## Project structure

```text
src/
├── index.ts              # stdio entrypoint
├── server/server.ts      # server assembly + tool registration
├── tools/                # MCP tools (thin handlers)
│   ├── league/
│   └── types.ts          # ToolModule / ToolContext pattern
├── services/             # commissioner services (combine provider data)
├── providers/
│   ├── provider.ts       # FantasyProvider interface
│   └── yahoo/            # client, provider, raw payload types
├── domain/               # normalized league/team/matchup/transaction models
├── config/env.ts         # zod-validated environment
└── utils/
tests/                   # vitest unit + in-memory MCP integration tests
```

## License

[MIT](./LICENSE)
