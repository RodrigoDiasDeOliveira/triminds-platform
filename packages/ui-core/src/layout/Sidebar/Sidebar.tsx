import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

export interface NavigationItem {
  label: string;
  path: string;
  icon?: ReactNode;
}

export interface SidebarProps {
  items: NavigationItem[];
  activePath?: string;
  onNavigate?: (path: string) => void;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
}

export function Sidebar({
  items,
  activePath,
  onNavigate,
  header,
  footer,
  className,
}: SidebarProps) {
  return (
    <nav className={cn('flex h-full w-64 flex-col p-3', className)}>
      {header && <div className="px-2 pb-4 pt-2">{header}</div>}
      <ul className="flex flex-1 flex-col gap-1">
        {items.map((item) => {
          const active = item.path === activePath;
          return (
            <li key={item.path}>
              <button
                type="button"
                onClick={() => onNavigate?.(item.path)}
                className={cn(
                  'flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {footer && <div className="px-2 pb-2 pt-4">{footer}</div>}
    </nav>
  );
}
