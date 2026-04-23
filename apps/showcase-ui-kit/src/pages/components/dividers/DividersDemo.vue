<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Dividers</h1>
      <p class="text-grey-darken-1 mt-2">
        Dividers are used to separate sections of content or group items in lists. They provide a
        clear visual hierarchy using thin lines that can be oriented horizontally or vertically.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Horizontal</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.horizontal"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <div class="text-body-2 mb-4">Content Above</div>
            <v-divider></v-divider>
            <div class="text-body-2 mt-4">Content Below</div>
          </div>
        </v-sheet>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Vertical</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.vertical"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <v-sheet
              height="40"
              class="d-flex justify-center align-center">
              <span class="text-body-2">Section A</span>
              <v-divider
                vertical
                class="mx-4"></v-divider>
              <span class="text-body-2">Section B</span>
            </v-sheet>
          </div>
        </v-sheet>
      </div>

      <div class="text-body-medium mt-4">
        <strong>Developer Note:</strong> By default, <code><strong>v-divider</strong></code> is
        horizontal. To create a vertical divider, add the
        <code><strong>vertical</strong></code> attribute. Note that vertical dividers require a
        parent with a <strong>defined height</strong> or a <strong>flex context</strong> to expand
        properly. You can also use the <code><strong>thickness</strong></code> prop to increase the
        stroke of the line.
      </div>

      <p class="text-body-medium-sb mt-6">
        For more details, refer to the
        <a
          href="https://v3.vuetifyjs.com/en/components/dividers/"
          target="_blank"
          class="text-primary text-decoration-none"
          >Official Vuetify Documentation</a
        >.
      </p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import HighlightedCode from '../../../components/HighlightedCode.vue';

const examples = {
  horizontal: `<v-divider></v-divider>`,

  vertical: `
<v-sheet height="40" class="d-flex align-center">
  <span>Section A</span>
  <v-divider vertical class="mx-4"></v-divider>
  <span>Section B</span>
</v-sheet>`,
};
</script>
