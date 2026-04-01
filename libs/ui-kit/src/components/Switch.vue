<template>
  <v-switch
    class="ui-switch"
    color="primary"
    :inset="true"
    v-bind="$attrs">
    <template
      v-if="label !== undefined"
      #label>
      <span class="ui-switch__label-text">{{ label }}</span>
      <span
        v-if="required"
        class="ui-switch__required"
        aria-hidden="true"
        >*</span
      >
    </template>
    <slot />
  </v-switch>
</template>

<script setup lang="ts">
/**
 * MD3-compliant switch component wrapping Vuetify's `<v-switch>`.
 *
 * - Toggle switch with optional label and required indicator.
 * - Uses `primary` color for the active (on) state per MD3 spec.
 * - Track: 40px × 20px, border-radius: 100px.
 * - Handle: 14px × 14px, border-radius: 24px.
 * - State layer target: 30px × 30px.
 * - All extra props/attributes (including v-model) are forwarded to the underlying `<v-switch>`.
 */

defineOptions({ name: 'UiSwitch', inheritAttrs: false });

withDefaults(
  defineProps<{
    /** Label text displayed next to the switch. */
    label?: string;
    /** When true, shows a red required asterisk after the label. */
    required?: boolean;
  }>(),
  {
    label: undefined,
    required: false,
  }
);
</script>
