import { useState } from 'react';
import {
  ThemeProvider,
  AppShell,
  Sidebar,
  Header,
  PageContainer,
  DashboardPattern,
  type DashboardStat,
} from '@triminds/ui-core';
import { config, themeConfig } from './config';

/**
 * Generic starter app. Copy this whole folder to `apps/<your-app>`, then:
 *   - rename the package in package.json
 *   - edit src/config.ts (name, nav, apiBaseUrl) and src/index.css (colors)
 *   - swap the placeholder content below for ui-core patterns:
 *       AIPromptLayout · DashboardPattern · DataTablePage · UploadProcessFlow
 */
export default function App() {
  const [active, setActive] = useState(config.nav[0]?.path ?? '/home');

  const stats: DashboardStat[] = [
    { label: 'Example metric', value: 128, hint: 'Replace with real data' },
    { label: 'Another metric', value: '99.9%', hint: 'From your API' },
    { label: 'Third metric', value: 42, hint: 'config.apiBaseUrl' },
  ];

  return (
    <ThemeProvider initialConfig={themeConfig}>
      <AppShell
        header={
          <Header
            title={config.appName}
            subtitle="Built with @triminds/ui-core"
            actions={
              <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                starter template
              </span>
            }
          />
        }
        sidebar={
          <Sidebar
            items={config.nav}
            activePath={active}
            onNavigate={setActive}
            header={
              <div className="flex items-center gap-2 text-lg font-bold text-primary">
                <span>◆</span>
                <span>Triminds</span>
              </div>
            }
            footer={<div className="text-xs text-muted-foreground">v0.1.0 · starter</div>}
          />
        }
      >
        <PageContainer
          title="Welcome"
          description="A blank canvas wired to @triminds/ui-core. Edit src/config.ts and src/App.tsx to begin."
        >
          <DashboardPattern stats={stats} columns={3}>
            <div className="rounded-lg border border-border bg-card p-6">
              <h2 className="text-sm font-semibold text-foreground">Next steps</h2>
              <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                <li>Edit <code>src/config.ts</code> — app name, nav, API base URL.</li>
                <li>Edit <code>src/index.css</code> — theme color tokens.</li>
                <li>
                  Replace this content with a pattern:{' '}
                  <code>AIPromptLayout</code>, <code>DataTablePage</code>,{' '}
                  <code>UploadProcessFlow</code>.
                </li>
                <li>Fetch data in <code>src/lib/api.ts</code> (mock fallback included).</li>
              </ul>
            </div>
          </DashboardPattern>
        </PageContainer>
      </AppShell>
    </ThemeProvider>
  );
}
