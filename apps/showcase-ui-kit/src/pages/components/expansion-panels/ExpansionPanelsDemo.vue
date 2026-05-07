<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Expansion Panels</h1>
      <p class="text-grey-darken-1 mt-2">
        Expansion panels provide an expandable details-summary view.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Expansion Panel -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Expansion Panel</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.basic"></HighlightedCode>
        </v-sheet>
        <div class="mt-4">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon
                  icon="star"
                  size="x-small"
                  color="on-surface-variant" />
                <span class="text-body-small-bd text-on-surface-variant">Title</span>
                <span class="text-body-small-bd text-on-surface-variant"> - </span>
                <span class="text-body-small text-on-surface-variant"> Subtitle </span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
                <div class="pa-3">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis
                  quis est labore voluptatibus! Eaque cupiditate minima
                </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
      <div class="mb-8">
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.withoutIcon"></HighlightedCode>
        </v-sheet>
        <div class="mt-4"></div>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> The icon is optional. Simply omit the
          <code>v-icon</code> from the title slot.
        </div>
        <p class="text-body-medium-sb mt-6">
          For more details, refer to the
          <a
            href="https://v3.vuetifyjs.com/en/components/expansion-panels/#usage"
            target="_blank"
            class="text-primary text-decoration-none"
            >Official Vuetify Documentation</a
          >.
        </p>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import HighlightedCode from '../../../components/HighlightedCode.vue';

const examples = {
  basic: `
  <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>
                <v-icon
                  icon="star"
                  size="x-small"
                  color="on-surface-variant" />
                <span class="text-body-small-bd text-on-surface-variant">Title</span>
                <span class="text-body-small-bd text-on-surface-variant"> - </span>
                <span class="text-body-small text-on-surface-variant"> Subtitle </span>
              </v-expansion-panel-title>
              <v-expansion-panel-text>
              <div class="pa-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis
                quis est labore voluptatibus! Eaque cupiditate minima
              </div>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
`,
};
</script>
