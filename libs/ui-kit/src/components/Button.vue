<template>
  <v-btn
    v-bind="attrs"
    :class="sizeClass">
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

// Custom sizes not known to Vuetify must be passed as a class instead of
// the `size` prop, otherwise Vuetify applies conflicting inline styles.
const CUSTOM_SIZES = ['large'] as const;
type CustomSize = (typeof CUSTOM_SIZES)[number];

defineOptions({ name: 'UiButton', inheritAttrs: false });

const rawAttrs = useAttrs();

const sizeClass = computed(() =>
  CUSTOM_SIZES.includes(rawAttrs.size as CustomSize) ? `v-btn--size-${rawAttrs.size}` : undefined
);

const attrs = computed(() => {
  if (!CUSTOM_SIZES.includes(rawAttrs.size as CustomSize)) return rawAttrs;
  // Strip `size` and let Vuetify use its default; our CSS class takes over.
  const { size: _removed, ...rest } = rawAttrs;
  return rest;
});
</script>
