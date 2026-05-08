<script setup lang="ts">
import { DialogRoot } from 'reka-ui';

defineProps<{ open?: boolean; defaultOpen?: boolean }>();
defineEmits<{ 'update:open': [value: boolean] }>();
</script>

<template>
  <DialogRoot
    :open="open"
    :default-open="defaultOpen"
    @update:open="$emit('update:open', $event)"
  >
    <slot />
  </DialogRoot>
</template>
