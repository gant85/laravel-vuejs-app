<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Text Fields</h1>
      <p class="text-grey-darken-1 mt-2">
        Text fields let users enter and edit text.
        <a
          class="text-primary"
          href="https://zeroheight.com/9ced1a3e9/v/0/p/41553a-text-fields"
          target="_blank">
          Text Fields PILL
        </a>
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Field -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Field</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-text-field
  label="Label"
  placeholder="Placeholder"
  variant="outlined"
  hint="Hint message"
  persistent-hint
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-text-field
            label="Label"
            placeholder="Placeholder"
            variant="outlined"
            hint="Hint message"
            persistent-hint />
        </div>
      </div>

      <!-- Required Field -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Required Field</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-text-field
  label="Required Field"
  placeholder="Placeholder"
  variant="outlined"
  :rules="[v =&gt; !!v || 'Field required']"
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-text-field
            v-model="requiredField"
            label="Required Field"
            placeholder="Placeholder"
            variant="outlined"
            :rules="[v => !!v || 'Field required']" />
        </div>
      </div>

      <!-- Disabled Field -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Disabled Field</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-text-field
  label="Disabled"
  variant="outlined"
  disabled
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-text-field
            label="Disabled"
            variant="outlined"
            disabled />
        </div>
      </div>

      <!-- With Icon -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">With Icon</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-text-field
  label="Email"
  variant="outlined"
  prepend-inner-icon="mdi-email"
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-text-field
            label="Email"
            variant="outlined"
            prepend-inner-icon="mdi-email" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const requiredField = ref('');
</script>
