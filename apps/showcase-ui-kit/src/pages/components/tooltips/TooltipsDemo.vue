<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Tooltips</h1>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Tooltips display brief, informational text when a user hovers over or focuses on a UI
        element. Two types are available: <strong>plain</strong> tooltips for short labels and
        <strong>rich</strong> tooltips for structured content with optional title and actions.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Tooltips</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.tooltips"></HighlightedCode>
        </v-sheet>
        <div class="mt-4 d-flex flex-wrap ga-2">
          <v-btn>
            Bottom
            <v-tooltip
              activator="parent"
              location="bottom"
              >Tooltip</v-tooltip
            >
          </v-btn>
        </div>
      </div>
    </div>

    <div class="ml-4">
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">RichTooltips</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.RichTooltips"></HighlightedCode>
        </v-sheet>
        <div class="mt-4 d-flex flex-wrap ga-2">
          <div class="text-center">
            <v-menu
              class="ah-rich-tooltip"
              :open-on-hover="true"
              location="end"
              :close-on-content-click="false">
              <template v-slot:activator="{ props }">
                <v-btn
                  color="primary"
                  v-bind="props">
                  Bottom
                </v-btn>
              </template>
              <v-card width="300">
                <v-card-title>Title</v-card-title>
                <v-card-text>Supporting line text lorem ipsum dolor sit amet </v-card-text>
                <v-card-actions>
                  <v-btn
                    size="small"
                    prepend-icon="stars-filled"
                    variant="text"
                    >Label</v-btn
                  >
                  <v-btn
                    size="small"
                    prepend-icon="stars-filled"
                    variant="text"
                    >Label</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-menu>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import HighlightedCode from '../../../components/HighlightedCode.vue';

const examples = {
  tooltips: `
<v-btn>
  Bottom
  <v-tooltip
    activator="parent"
    location="bottom"
  >Tooltip</v-tooltip>
</v-btn>`,
  RichTooltips: `
    <v-menu class="ah-rich-tooltip"
      :open-on-hover="true"
      location="end"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Bottom </v-btn>
      </template>
      <v-card class="ah-rich-tooltip" width="300">
        <v-card-title>Title</v-card-title>
        <v-card-text
          >Supporting line text lorem ipsum dolor sit amet bla bla</v-card-text
        >
        <v-card-actions>
<v-btn size="small" prepend-icon="stars-filled" variant="text">Label</v-btn>
<v-btn size="small" prepend-icon="stars-filled" variant="text">Label</v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
 `,
};
</script>
