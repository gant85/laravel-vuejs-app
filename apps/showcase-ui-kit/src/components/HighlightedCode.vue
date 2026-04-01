<template>
  <!-- eslint-disable vue/no-v-html -->
  <div
    v-if="html"
    class="highlighted-code"
    v-html="html" />
  <!-- eslint-enable vue/no-v-html -->
  <pre
    v-else
    class="text-caption mb-0"><code>{{ code }}</code></pre>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { codeToHtml } from 'shiki';

const props = defineProps<{
  code: string;
  lang?: string;
}>();

const html = ref('');

async function highlight() {
  try {
    html.value = await codeToHtml(props.code, {
      lang: props.lang ?? 'vue-html',
      theme: 'github-light',
    });
  } catch {
    html.value = '';
  }
}

onMounted(highlight);
watch(() => props.code, highlight);
</script>

<style scoped>
.highlighted-code :deep(pre) {
  padding: 0;
  margin: 0;
  overflow-x: auto;
  font-size: 0.75rem;
  line-height: 1.6;
  background: transparent !important;
}

.highlighted-code :deep(code) {
  font-family: 'Roboto Mono', 'Fira Code', Consolas, monospace;
}
</style>
