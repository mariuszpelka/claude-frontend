<script setup lang="ts">
import { Primitive, type PrimitiveProps } from 'reka-ui';
import { computed, type ButtonHTMLAttributes } from 'vue';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface Props
  extends /* @vue-ignore */ ButtonHTMLAttributes,
    Pick<PrimitiveProps, 'asChild'> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  asChild: false,
});

const baseClasses =
  'inline-flex items-center justify-center font-medium rounded-md transition-colors duration-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
  secondary:
    'bg-neutral-100 text-neutral-900 hover:bg-neutral-200 active:bg-neutral-300',
  ghost: 'bg-transparent text-neutral-900 hover:bg-neutral-100',
  danger: 'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-700',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-base',
  lg: 'h-12 px-6 text-lg',
};

const composedClass = computed(() =>
  [baseClasses, variantClasses[props.variant], sizeClasses[props.size]].join(
    ' ',
  ),
);
</script>

<template>
  <Primitive
    :as="asChild ? 'template' : 'button'"
    :as-child="asChild"
    :class="composedClass"
  >
    <slot />
  </Primitive>
</template>
