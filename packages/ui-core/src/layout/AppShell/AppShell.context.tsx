import { createContext, useContext } from 'react';

type AppShellContextType = {
  variant: string;
  density: string;
};

export const AppShellContext = createContext<AppShellContextType | null>(null);

export function useAppShell() {
  const ctx = useContext(AppShellContext);
  if (!ctx) throw new Error('AppShell must be used inside provider');
  return ctx;
}
