<template>
  <v-container>
    <h1 class="text-h4 mb-6">Panels Demo</h1>
    <v-row>
      <v-col
        cols="12"
        md="6">
        <Panel
          title="Basic Panel"
          :model-value="panel1Open"
          @update:model-value="panel1Open = $event">
          <p>This is a basic panel with content</p>
        </Panel>
      </v-col>
      <v-col
        cols="12"
        md="6">
        <Panel
          title="Panel with Actions"
          :model-value="panel2Open"
          @update:model-value="panel2Open = $event">
          <p>This panel has action buttons</p>
          <template #actions>
            <v-btn
              variant="text"
              size="small">
              Action
            </v-btn>
          </template>
        </Panel>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Panel } from '@reference-app-laravel-vue/ui-kit';

const panel1Open = ref(true);
const panel2Open = ref(true);
</script>
