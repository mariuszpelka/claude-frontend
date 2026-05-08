<script setup lang="ts">
import { TabsRoot } from 'reka-ui';

defineProps<{
  defaultValue?: string;
  modelValue?: string;
  orientation?: 'horizontal' | 'vertical';
}>();

defineEmits<{ 'update:modelValue': [value: string] }>();
</script>

<template>
  <TabsRoot
    :default-value="defaultValue"
    :model-value="modelValue"
    :orientation="orientation"
    @update:model-value="$emit('update:modelValue', $event as string)"
  >
    <slot />
  </TabsRoot>
</template>
