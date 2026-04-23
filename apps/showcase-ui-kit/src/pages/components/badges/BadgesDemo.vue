<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Badges</h1>
      <p class="text-grey-darken-1 mt-2">
        Badges are used to generate a small badge on top of its child component, often used to
        communicate numerical information or status updates.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Large (Standard)</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.badgeLarge"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b d-flex justify-center">
            <v-badge content="3">
              <v-icon icon="home"></v-icon>
            </v-badge>
          </div>
        </v-sheet>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Small (Dot)</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.badgeSmall"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b d-flex justify-center">
            <v-badge dot>
              <v-icon icon="settings"></v-icon>
            </v-badge>
          </div>
        </v-sheet>
      </div>

      <div class="text-body-medium mt-4">
        <strong>Developer Note:</strong> The <code><strong>content</strong></code> prop is used to
        display text or numbers inside the badge. For a more minimal look, such as status
        notifications, use the <code><strong>dot</strong></code> attribute to hide the content and
        show a small circle. You can control the badge position using the
        <code><strong>location</strong></code> attribute (e.g., "top end").
      </div>

      <p class="text-body-medium-sb mt-6">
        For more details, refer to the
        <a
          href="https://v3.vuetifyjs.com/en/components/badges/"
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
  badgeLarge: `
<v-badge content="3">
  <v-icon icon="home"></v-icon>
</v-badge>`,

  badgeSmall: `
<v-badge dot>
  <v-icon icon="settings"></v-icon>
</v-badge>`,
};
</script>
