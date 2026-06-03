import * as React from 'react'
import { cn } from '@/utils/cn'

const Table = React.forwardRef<
  HTMLTableElement,
  React.TableHTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <table ref={ref} className={cn('min-w-full divide-y divide-border', className)} {...props} />
))
Table.displayName = 'Table'

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn('bg-background', className)} {...props} />
))
TableHeader.displayName = 'TableHeader'

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('bg-card divide-y divide-border', className)} {...props} />
))
TableBody.displayName = 'TableBody'

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn('hover:bg-accent/50', className)} {...props} />
))
TableRow.displayName = 'TableRow'

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th ref={ref} className={cn('px-4 py-2 text-left text-sm font-medium text-muted-foreground', className)} {...props} />
))
TableHead.displayName = 'TableHead'

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td ref={ref} className={cn('px-4 py-2 align-top text-sm', className)} {...props} />
))
TableCell.displayName = 'TableCell'

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell }
import { cva } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { forwardRef, type ForwardedRef, type TableHTMLAttributes } from 'react'

const tableStyles = cva('min-w-full divide-y divide-border text-sm')

export interface TableProps extends TableHTMLAttributes<HTMLTableElement> {}

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className, ...props }: TableProps, ref: ForwardedRef<HTMLTableElement>) => (
    <table ref={ref} className={cn(tableStyles(), className)} {...props} />
  )
)
Table.displayName = 'Table'
