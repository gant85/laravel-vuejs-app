<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Drop-downs</h1>
      <p class="text-grey-darken-1 mt-2">
        Drop-downs display a list of choices on temporary surfaces.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Select -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Select</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-select
  label="Select"
  :items="items"
  variant="outlined"
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-select
            v-model="selectedItem"
            label="Select an option"
            :items="items"
            variant="outlined" />
        </div>
      </div>

      <!-- Multiple Select -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Multiple Select</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-select
  label="Multiple"
  :items="items"
  variant="outlined"
  multiple
  chips
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-select
            v-model="selectedItems"
            label="Select multiple"
            :items="items"
            variant="outlined"
            multiple
            chips />
        </div>
      </div>

      <!-- Autocomplete -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Autocomplete</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-autocomplete
  label="Autocomplete"
  :items="items"
  variant="outlined"
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-autocomplete
            v-model="autocompleteValue"
            label="Search and select"
            :items="items"
            variant="outlined" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const items = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
const selectedItem = ref(null);
const selectedItems = ref([]);
const autocompleteValue = ref(null);
</script>
