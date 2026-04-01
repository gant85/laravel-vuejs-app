<template>
  <v-card
    variant="outlined"
    class="code-example">
    <v-tabs
      v-model="activeTab"
      density="compact"
      color="primary">
      <v-tab value="preview">
        <v-icon
          start
          size="small"
          >visibility</v-icon
        >
        Preview
      </v-tab>
      <v-tab value="code">
        <v-icon
          start
          size="small"
          >code</v-icon
        >
        Code
      </v-tab>
    </v-tabs>
    <v-divider />
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item value="preview">
        <slot />
      </v-tabs-window-item>
      <v-tabs-window-item value="code">
        <div class="code-example__code pa-4">
          <HighlightedCode
            :code="code"
            :lang="lang" />
        </div>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HighlightedCode from './HighlightedCode.vue';

defineProps<{
  code: string;
  lang?: string;
}>();

const activeTab = ref('preview');
</script>

<style scoped>
.code-example__code {
  background-color: #f5f5f5;
}
</style>
