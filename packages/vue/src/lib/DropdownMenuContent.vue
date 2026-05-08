<script setup lang="ts">
import { DropdownMenuPortal, DropdownMenuContent } from 'reka-ui';

defineProps<{ sideOffset?: number; align?: 'start' | 'center' | 'end' }>();
</script>

<template>
  <DropdownMenuPortal>
    <DropdownMenuContent
      :side-offset="sideOffset ?? 4"
      :align="align ?? 'start'"
      class="z-50 min-w-[8rem] overflow-hidden rounded-md border border-neutral-200 bg-white p-1 text-neutral-900 shadow-md"
    >
      <slot />
    </DropdownMenuContent>
  </DropdownMenuPortal>
</template>
