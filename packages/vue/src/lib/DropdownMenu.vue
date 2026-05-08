<script setup lang="ts">
import { DropdownMenuRoot } from 'reka-ui';

defineProps<{ defaultOpen?: boolean; open?: boolean }>();
defineEmits<{ 'update:open': [value: boolean] }>();
</script>

<template>
  <DropdownMenuRoot
    :default-open="defaultOpen"
    :open="open"
    @update:open="$emit('update:open', $event)"
  >
    <slot />
  </DropdownMenuRoot>
</template>
