<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Input Chips</h1>
      <p class="text-grey-darken-1 mt-2">
        Input chips represent discrete pieces of information entered by the user, such as selected
        items in a text field.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Label Only -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Label Only</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.labelOnly"></HighlightedCode>
        </v-sheet>
        <div class="mt-4 d-flex flex-wrap ga-2">
          <v-chip> Label </v-chip>
        </div>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Use <code><strong>variant="outlined"</strong></code
          >.
        </div>
      </div>

      <!-- Label and Close Icon -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Label and Close Icon</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.labelAndClose"></HighlightedCode>
        </v-sheet>
        <div class="mt-4 d-flex flex-wrap ga-2">
          <v-chip
            closable
            @click:close="chip = false">
            Label
          </v-chip>
        </div>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Add the
          <code><strong>@click:close="chip = false"</strong></code> to add the close icon.
        </div>
      </div>

      <!-- Disabled State -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Disabled State</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.selected"></HighlightedCode>
        </v-sheet>
        <div class="mt-4 d-flex flex-wrap ga-2">
          <v-chip disabled> Disable </v-chip>
        </div>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Add the <code><strong>disabled</strong></code> attribute
          to display the disabled state.
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

const chip = ref(true);

const examples = {
  labelOnly: `
<v-chip>
  Label
</v-chip>`,
  labelAndClose: `
    <v-chip
      closable
      @click:close="chip = false"
    >
      Label
    </v-chip>`,
  selected: `
<!-- Disabled -->
<v-chip
  disabled>
  Disable
</v-chip>`,
};
</script>
