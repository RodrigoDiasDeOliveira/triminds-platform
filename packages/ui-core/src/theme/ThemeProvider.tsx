'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { createTheme, themeToCSSVariables } from './createTheme'
import type { ThemeConfig, TrimindsConfig } from './types.ts'

interface ThemeContextType {
  theme: ThemeConfig
  config: TrimindsConfig
  updateTheme: (newConfig: Partial<TrimindsConfig>) => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({
  children,
  initialConfig = {},
}: {
  children: ReactNode
  initialConfig?: Partial<TrimindsConfig>
}) {
  const [config, setConfig] = useState<TrimindsConfig>({
    theme: {},
    ...initialConfig,
  })

  const theme = createTheme(config.theme)

  useEffect(() => {
    const root = document.documentElement
    const cssVars = themeToCSSVariables(theme)

    Object.entries(cssVars).forEach(([key, value]) => {
      root.style.setProperty(key, value)
    })

    if (theme.density === 'compact') {
      root.classList.add('density-compact')
    } else {
      root.classList.remove('density-compact')
    }
  }, [theme])

  const updateTheme = (newConfig: Partial<TrimindsConfig>) => {
    setConfig((prev) => ({
      ...prev,
      ...newConfig,
      theme: {
        ...prev.theme,
        ...newConfig.theme,
      },
    }))
  }

  return (
    <ThemeContext.Provider value={{ theme, config, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
