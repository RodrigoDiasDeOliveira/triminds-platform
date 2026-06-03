import type { ReactNode } from 'react'

export type AppShellProps = {
  header?: ReactNode
  sidebar?: ReactNode
  children: ReactNode

  /**
   * controla comportamento visual
   */
  variant?: 'default' | 'compact' | 'fullscreen'

  /**
   * permite apps como VectorAI mudarem layout
   */
  density?: 'comfortable' | 'compact'

  className?: string
}
