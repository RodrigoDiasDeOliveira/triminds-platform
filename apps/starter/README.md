# Starter

The **template** for new Triminds apps. Everything you need to stand up a new internal
frontend on `@triminds/ui-core` — nothing app-specific.

## Create a new app from this template

```bash
cp -r apps/starter apps/<your-app>
# 1. rename "@triminds/starter" -> "@triminds/<your-app>" in package.json (+ a free port in vite.config.ts)
# 2. edit src/config.ts   -> appName, nav, apiBaseUrl
# 3. edit src/index.css   -> theme color tokens (RGB triples)
# 4. edit src/App.tsx     -> drop in ui-core patterns
pnpm install
pnpm --filter @triminds/ui-core build
pnpm --filter @triminds/<your-app> dev
```

## What you get

```
ThemeProvider(theme) + AppShell(Sidebar + Header) + PageContainer + <Pattern>
```

Available patterns from `@triminds/ui-core`:

| Pattern | Use for | Example app |
|---|---|---|
| `AIPromptLayout` | chat / AI console | `apps/agente-ai` |
| `DashboardPattern` | stat cards + widgets | `apps/ocl` |
| `DataTablePage` | tables (search + pagination) | `apps/ocl` |
| `UploadProcessFlow` | upload → process → results | `apps/satellite` |

## Run

```bash
pnpm --filter @triminds/starter dev   # http://localhost:5176
```

Set `VITE_API_BASE_URL=http://localhost:8000` to call a real backend; otherwise mock data is used.
