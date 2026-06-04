import { useEffect, useState } from 'react';
import {
  ThemeProvider,
  AppShell,
  Sidebar,
  Header,
  PageContainer,
  DashboardPattern,
  DataTablePage,
  type DashboardStat,
  type DataTableColumn,
  type NavigationItem,
} from '@triminds/ui-core';
import { fetchMetrics, fetchShipments, type Metrics, type Shipment } from './lib/api';

const nav: NavigationItem[] = [
  { label: 'Dashboard', path: '/dashboard' },
  { label: 'Shipments', path: '/shipments' },
  { label: 'RFID Events', path: '/rfid' },
];

const themeConfig = {
  theme: {
    colors: {
      primary: '#0EA5E9',
      primaryForeground: '#ffffff',
      secondary: '#475569',
      accent: '#1E293B',
      background: '#0F172A',
      foreground: '#E2E8F0',
      card: '#1E293B',
      border: '#334155',
      muted: '#1E293B',
      destructive: '#EF4444',
    },
    density: 'comfortable' as const,
  },
};

const statusStyles: Record<Shipment['status'], string> = {
  'In Transit': 'bg-primary/15 text-primary',
  Delivered: 'bg-emerald-500/15 text-emerald-400',
  Delayed: 'bg-destructive/15 text-destructive',
  Pending: 'bg-muted text-muted-foreground',
};

const columns: DataTableColumn<Shipment>[] = [
  { key: 'id', header: 'Shipment' },
  { key: 'origin', header: 'Origin' },
  { key: 'destination', header: 'Destination' },
  { key: 'carrier', header: 'Carrier' },
  {
    key: 'status',
    header: 'Status',
    render: (row) => (
      <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[row.status]}`}>
        {row.status}
      </span>
    ),
  },
  { key: 'eta', header: 'ETA', align: 'right' },
];

export default function App() {
  const [active, setActive] = useState('/dashboard');
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    Promise.all([fetchShipments(), fetchMetrics()])
      .then(([s, m]) => {
        if (cancelled) return;
        setShipments(s);
        setMetrics(m);
        setError(null);
      })
      .catch((e: Error) => !cancelled && setError(e.message))
      .finally(() => !cancelled && setLoading(false));
    return () => {
      cancelled = true;
    };
  }, []);

  const stats: DashboardStat[] = [
    { label: 'Active shipments', value: metrics?.activeShipments ?? '—', hint: 'Currently in transit' },
    { label: 'Delivered', value: metrics?.delivered ?? '—', hint: 'Last 30 days' },
    { label: 'Delayed', value: metrics?.delayed ?? '—', hint: 'Needs attention' },
    { label: 'RFID events', value: metrics?.rfidEvents?.toLocaleString() ?? '—', hint: 'Scanned today' },
  ];

  const table = (
    <DataTablePage
      columns={columns}
      data={shipments}
      rowKey={(r) => r.id}
      loading={loading}
      error={error}
      searchable
      searchPlaceholder="Search shipments…"
      pageSize={8}
      emptyMessage="No shipments found."
    />
  );

  return (
    <ThemeProvider initialConfig={themeConfig}>
      <AppShell
        header={
          <Header
            title="OCL Logistics"
            subtitle="Built entirely with @triminds/ui-core"
            actions={
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                theme: ocl
              </span>
            }
          />
        }
        sidebar={
          <Sidebar
            items={nav}
            activePath={active}
            onNavigate={setActive}
            header={
              <div className="flex items-center gap-2 text-lg font-bold text-primary">
                <span>◆</span>
                <span>Triminds</span>
              </div>
            }
            footer={<div className="text-xs text-muted-foreground">v0.1.0 · demo app</div>}
          />
        }
      >
        {active === '/dashboard' ? (
          <PageContainer title="Operations Overview" description="Live logistics & RFID summary">
            <DashboardPattern stats={stats} columns={4}>
              <div className="rounded-lg border border-border bg-card p-4">
                <h2 className="mb-4 text-sm font-semibold text-foreground">Recent shipments</h2>
                {table}
              </div>
            </DashboardPattern>
          </PageContainer>
        ) : active === '/shipments' ? (
          <PageContainer title="Shipments" description="All tracked shipments">
            {table}
          </PageContainer>
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">RFID Events</div>
              <p className="mt-1 text-sm">This page is a placeholder in the demo app.</p>
            </div>
          </div>
        )}
      </AppShell>
    </ThemeProvider>
  );
}
