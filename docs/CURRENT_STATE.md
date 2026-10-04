# BrownBites — Current State

## Current Phase

Phase 1 — Project Foundation (complete)

## Completed

- Project specification created
- README created
- React + TypeScript + Vite + Tailwind CSS frontend in `client/`
- Node.js + Express + TypeScript backend in `server/`
- Backend source layers: routes, controllers, services, repositories, middleware, types, utils
- `database/migrations/` and `database/seeds/` folders (no schema yet)
- Environment examples: `.env.example`, `client/.env.example`, `server/.env.example`
- Health-check endpoint (no database, auth, or application features)

## In Progress

- None. Foundation is in place. Next work is a later phase.

## Not Started

- PostgreSQL connectivity
- Database schema
- Menu API
- Food API
- Meal tracking
- Authentication
- Frontend dashboard
- Brown dining integration
- Recommendation engine
- AI integration

## Current Architecture

Frontend: React + TypeScript + Vite + Tailwind CSS (`client/`, port 5173)

Backend: Node.js + Express + TypeScript (`server/`, port 3001)

Database: PostgreSQL planned; **not connected**

Database access: `pg` / raw SQL planned; **not installed**

Request flow (target):

```text
React → HTTP → Express Route → Controller → Service → Repository → PostgreSQL
```

PostgreSQL is not in that path yet.

## Current API Endpoints

| Method | Path | Notes |
| --- | --- | --- |
| GET | `/api/v1/health` | Returns `{ "status": "ok" }`. No database. |

## Current Database Tables

None.

## Important Files

- `client/src/App.tsx` — minimal landing UI
- `client/vite.config.ts` — Vite + React + Tailwind plugins
- `server/src/app.ts` — Express application (middleware and routes)
- `server/src/server.ts` — process entry point (listen on a port)
- `server/src/routes/health.routes.ts`
- `server/src/controllers/health.controller.ts`

## Known Issues

None.

## Next Step

Phase 2 — PostgreSQL setup, schema, and migrations. Do not add application features until the database layer is in place.
