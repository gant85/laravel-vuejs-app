<template>
  <v-progress-linear v-bind="$attrs" />
</template>

<script setup lang="ts">
defineOptions({
  name: 'ProgressIndicatorLinear',
  inheritAttrs: false,
});
</script>
