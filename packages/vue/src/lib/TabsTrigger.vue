<script setup lang="ts">
import { TabsTrigger } from 'reka-ui';

defineProps<{ value: string; disabled?: boolean }>();
</script>

<template>
  <TabsTrigger
    :value="value"
    :disabled="disabled"
    class="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-neutral-900 data-[state=active]:shadow"
  >
    <slot />
  </TabsTrigger>
</template>
