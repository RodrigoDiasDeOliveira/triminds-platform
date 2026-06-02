import { type ThemeConfig } from './types.ts'

export const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#0ea5e9',
    primaryForeground: '#ffffff',
    secondary: '#64748b',
    accent: '#eab308',
    background: '#ffffff',
    foreground: '#0f172a',
    border: '#e2e8f0',
    muted: '#f1f5f9',
    destructive: '#ef4444',
  },
  radius: {
    lg: '0.75rem',
    md: '0.5rem',
    sm: '0.375rem',
  },
  density: 'comfortable' as const,
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
  },
}

export function createTheme(overrides: Partial<ThemeConfig> = {}): ThemeConfig {
  return {
    ...defaultTheme,
    colors: {
      ...defaultTheme.colors,
      ...overrides.colors,
    },
    radius: {
      ...defaultTheme.radius,
      ...overrides.radius,
    },
    density: overrides.density ?? defaultTheme.density,
    fontFamily: {
      ...defaultTheme.fontFamily,
      ...overrides.fontFamily,
    },
  }
}

export function themeToCSSVariables(theme: ThemeConfig): Record<string, string> {
  return {
    '--color-primary': hexToRgb(theme.colors.primary),
    '--color-primary-foreground': hexToRgb(theme.colors.primaryForeground),
    '--color-secondary': hexToRgb(theme.colors.secondary),
    '--color-accent': hexToRgb(theme.colors.accent),
    '--color-background': hexToRgb(theme.colors.background),
    '--color-foreground': hexToRgb(theme.colors.foreground),
    '--color-border': hexToRgb(theme.colors.border),
    '--color-muted': hexToRgb(theme.colors.muted),
    '--color-destructive': hexToRgb(theme.colors.destructive),

    '--radius-lg': theme.radius.lg,
    '--radius-md': theme.radius.md,
    '--radius-sm': theme.radius.sm,
  }
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '0 0 0'
  const r = parseInt(result[1], 16)
  const g = parseInt(result[2], 16)
  const b = parseInt(result[3], 16)
  return `${r} ${g} ${b}`
}
