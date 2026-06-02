export interface ThemeConfig {
  colors: {
    primary: string
    primaryForeground: string
    secondary: string
    accent: string
    background: string
    foreground: string
    border: string
    muted: string
    destructive: string
  }
  radius: {
    lg: string
    md: string
    sm: string
  }
  density: 'compact' | 'comfortable'
  fontFamily: {
    sans: string
  }
}

export interface TrimindsConfig {
  theme: Partial<ThemeConfig>
  sidebar?: {
    collapsible?: boolean
    defaultCollapsed?: boolean
    logo?: string
  }
  branding?: {
    companyName?: string
    logoLight?: string
    logoDark?: string
  }
}
