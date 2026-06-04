import type { NavigationItem } from '@triminds/ui-core';

/**
 * Per-app config — the single place you edit to spin up a new app.
 * 1. Set `appName` + `nav`.
 * 2. Tweak the colors in `src/index.css` (theme tokens).
 * 3. Point `apiBaseUrl` at your backend (or leave empty to use mocks).
 * 4. Drop ui-core patterns into `src/App.tsx`.
 */
export interface AppConfig {
  appName: string;
  nav: NavigationItem[];
  apiBaseUrl: string;
}

export const config: AppConfig = {
  appName: 'My App',
  nav: [
    { label: 'Home', path: '/home' },
    { label: 'Items', path: '/items' },
    { label: 'Settings', path: '/settings' },
  ],
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL ?? '',
};

/** ThemeProvider config. Colors here mirror the CSS tokens in index.css. */
export const themeConfig = {
  theme: {
    colors: {
      primary: '#2563EB',
      primaryForeground: '#ffffff',
      secondary: '#64748B',
      accent: '#EFF6FF',
      background: '#ffffff',
      foreground: '#0F172A',
      card: '#ffffff',
      border: '#E2E8F0',
      muted: '#F1F5F9',
      destructive: '#EF4444',
    },
    density: 'comfortable' as const,
  },
};
