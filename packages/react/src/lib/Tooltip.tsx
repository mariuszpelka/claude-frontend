import { Tooltip as RadixTooltip } from 'radix-ui';
import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementRef,
  type ReactNode,
} from 'react';

export const TooltipProvider = RadixTooltip.Provider;
export const TooltipRoot = RadixTooltip.Root;
export const TooltipTrigger = RadixTooltip.Trigger;
export const TooltipPortal = RadixTooltip.Portal;
export const TooltipArrow = RadixTooltip.Arrow;

const contentClasses =
  'z-50 overflow-hidden rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 data-[state=closed]:animate-out data-[state=closed]:fade-out-0';

export const TooltipContent = forwardRef<
  ElementRef<typeof RadixTooltip.Content>,
  ComponentPropsWithoutRef<typeof RadixTooltip.Content>
>(function TooltipContent(
  { className, sideOffset = 4, children, ...rest },
  ref,
) {
  const composed = [contentClasses, className].filter(Boolean).join(' ');
  return (
    <RadixTooltip.Content
      ref={ref}
      sideOffset={sideOffset}
      className={composed}
      {...rest}
    >
      {children}
    </RadixTooltip.Content>
  );
});

export interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  delayDuration?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
}

export function Tooltip({
  content,
  children,
  delayDuration = 300,
  side = 'top',
}: TooltipProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent side={side}>{content}</TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
}
