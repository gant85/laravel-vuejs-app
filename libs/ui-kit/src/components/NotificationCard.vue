<template>
  <v-card
    v-bind="$attrs"
    :color="type">
    <v-card-title v-if="title">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <slot />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { NotificationCardType } from '../types';

defineOptions({
  name: 'NotificationCard',
  inheritAttrs: false,
});

defineProps<{
  title?: string;
  type?: NotificationCardType;
}>();
</script>
