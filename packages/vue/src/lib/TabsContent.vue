<script setup lang="ts">
import { TabsContent } from 'reka-ui';

defineProps<{ value: string }>();
</script>

<template>
  <TabsContent
    :value="value"
    class="mt-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
  >
    <slot />
  </TabsContent>
</template>
