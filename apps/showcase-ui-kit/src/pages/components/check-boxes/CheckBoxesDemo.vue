<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Checkboxes</h1>
      <p class="text-grey-darken-1 mt-2">
        Checkboxes allow users to select one or more items from a set, or toggle a single option on
        or off.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Basic States</h3>

        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.basicStates"></HighlightedCode>
          <div class="pa-4 bg-white rounded-b">
            <v-checkbox label="Primary checkbox"></v-checkbox>

            <v-checkbox
              color="error"
              base-color="error"
              label="Error checkbox"></v-checkbox>

            <v-checkbox
              disabled
              v-model="isActive"
              label="Disabled checkbox"></v-checkbox>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> For error states, you must specify both
          <code><strong>color="error"</strong></code> and
          <code><strong>base-color="error"</strong></code>
          attributes to ensure the checkbox maintains the correct theme color in both checked and
          unchecked states.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Select All (Indeterminate)</h3>

        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.selectAll"></HighlightedCode>
          <div class="pa-4 bg-white rounded-b">
            <v-checkbox
              :model-value="allSelected"
              :indeterminate="isIndeterminate"
              label="Select All"
              @click.stop="toggleAll"></v-checkbox>

            <div class="ml-8">
              <v-checkbox
                v-for="item in items"
                :key="item.id"
                v-model="selected"
                :label="item.label"
                :value="item.id"
              ></v-checkbox>
            </div>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> The <code><strong>indeterminate</strong></code> prop is
          used when a checkbox has a partially selected state. In this "Select All" pattern, it is
          calculated based on whether some, but not all, child items are selected.
        </div>
      </div>

      <p class="text-body-medium-sb mt-6">
        For more details, refer to the
        <a
          href="https://v3.vuetifyjs.com/en/components/checkboxes/"
          target="_blank"
          class="text-primary text-decoration-none"
          >Official Vuetify Documentation</a
        >.
      </p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

// Basic states data
const isActive = ref(true);

// Select All logic
const items = [
  { id: 1, label: 'Option 1' },
  { id: 2, label: 'Option 2' },
  { id: 3, label: 'Option 3' },
];

const selected = ref<number[]>([]);

const allSelected = computed(() => {
  return selected.value.length === items.length;
});

const isIndeterminate = computed(() => {
  return selected.value.length > 0 && selected.value.length < items.length;
});

const toggleAll = () => {
  if (allSelected.value) {
    selected.value = [];
  } else {
    selected.value = items.map(item => item.id);
  }
};

// Code examples for the HighlightedCode component
const examples = {
  basicStates: `
<v-checkbox label="Primary checkbox"></v-checkbox>

<v-checkbox
  color="error"
  base-color="error"
  label="Error checkbox"></v-checkbox>

<v-checkbox
  disabled
  v-model="isActive"
  label="Disabled checkbox"></v-checkbox>`,

  selectAll: `
<v-checkbox
  :model-value="allSelected"
  :indeterminate="isIndeterminate"
  label="Select All"
  @click.stop="toggleAll"
></v-checkbox>

<v-checkbox
  v-for="item in items"
  :key="item.id"
  v-model="selected"
  :label="item.label"
  :value="item.id"
></v-checkbox>`,
};
</script>
