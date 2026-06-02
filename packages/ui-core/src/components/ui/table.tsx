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
