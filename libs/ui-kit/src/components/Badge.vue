<template>
  <v-badge
    class="ui-badge"
    v-bind="badgeAttrs">
    <slot />
  </v-badge>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

/**
 * MD3-compliant badge wrapping Vuetify's `<v-badge>`.
 *
 * - Provide `content` to render a **large** (numbered) badge.
 * - Omit `content` (or pass `undefined`) to render a **small** dot badge.
 *
 * All other props/attributes are forwarded to the underlying `<v-badge>`.
 */
export type BadgeSize = 'large' | 'small';

defineOptions({ name: 'UiBadge', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /**
     * Badge label (text or number).
     * When omitted the badge renders as a 6 × 6 px dot (small variant).
     */
    content?: string | number;
  }>(),
  {
    content: undefined,
  }
);

const rawAttrs = useAttrs();

const isDot = computed(() => props.content === undefined || props.content === '');

/** Attributes merged with MD3 defaults and forwarded to `<v-badge>`. */
const badgeAttrs = computed(() => ({
  color: 'error',
  ...rawAttrs,
  content: props.content,
  dot: isDot.value,
}));
</script>
