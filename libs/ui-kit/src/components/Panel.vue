<template>
  <v-card v-bind="$attrs">
    <v-card-title v-if="$slots.title">
      <slot name="title" />
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Panel',
  inheritAttrs: false,
});
</script>
