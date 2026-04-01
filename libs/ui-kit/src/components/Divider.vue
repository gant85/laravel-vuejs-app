<template>
  <div
    v-if="subheader"
    class="ui-divider-with-subheader">
    <v-divider v-bind="dividerAttrs" />
    <span class="ui-divider-subheader-text">{{ subheader }}</span>
  </div>
  <v-divider
    v-else
    v-bind="dividerAttrs"
    :class="indentClass" />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';

/**
 * Controls the indentation (margin) of the divider line.
 *
 * - `none` — no indentation, line spans the full length (default)
 * - `inset` — 16 px margin on the start side (left for horizontal, top for vertical)
 * - `middle-inset` — 16 px margin on both sides
 *
 * This prop is separate from Vuetify's native `inset` (72 px) and `variant`
 * (border-style). Both of those pass through to `<v-divider>` untouched.
 */
export type DividerIndent = 'none' | 'inset' | 'middle-inset';

defineOptions({ name: 'UiDivider', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /**
     * Controls the indentation of the divider line.
     * Does NOT collide with Vuetify's `variant` (border-style) or `inset` (72 px).
     */
    indent?: DividerIndent;
    /** Render a vertical divider instead of horizontal (mirrors Vuetify). */
    vertical?: boolean;
    /** Optional subheader text displayed below a horizontal divider. */
    subheader?: string;
  }>(),
  {
    indent: 'none',
    vertical: false,
    subheader: undefined,
  }
);

const rawAttrs = useAttrs();

/** Attributes forwarded to the inner `v-divider`. */
const dividerAttrs = computed(() => ({
  ...rawAttrs,
  vertical: props.subheader ? false : props.vertical,
}));

/** CSS class applied to bare (non-subheader) dividers. */
const indentClass = computed(() => {
  if (props.indent === 'none') return undefined;
  return `ui-divider--${props.indent}`;
});
</script>
