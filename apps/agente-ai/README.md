# Agente AI

Example application built **entirely** with [`@triminds/ui-core`](../../packages/ui-core). It demonstrates the target model for the platform: an app is just

```
ThemeProvider(config) + AppShell(nav) + <Pattern> + data
```

Here it composes `ThemeProvider` (vector-ai theme) → `AppShell` (with `Sidebar` + `Header`) → the `AIPromptLayout` chat pattern. No bespoke layout code.

## Run

From the monorepo root:

```bash
pnpm install
pnpm --filter @triminds/ui-core build   # ui-core must be built (the app consumes its dist)
pnpm --filter @triminds/agente-ai dev
```

Open http://localhost:5173.

## Connect a backend

By default the chat uses a local mock so the app runs standalone. Point it at a real
FastAPI backend by setting an env var (the client calls `POST {VITE_API_BASE_URL}/chat`
with `{ message, history }` and reads `reply` / `answer` from the JSON response):

```bash
VITE_API_BASE_URL=http://localhost:8000 pnpm --filter @triminds/agente-ai dev
```

## Theming

All visual identity comes from the theme config in `src/App.tsx` plus the CSS token
defaults in `src/index.css`. Swapping the palette (e.g. to `ocl` or `satellite`) is the
only change needed to re-skin the same components — this is how one framework serves many apps.
