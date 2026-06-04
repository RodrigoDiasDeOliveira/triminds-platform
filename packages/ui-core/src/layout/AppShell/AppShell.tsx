import { cn } from '@/utils/cn';
import { AppShellProps } from './AppShell.types';
import { AppShellContext } from './AppShell.context';

export function AppShell({
  header,
  sidebar,
  children,
  variant = 'default',
  density = 'comfortable',
  className,
}: AppShellProps) {
  return (
    <AppShellContext.Provider value={{ variant, density }}>
      <div
        className={cn('flex h-screen flex-col bg-background text-foreground', className)}
        data-variant={variant}
        data-density={density}
      >
        {header && (
          <header className="shrink-0 border-b border-border bg-card">{header}</header>
        )}
        <div className="flex flex-1 overflow-hidden">
          {sidebar && (
            <aside className="shrink-0 border-r border-border bg-card">{sidebar}</aside>
          )}
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </AppShellContext.Provider>
  );
}
