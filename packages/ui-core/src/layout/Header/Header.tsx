import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export function Header({ title, subtitle, actions, className }: HeaderProps) {
  return (
    <div className={cn('flex h-16 items-center justify-between px-6', className)}>
      <div className="flex flex-col">
        {title && (
          <span className="text-base font-semibold leading-tight">{title}</span>
        )}
        {subtitle && (
          <span className="text-xs text-muted-foreground">{subtitle}</span>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
