<template>
  <v-alert
    v-bind="$attrs"
    :type="type">
    <slot />
  </v-alert>
</template>

<script setup lang="ts">
import type { MessageBarType } from '../types';

defineOptions({
  name: 'MessageBar',
  inheritAttrs: false,
});

withDefaults(
  defineProps<{
    type?: MessageBarType;
  }>(),
  {
    type: 'info',
  }
);
</script>
