import * as React from 'react'
import * as ToastPrimitives from '@radix-ui/react-toast'
import { cn } from '@/utils/cn'

const ToastProvider = ToastPrimitives.Provider

const ToastViewport = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn('fixed bottom-4 right-4 z-50 flex w-96 flex-col gap-2', className)}
    {...props}
  />
))
ToastViewport.displayName = 'ToastViewport'

export { ToastProvider, ToastViewport }
