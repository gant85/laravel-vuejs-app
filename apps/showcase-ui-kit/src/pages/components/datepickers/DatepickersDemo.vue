<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Datepickers</h1>
        <v-chip
          class="ml-2"
          color="primary"
          size="small"
          variant="tonal">
          In progress
        </v-chip>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Datepickers is used to select a single or multiple dates.
        <a
          class="text-primary"
          href="https://zeroheight.com/9ced1a3e9/p/82cf84-pickers/b/644b87"
          target="_blank">
          Pickers PILL
        </a>
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Rest state -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Rest</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;DatePicker
  v-model="date"
  label="Label"
  placeholder="MM/DD/YYYY"
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <DatePicker
            v-model="restDate"
            label="Label"
            placeholder="MM/DD/YYYY" />
        </div>
      </div>

      <!-- Disabled state -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Disabled</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;DatePicker
  v-model="date"
  label="Label"
  placeholder="MM/DD/YYYY"
  disabled
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <DatePicker
            v-model="disabledDate"
            label="Label"
            placeholder="MM/DD/YYYY"
            disabled />
        </div>
      </div>

      <!-- Warning state -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Warning</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;DatePicker
  v-model="date"
  label="Label"
  placeholder="MM/DD/YYYY"
  hint="Warn message"
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <DatePicker
            v-model="warnDate"
            label="Label"
            placeholder="MM/DD/YYYY"
            hint="⚠️ Warn message" />
        </div>
      </div>

      <!-- Error state -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Error</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;DatePicker
  v-model="date"
  label="Label"
  placeholder="MM/DD/YYYY"
  :error-messages="errorMessages"
/&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <DatePicker
            v-model="errorDate"
            label="Label"
            placeholder="MM/DD/YYYY"
            :error-messages="errorMessages" />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { DatePicker } from '@reference-app-laravel-vue/ui-kit';

const restDate = ref<Date | null>(null);
const disabledDate = ref<Date | null>(null);
const warnDate = ref<Date | null>(null);
const errorDate = ref<Date | null>(null);

const errorMessages = computed(() => {
  return errorDate.value ? undefined : '❌ Field required';
});
</script>
