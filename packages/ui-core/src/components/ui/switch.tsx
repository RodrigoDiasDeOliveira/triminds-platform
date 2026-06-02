import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/utils/cn'
import { forwardRef, type ComponentPropsWithoutRef, type ElementRef } from 'react'

export interface SwitchProps
  extends ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {}

export const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'peer inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-input bg-background p-[2px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg transition-transform duration-200 data-[state=checked]:translate-x-5" />
  </SwitchPrimitive.Root>
))
Switch.displayName = 'Switch'
