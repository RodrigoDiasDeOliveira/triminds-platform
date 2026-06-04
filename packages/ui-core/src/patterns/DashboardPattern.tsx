import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

export interface DashboardStat {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  icon?: ReactNode;
}

export interface DashboardPatternProps {
  stats?: DashboardStat[];
  /** Number of stat columns on large screens (default 4). */
  columns?: 2 | 3 | 4;
  children?: ReactNode;
  className?: string;
}

const colsClass = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
} as const;

export function DashboardPattern({
  stats = [],
  columns = 4,
  children,
  className,
}: DashboardPatternProps) {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {stats.length > 0 && (
        <div className={cn('grid grid-cols-1 gap-4 sm:grid-cols-2', colsClass[columns])}>
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between">
                <span className="text-sm text-muted-foreground">{stat.label}</span>
                {stat.icon && <span className="text-primary">{stat.icon}</span>}
              </div>
              <div className="mt-2 text-2xl font-semibold text-foreground">
                {stat.value}
              </div>
              {stat.hint && (
                <div className="mt-1 text-xs text-muted-foreground">{stat.hint}</div>
              )}
            </div>
          ))}
        </div>
      )}
      {children}
    </div>
  );
}
