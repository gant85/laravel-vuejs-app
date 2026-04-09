<template>
  <v-text-field
    v-bind="$attrs"
    type="date">
    <slot />
  </v-text-field>
</template>

<script setup lang="ts">
defineOptions({
  name: 'DatePicker',
  inheritAttrs: false,
});
</script>
