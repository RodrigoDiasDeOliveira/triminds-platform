# OCL Logistics

Example logistics dashboard built **entirely** with [`@triminds/ui-core`](../../packages/ui-core),
themed **ocl** (dark slate). Same components as `apps/agente-ai` — only the theme + patterns + data differ.

Composition:

```
ThemeProvider(ocl) + AppShell(Sidebar + Header) + PageContainer
  + DashboardPattern (stat cards) + DataTablePage (shipments)
```

## Run

From the monorepo root:

```bash
pnpm install
pnpm --filter @triminds/ui-core build
pnpm --filter @triminds/ocl dev
```

Open http://localhost:5174.

## Connect a backend

By default it uses local mock data. Point at a real backend with:

```bash
VITE_API_BASE_URL=http://localhost:8000 pnpm --filter @triminds/ocl dev
```

Expected endpoints: `GET /shipments → { items: Shipment[] }` and `GET /metrics → Metrics`.
`DataTablePage` also supports server-side pagination/search via its `page`/`total`/`onPageChange`
and `searchValue`/`onSearchChange` props.
