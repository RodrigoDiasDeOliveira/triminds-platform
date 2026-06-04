# Satellite Land Classification

Example geo upload/inference app built **entirely** with [`@triminds/ui-core`](../../packages/ui-core),
themed **satellite** (light sky). Same components as the other apps — only theme + pattern + data differ.

Composition:

```
ThemeProvider(satellite) + AppShell(Sidebar + Header) + PageContainer
  + UploadProcessFlow (drag-drop upload → step progress → results)
```

## Run

From the monorepo root:

```bash
pnpm install
pnpm --filter @triminds/ui-core build
pnpm --filter @triminds/satellite dev
```

Open http://localhost:5175.

## Connect a backend

By default it simulates inference with a mock so it runs standalone. Point at a real backend:

```bash
VITE_API_BASE_URL=http://localhost:8000 pnpm --filter @triminds/satellite dev
```

Expected endpoint: `POST /predict` (multipart `file`) → `{ fileName, classes: [{ label, confidence }] }`.
