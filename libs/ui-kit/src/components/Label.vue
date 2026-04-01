<template>
  <v-chip
    class="ui-label"
    :class="[`ui-label--${size}`, `ui-label--${appearance}`]"
    :color="vuetifyColor"
    :variant="vuetifyVariant"
    v-bind="$attrs">
    <template
      v-if="icon"
      #prepend>
      <v-icon>{{ icon }}</v-icon>
    </template>
    <slot>{{ text }}</slot>
  </v-chip>
</template>

<script setup lang="ts">
import { computed } from 'vue';

/**
 * MD3-compliant label (tag) component wrapping Vuetify's `<v-chip>`.
 *
 * - 4 sizes: extra-large (32 px), large (24 px), medium (20 px), small (16 px).
 * - 3 appearances: filled (solid bg), tint (container bg + border), subtle (text only).
 * - 6 semantic colors: brand, error, warning, success, important, info.
 * - Optional leading icon (Material Symbols name).
 *
 * All extra props/attributes are forwarded to the underlying `<v-chip>`.
 */

export type LabelSize = 'extra-large' | 'large' | 'medium' | 'small';
export type LabelAppearance = 'filled' | 'tint' | 'subtle';
export type LabelColor = 'brand' | 'error' | 'warning' | 'success' | 'important' | 'info';

defineOptions({ name: 'UiLabel', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    /** Label text content. Can also be provided via the default slot. */
    text?: string;
    /** Component size. */
    size?: LabelSize;
    /** Visual appearance variant. */
    appearance?: LabelAppearance;
    /** Semantic color. */
    color?: LabelColor;
    /** Optional Material Symbols icon name displayed before the text. */
    icon?: string;
  }>(),
  {
    text: undefined,
    size: 'medium',
    appearance: 'filled',
    color: 'brand',
    icon: undefined,
  }
);

/** Map semantic color names to Vuetify theme tokens. */
const vuetifyColor = computed(() => {
  const map: Record<LabelColor, string> = {
    brand: 'primary',
    error: 'error',
    warning: 'warning',
    success: 'success',
    important: 'on-surface',
    info: 'info',
  };
  return map[props.color];
});

/** Map appearance to Vuetify chip variant. */
const vuetifyVariant = computed(() => {
  const map: Record<LabelAppearance, 'flat' | 'tonal' | 'text'> = {
    filled: 'flat',
    tint: 'tonal',
    subtle: 'text',
  };
  return map[props.appearance];
});
</script>
