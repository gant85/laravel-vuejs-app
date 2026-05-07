Ecco la struttura della documentazione per i pulsanti, seguendo fedelmente il template che hai
fornito. Snippet di codice
<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Buttons</h1>
      <p class="text-grey-darken-1 mt-2">
        The <code>v-btn</code> component is used to trigger an action or event. It supports
        different variants, sizes, and the addition of icons to provide a clear visual hierarchy.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Primary (Flat)</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.primaryButtons"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <div class="d-flex ga-2 align-center justify-center flex-wrap">
              <v-btn
                size="small"
                prepend-icon="stars-filled"
                >Small</v-btn
              >
              <v-btn prepend-icon="stars-filled">Default</v-btn>
              <v-btn
                size="large"
                prepend-icon="stars-filled"
                >Large</v-btn
              >
              <v-btn
                disabled
                size="large"
                prepend-icon="stars-filled"
                >Disabled</v-btn
              >
            </div>
          </div>
        </v-sheet>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Primary buttons are the default state. Use them for the
          main action of a page. The <code>prepend-icon</code> prop adds an icon before the button
          text.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Secondary (Outlined)</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.secondaryButtons"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <div class="d-flex ga-2 align-center justify-center flex-wrap">
              <v-btn
                size="small"
                prepend-icon="stars-filled"
                variant="outlined"
                >Small</v-btn
              >
              <v-btn
                prepend-icon="stars-filled"
                variant="outlined"
                >Default</v-btn
              >
              <v-btn
                size="large"
                prepend-icon="stars-filled"
                variant="outlined"
                >Large</v-btn
              >
              <v-btn
                disabled
                size="large"
                prepend-icon="stars-filled"
                variant="outlined"
                >Disabled</v-btn
              >
            </div>
          </div>
        </v-sheet>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Use the <code>variant="outlined"</code> for secondary
          actions that require less visual prominence than the primary button.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Tertiary (Text)</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.tertiaryButtons"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <div class="d-flex ga-2 align-center justify-center flex-wrap">
              <v-btn
                size="small"
                prepend-icon="stars-filled"
                variant="text"
                >Small</v-btn
              >
              <v-btn
                prepend-icon="stars-filled"
                variant="text"
                >Default</v-btn
              >
              <v-btn
                size="large"
                prepend-icon="stars-filled"
                variant="text"
                >Large</v-btn
              >
              <v-btn
                disabled
                size="large"
                prepend-icon="stars-filled"
                variant="text"
                >Disabled</v-btn
              >
            </div>
          </div>
        </v-sheet>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> The <code>variant="text"</code> (Tertiary) is ideal for
          low-emphasis actions, such as "Cancel" buttons or items inside navigation bars.
        </div>
      </div>

      <p class="text-body-medium-sb mt-6">
        For more details on props like density, ripples, and loader states, refer to the
        <a
          href="https://v3.vuetifyjs.com/en/components/buttons/"
          target="_blank"
          class="text-primary text-decoration-none">
          Official Vuetify Documentation </a
        >.
      </p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import HighlightedCode from '../../../components/HighlightedCode.vue';

const examples = {
  primaryButtons: `
<v-btn size="small" prepend-icon="stars-filled">Small</v-btn>
<v-btn prepend-icon="stars-filled">Default</v-btn>
<v-btn size="large" prepend-icon="stars-filled">Large</v-btn>
<v-btn disabled size="large" prepend-icon="stars-filled">Disabled</v-btn>`,

  secondaryButtons: `
<v-btn size="small" prepend-icon="stars-filled" variant="outlined">Small</v-btn>
<v-btn prepend-icon="stars-filled" variant="outlined">Default</v-btn>
<v-btn size="large" prepend-icon="stars-filled" variant="outlined">Large</v-btn>
<v-btn disabled size="large" prepend-icon="stars-filled" variant="outlined">Disabled</v-btn>`,

  tertiaryButtons: `
<v-btn size="small" prepend-icon="stars-filled" variant="text">Small</v-btn>
<v-btn prepend-icon="stars-filled" variant="text">Default</v-btn>
<v-btn size="large" prepend-icon="stars-filled" variant="text">Large</v-btn>
<v-btn disabled size="large" prepend-icon="stars-filled" variant="text">Disabled</v-btn>`,
};
</script>
