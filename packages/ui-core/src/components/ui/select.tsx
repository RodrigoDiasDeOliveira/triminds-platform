import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { Check, ChevronDown } from 'lucide-react'
import { cn } from '@/utils/cn'
import { cva, type VariantProps } from 'class-variance-authority'

const selectVariants = cva(
  'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline: '',
      },
    },
    defaultVariants: { variant: 'default' },
  }
)

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
    VariantProps<typeof selectVariants> {}

const Select = SelectPrimitive.Root

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectVariants({ className }))}
    {...props}
  >
    <SelectPrimitive.Value />
    <SelectPrimitive.Icon>
      <ChevronDown className="h-4 w-4" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))
SelectTrigger.displayName = 'SelectTrigger'

const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn('overflow-hidden rounded-md border bg-card p-1 shadow-lg', className)}
      {...props}
    >
      <SelectPrimitive.Viewport className="p-1" />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))
SelectContent.displayName = 'SelectContent'

const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1 text-sm', className)}
    {...props}
  >
    <SelectPrimitive.ItemIndicator className="absolute left-2 inline-flex items-center">
      <Check className="h-4 w-4" />
    </SelectPrimitive.ItemIndicator>
    <SelectPrimitive.ItemText className="pl-6">{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))
SelectItem.displayName = 'SelectItem'

export { Select, SelectTrigger, SelectContent, SelectItem }
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
  extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'>,
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
