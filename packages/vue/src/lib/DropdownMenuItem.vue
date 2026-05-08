<script setup lang="ts">
import { DropdownMenuItem } from 'reka-ui';

defineProps<{ disabled?: boolean }>();
defineEmits<{ select: [event: Event] }>();
</script>

<template>
  <DropdownMenuItem
    :disabled="disabled"
    class="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-neutral-100 focus:text-neutral-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    @select="$emit('select', $event)"
  >
    <slot />
  </DropdownMenuItem>
</template>
