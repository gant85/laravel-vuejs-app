<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Progress Indicators</h1>
      <p class="text-grey-darken-1 mt-2">
        Progress indicators inform users about the status of ongoing processes, such as loading data
        or submitting a form.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Progress Linear</h3>

        <div class="mb-8">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Determinate</h4>
          <v-sheet
            color="grey-lighten-4"
            rounded
            class="pa-0">
            <HighlightedCode :code="examples.linearDeterminate"></HighlightedCode>
            <div class="pa-4 bg-white rounded-b">
              <v-progress-linear
                v-model="value"
                height="4"></v-progress-linear>
            </div>
          </v-sheet>
        </div>

        <div class="mb-8">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Indeterminate</h4>
          <v-sheet
            color="grey-lighten-4"
            rounded
            class="pa-0">
            <HighlightedCode :code="examples.linearIndeterminate"></HighlightedCode>
            <div class="pa-4 bg-white rounded-b">
              <v-progress-linear indeterminate></v-progress-linear>
            </div>
          </v-sheet>
        </div>

        <div class="mb-8">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">With Label</h4>
          <v-sheet
            color="grey-lighten-4"
            rounded
            class="pa-0">
            <HighlightedCode :code="examples.linearLabel"></HighlightedCode>
            <div class="pa-4 bg-white rounded-b">
              <v-sheet class="d-flex align-center bg-transparent">
                <v-progress-linear v-model="value"></v-progress-linear>
                <div class="ml-2 text-primary text-label-extra-small-sb">{{ value }}%</div>
              </v-sheet>
            </div>
          </v-sheet>
        </div>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> By default, the linear progress indicator has a thickness
          of <code><strong>8px</strong></code
          >. To use a thinner version, add the <code><strong>height="4"</strong></code> attribute.
          For unknown durations, add the <code><strong>indeterminate</strong></code> attribute.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Progress Circular</h3>

        <div class="mb-8">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Determinate</h4>
          <v-sheet
            color="grey-lighten-4"
            rounded
            class="pa-0">
            <HighlightedCode :code="examples.circularDeterminate"></HighlightedCode>
            <div class="pa-4 bg-white rounded-b d-flex justify-center">
              <v-progress-circular
                :model-value="value"
                size="44"
                width="8"></v-progress-circular>
            </div>
          </v-sheet>
        </div>

        <div class="mb-8">
          <h4 class="text-subtitle-1 font-weight-bold mb-2">Indeterminate</h4>
          <v-sheet
            color="grey-lighten-4"
            rounded
            class="pa-0">
            <HighlightedCode :code="examples.circularIndeterminate"></HighlightedCode>
            <div class="pa-6 bg-white rounded-b d-flex justify-center">
              <v-progress-circular indeterminate></v-progress-circular>
            </div>
          </v-sheet>
        </div>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Circular indicators have a default diameter (size) of
          <code><strong>40px</strong></code> and a stroke width of <code><strong>4px</strong></code
          >. To achieve a thicker version as shown above, add the
          <code><strong>size="44"</strong></code> and
          <code><strong>width="8"</strong></code> attributes. Use
          <code><strong>model-value</strong></code> for progress or
          <code><strong>indeterminate</strong></code> for continuous loading.
        </div>
      </div>

      <p class="text-body-medium-sb mt-6">
        For more details, refer to the
        <a
          href="https://v3.vuetifyjs.com/en/components/progress-linear/"
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

const value = ref(30);

const examples = {
  linearDeterminate: `<v-progress-linear v-model="value" height="4"></v-progress-linear>`,

  linearIndeterminate: `<v-progress-linear indeterminate></v-progress-linear>`,

  linearLabel: `
<v-sheet class="d-flex align-center bg-transparent">
  <v-progress-linear v-model="value"></v-progress-linear>
  <div class="ml-2 text-primary text-label-extra-small-sb">{{ value }}%</div>
</v-sheet>`,

  circularDeterminate: `<v-progress-circular :model-value="value" size="44" width="8"></v-progress-circular>`,

  circularIndeterminate: `<v-progress-circular indeterminate></v-progress-circular>`,
};
</script>
