<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Radio Buttons</h1>
      <p class="text-grey-darken-1 mt-2">
        Radio buttons allow users to select a single option from a set of mutually exclusive
        choices. They are typically used within a Radio Group to manage selection state.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Default Usage</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.radioDefault"></HighlightedCode>
          <div class="pa-6 bg-white rounded-b">
            <v-radio-group v-model="radioValue">
              <v-radio
                label="Radio One"
                value="one"></v-radio>
              <v-radio
                label="Radio Two"
                value="two"></v-radio>
              <v-radio
                disabled
                label="Radio Three"
                value="three"></v-radio>
            </v-radio-group>
          </div>
        </v-sheet>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Inline Selection</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.radioInline"></HighlightedCode>
          <div class="pa-6 bg-white rounded-b">
            <v-radio-group
              v-model="radioValue"
              inline>
              <v-radio
                label="Option 1"
                value="1"
                class="mr-4"></v-radio>
              <v-radio
                label="Option 2"
                value="2"></v-radio>
            </v-radio-group>
          </div>
        </v-sheet>
      </div>

      <div class="text-body-medium mt-4">
        <strong>Developer Note:</strong> Use the <code><strong>inline</strong></code> prop to
        display radio buttons horizontally. The <code><strong>v-radio-group</strong></code> is
        mandatory to manage the <code><strong>v-model</strong></code> selection logic.
      </div>

      <p class="text-body-medium-sb mt-6">
        For more details, refer to the
        <a
          href="https://v3.vuetifyjs.com/en/components/radio-buttons/"
          target="_blank"
          class="text-primary text-decoration-none"
          >Official Vuetify Documentation</a
        >.
      </p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

const radioValue = ref('one');

const examples = {
  radioDefault: `
<v-radio-group v-model="radioValue">
  <v-radio label="Radio One" value="one"></v-radio>
  <v-radio label="Radio Two" value="two"></v-radio>
  <v-radio disabled label="Radio Three" value="three"></v-radio>
</v-radio-group>`,

  radioInline: `
<v-radio-group v-model="radioValue" inline>
  <v-radio label="Option 1" value="1"></v-radio>
  <v-radio label="Option 2" value="2"></v-radio>
</v-radio-group>`,
};
</script>
