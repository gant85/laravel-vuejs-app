<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Tabs</h1>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Tabs organize content across different screens and views.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Tabs -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Tabs</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.Tabs"></HighlightedCode>
        </v-sheet>

        <v-sheet>
          <v-tabs
            v-model="tab"
            color="primary">
            <v-tab value="one">Item One</v-tab>
            <v-tab value="two">Item Two</v-tab>
            <v-tab value="three">Item Three</v-tab>
          </v-tabs>

          <v-tabs-window v-model="tab">
            <v-tabs-window-item value="one">
              <v-sheet class="pa-5">One</v-sheet>
            </v-tabs-window-item>
            <v-tabs-window-item value="two">
              <v-sheet class="pa-5">Two</v-sheet>
            </v-tabs-window-item>
            <v-tabs-window-item value="three">
              <v-sheet class="pa-5">Three</v-sheet>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-sheet>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import HighlightedCode from '../../../components/HighlightedCode.vue';
import { ref } from 'vue';

const tab = ref('');

const examples = {
  Tabs: `
  <v-sheet>
  <v-tabs v-model="tab" color="primary">
    <v-tab value="one">Item One</v-tab>
    <v-tab value="two">Item Two</v-tab>
    <v-tab value="three">Item Three</v-tab>
  </v-tabs>

  <v-tabs-window v-model="tab">
    <v-tabs-window-item value="one">
      <v-sheet class="pa-5">One</v-sheet>
    </v-tabs-window-item>
    <v-tabs-window-item value="two">
      <v-sheet class="pa-5">Two</v-sheet>
    </v-tabs-window-item>
    <v-tabs-window-item value="three">
      <v-sheet class="pa-5">Three</v-sheet>
    </v-tabs-window-item>
  </v-tabs-window>
</v-sheet>`,
};
</script>
