<script setup lang="ts">
import {
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
  TooltipPortal,
  TooltipContent,
} from 'reka-ui';

defineProps<{
  delayDuration?: number;
  side?: 'top' | 'right' | 'bottom' | 'left';
}>();
</script>

<template>
  <TooltipProvider :delay-duration="delayDuration ?? 300">
    <TooltipRoot>
      <TooltipTrigger as-child>
        <slot />
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent
          :side="side ?? 'top'"
          :side-offset="4"
          class="z-50 overflow-hidden rounded-md bg-neutral-900 px-3 py-1.5 text-sm text-white shadow-md"
        >
          <slot name="content" />
        </TooltipContent>
      </TooltipPortal>
    </TooltipRoot>
  </TooltipProvider>
</template>
