<script setup lang="ts">
import { TabsList } from 'reka-ui';
</script>

<template>
  <TabsList
    class="inline-flex h-10 items-center justify-center rounded-md bg-neutral-100 p-1 text-neutral-600"
  >
    <slot />
  </TabsList>
</template>
