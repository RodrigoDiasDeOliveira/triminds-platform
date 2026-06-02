import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { forwardRef, type ForwardedRef, type SelectHTMLAttributes } from 'react'

const selectVariants = cva(
  'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        ghost: 'bg-transparent',
      },
      size: {
        default: 'h-10',
        sm: 'h-9 text-sm',
        lg: 'h-11 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, variant, size, children, ...props }: SelectProps, ref: ForwardedRef<HTMLSelectElement>) => (
    <select
      ref={ref}
      className={cn(selectVariants({ variant, size, className }))}
      {...props}
    >
      {children}
    </select>
  )
)
Select.displayName = 'Select'
