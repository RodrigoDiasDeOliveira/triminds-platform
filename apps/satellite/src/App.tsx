import { useState } from 'react';
import {
  ThemeProvider,
  AppShell,
  Sidebar,
  Header,
  PageContainer,
  UploadProcessFlow,
  type UploadStep,
  type NavigationItem,
} from '@triminds/ui-core';
import { predict, type PredictResult } from './lib/api';

const nav: NavigationItem[] = [
  { label: 'Classify', path: '/classify' },
  { label: 'Jobs', path: '/jobs' },
];

const themeConfig = {
  theme: {
    colors: {
      primary: '#0EA5E9',
      primaryForeground: '#ffffff',
      secondary: '#38BDF8',
      accent: '#E0F2FE',
      background: '#F0F9FF',
      foreground: '#0F172A',
      card: '#ffffff',
      border: '#BAE6FD',
      muted: '#E0F2FE',
      destructive: '#EF4444',
    },
    density: 'comfortable' as const,
  },
};

const baseSteps: UploadStep[] = [
  { label: 'Upload image', status: 'pending' },
  { label: 'Run classification model', status: 'pending' },
  { label: 'Results ready', status: 'pending' },
];

export default function App() {
  const [active, setActive] = useState('/classify');
  const [steps, setSteps] = useState<UploadStep[]>(baseSteps);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<PredictResult | null>(null);

  const onUpload = async (files: File[]) => {
    const file = files[0];
    if (!file) return;
    setError(null);
    setResult(null);
    setBusy(true);
    setSteps([
      { label: 'Upload image', status: 'done' },
      { label: 'Run classification model', status: 'active' },
      { label: 'Results ready', status: 'pending' },
    ]);
    try {
      const res = await predict(file);
      setResult(res);
      setSteps([
        { label: 'Upload image', status: 'done' },
        { label: 'Run classification model', status: 'done' },
        { label: 'Results ready', status: 'done' },
      ]);
    } catch (e) {
      setError((e as Error).message);
      setSteps((s) => s.map((st) => (st.status === 'active' ? { ...st, status: 'error' } : st)));
    } finally {
      setBusy(false);
    }
  };

  const resultPanel = result && (
    <div className="rounded-lg border border-border bg-card p-4">
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        Classification · {result.fileName}
      </h3>
      <ul className="flex flex-col gap-2">
        {result.classes.map((c) => (
          <li key={c.label} className="flex items-center gap-3">
            <span className="w-24 shrink-0 text-sm text-foreground">{c.label}</span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${Math.round(c.confidence * 100)}%` }}
              />
            </div>
            <span className="w-12 shrink-0 text-right text-sm tabular-nums text-muted-foreground">
              {Math.round(c.confidence * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <ThemeProvider initialConfig={themeConfig}>
      <AppShell
        header={
          <Header
            title="Satellite Land Classification"
            subtitle="Built entirely with @triminds/ui-core"
            actions={
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                theme: satellite
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
        {active === '/classify' ? (
          <PageContainer
            title="Classify a satellite image"
            description="Upload an image to run land-cover classification"
          >
            <div className="max-w-2xl">
              <UploadProcessFlow
                accept="image/*"
                onUpload={onUpload}
                steps={steps}
                busy={busy}
                error={error}
                hint="PNG / JPEG / TIFF up to 25 MB"
                result={resultPanel}
              />
            </div>
          </PageContainer>
        ) : (
          <div className="grid h-full place-items-center text-muted-foreground">
            <div className="text-center">
              <div className="text-lg font-semibold text-foreground">Jobs</div>
              <p className="mt-1 text-sm">This page is a placeholder in the demo app.</p>
            </div>
          </div>
        )}
      </AppShell>
    </ThemeProvider>
  );
}
