import React from 'react';

export type AppShellProps = {
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  children: React.ReactNode;

  /**
   * controla comportamento visual
   */
  variant?: 'default' | 'compact' | 'fullscreen';

  /**
   * permite apps como VectorAI mudarem layout
   */
  density?: 'comfortable' | 'compact';

  className?: string;
};
