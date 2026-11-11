# BrownBites — Current State

## Current Phase

Phase 1 — Project Foundation (complete)

Phase 2 — PostgreSQL setup, schema, and migrations (`dining_locations`, `menus`, `food_items`, and `menu_items` exist; no migration runner or seed scripts)

Phase 3 — Backend APIs (Dining Locations API complete; Menus API not started)

## Completed

- Project specification created
- README created
- React + TypeScript + Vite + Tailwind CSS frontend in `client/`
- Node.js + Express + TypeScript backend in `server/`
- Backend source layers: routes, controllers, services, repositories, middleware, types, utils
- Environment examples: `.env.example`, `client/.env.example`, `server/.env.example`
- Health-check endpoint (no database)
- Local PostgreSQL `brownbites` database (verified)
- `pg` and `@types/pg` installed
- PostgreSQL connection pool in `server/src/config/database.ts` (`DATABASE_URL` required at process start)
- Standalone database connectivity script: `server/src/scripts/testDatabase.ts`
- Project MCP server `brownbites-postgres` (DBHub) so Cursor can read the live `brownbites` schema. It uses `DATABASE_URL` from `server/.env`. `execute_sql` is read-only.
- SQL migration files:
  - `database/migrations/001_create_dining_locations.sql`
  - `database/migrations/002_create_menus.sql`
- Dining Locations API (read-only), wired as Route → Controller → Service → Repository → PostgreSQL:
  - `GET /api/v1/dining-locations`
  - `GET /api/v1/dining-locations/:id`

## In Progress

- None. Next task is the Menus API (see Next Step).

## Not Started

- Menus API
- Food API
- Meal tracking
- Authentication
- Frontend dashboard
- Brown dining integration
- Recommendation engine
- AI integration
- Seed scripts (`database/seeds/` contains only `.gitkeep`)
- Migration runner / npm migrate command (tables were not applied by a project script)

## Current Architecture

Frontend: React + TypeScript + Vite + Tailwind CSS (`client/`, port 5173)

Backend: Node.js + Express + TypeScript (`server/`, port 3001)

Database: PostgreSQL; local database name `brownbites` (verified)

Database access: `pg` Pool with raw parameterized SQL in repositories

Current request flow for dining locations (React is not connected yet):

```text
HTTP Client → Express Route → Controller → Service → Repository → PostgreSQL
```

The frontend does not yet call the Dining Locations API. Update this diagram to start with React when that connection is added. Health still has no database access.

## Current API Endpoints

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/v1/health` | Returns `{ "status": "ok" }`. No database. |
| GET | `/api/v1/dining-locations` | Lists dining locations. HTTP 200. |
| GET | `/api/v1/dining-locations/:id` | Returns one dining location. HTTP 200, 400, or 404. |

Live HTTP responses were not verified in this documentation pass (API process was not running on port 3001). Behavior below is from source.

### Dining Locations API

Mounted in `server/src/app.ts` at `/api/v1/dining-locations`.

Flow:

```text
diningLocationRoutes
  → diningLocationController
  → diningLocationService
  → diningLocationRepository
  → PostgreSQL (`dining_locations`)
```

`GET /api/v1/dining-locations`

- No request-body or query-parameter validation.
- Repository: `SELECT id, name FROM dining_locations ORDER BY name ASC`
- HTTP **200**: `{ "success": true, "data": [ { "id", "name" }, ... ] }`

`GET /api/v1/dining-locations/:id`

- Controller parses `id` with `Number(req.params.id)`.
- HTTP **400** if `id` is not an integer greater than 0: `{ "success": false, "data": "Invalid request, must input a number greater than 0" }`
- Repository: `SELECT id, name FROM dining_locations WHERE id = $1` (parameterized).
- HTTP **404** if no row: `{ "success": false, "data": "Not Found. No dining location exists" }`
- HTTP **200** if found: `{ "success": true, "data": { "id", "name" } }`

These handlers do not use local try/catch. Express 5 can forward rejected promises from async route handlers to error-handling middleware. Centralized error handling is not implemented yet and is deferred.

There is no Menus API (no menu routes, controllers, services, or repositories).

## Current Database Tables

Verified in local PostgreSQL database `brownbites` (2026-10-25):

| Table | Columns | Notes |
| --- | --- | --- |
| `dining_locations` | `id` integer PK `GENERATED ALWAYS AS IDENTITY PRIMARY KEY`, `name` text NOT NULL | 3 rows present |
| `menus` | `id` integer PK `GENERATED ALWAYS AS IDENTITY`, `menu_date` date NOT NULL, `meal_type` text NOT NULL, `dining_location_id` integer NOT NULL FK → `dining_locations(id)` | 3 rows present |
| `food_items` | `id` integer NOT NULL, `name` text NOT NULL, `serving_size` text NULL, `calories` numeric NOT NULL, `protein_g` numeric NOT NULL, `carbs_g` numeric NOT NULL, `fat_g` numeric NOT NULL | Confirmed live 2026-11-10 |
| `menu_items` | `menu_id` integer NOT NULL, `food_item_id` integer NOT NULL | Confirmed live 2026-11-10. Row counts not rechecked. |

How those rows were inserted is unverified (no seed files in the repo).

How the migration SQL files were applied is unverified (no migrate script). `001_create_dining_locations.sql` now matches the live table’s `GENERATED ALWAYS AS IDENTITY PRIMARY KEY` definition. Do not rerun `001` against the existing database.

`004_create_menu_items.sql` declares `PRIMARY KEY (menu_id, food_items_id)`, but the live column is `food_item_id`. Do not rerun `004` against the existing database until that name matches.

Other planned tables (`users`, `user_goals`, `meals`, `meal_items`) do not exist.

## Important Files

- `client/src/App.tsx` — minimal landing UI
- `client/vite.config.ts` — Vite + React + Tailwind plugins
- `server/src/app.ts` — Express application (middleware and routes)
- `server/src/server.ts` — process entry point (listen on a port)
- `server/src/routes/health.routes.ts`
- `server/src/controllers/health.controller.ts`
- `server/src/routes/diningLocationRoutes.ts`
- `server/src/controllers/diningLocationController.ts`
- `server/src/services/diningLocationService.ts`
- `server/src/repositories/diningLocationRepository.ts`
- `server/src/config/database.ts` — PostgreSQL connection pool configuration
- `server/src/scripts/testDatabase.ts` — standalone database connectivity test
- `database/migrations/001_create_dining_locations.sql`
- `database/migrations/002_create_menus.sql`
- `database/migrations/003_create_food_items.sql`
- `database/migrations/004_create_menu_items.sql`
- `.cursor/mcp.json` — project MCP config for `brownbites-postgres`
- `.cursor/postgres-mcp.sh` — starts DBHub with `DATABASE_URL` from `server/.env`
- `.cursor/dbhub.toml` — Postgres source for the MCP server; `execute_sql` is `readonly = true`

## Known Issues

- Server TypeScript uses `module` and `moduleResolution` `NodeNext`. With no `"type": "module"` in `server/package.json`, output stays CommonJS. Verified with TypeScript 5.9.3 and 6.0.3.
- No project-owned migration or seed workflow.
- `004_create_menu_items.sql` uses `food_items_id` in the primary key. The live `menu_items` table column is `food_item_id`.

## Next Step

Implement the Menus API on top of the existing `menus` table, following the same Route → Controller → Service → Repository → PostgreSQL pattern as dining locations.
