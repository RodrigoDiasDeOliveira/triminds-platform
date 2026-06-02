import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/utils/cn'
import { forwardRef, type ForwardedRef, type HTMLAttributes } from 'react'

const skeletonVariants = cva('animate-pulse rounded-md bg-muted', {
  variants: {
    variant: {
      default: '',
      circle: 'rounded-full',
    },
    size: {
      default: '',
      sm: 'h-4',
      md: 'h-6',
      lg: 'h-8',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

export interface SkeletonProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof skeletonVariants> {
  width?: string
  height?: string
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  (
    { className, variant, size, width = '100%', height = '1rem', ...props }: SkeletonProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => (
    <div
      ref={ref}
      className={cn(skeletonVariants({ variant, size, className }))}
      style={{ width, height }}
      {...props}
    />
  )
)
Skeleton.displayName = 'Skeleton'
