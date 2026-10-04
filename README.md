# BrownBites

Nutrition tracking for Brown University dining.

See `docs/PROJECT_SPEC.md` for requirements and `docs/CURRENT_STATE.md` for what is implemented.

## Local development

Frontend:

```bash
cd client
cp .env.example .env
npm install
npm run dev
```

Backend:

```bash
cd server
cp .env.example .env
npm install
npm run dev
```

The React app runs on `http://localhost:5173`. The Express API runs on `http://localhost:3001`.
