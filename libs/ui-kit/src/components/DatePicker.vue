<template>
  <VTextField
    v-bind="$attrs"
    type="date">
    <slot />
  </VTextField>
</template>

<script setup lang="ts">
import { VTextField } from 'vuetify/components';

defineOptions({
  name: 'DatePicker',
  inheritAttrs: false,
});
</script>
