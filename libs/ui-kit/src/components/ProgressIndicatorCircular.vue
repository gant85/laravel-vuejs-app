<template>
  <v-progress-circular v-bind="$attrs" />
</template>

<script setup lang="ts">
defineOptions({
  name: 'ProgressIndicatorCircular',
  inheritAttrs: false,
});
</script>
