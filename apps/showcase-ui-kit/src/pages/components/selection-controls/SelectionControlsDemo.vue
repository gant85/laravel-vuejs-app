<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Selection Controls</h1>
        <v-chip
          class="ml-2"
          color="primary"
          size="small"
          variant="tonal">
          In progress
        </v-chip>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Selection controls allow users to select options.
        <a
          class="text-primary"
          href="https://zeroheight.com/9ced1a3e9/p/505921-selection-controls"
          target="_blank">
          Selection Control PILL
        </a>
      </p>
    </div>

    <h2 class="text-h5 mb-4">Checkboxes</h2>
    <div class="ml-4">
      <!-- Basic Checkboxes -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-checkbox label="Option 1" /&gt;
&lt;v-checkbox label="Option 2" disabled /&gt;
&lt;v-checkbox label="Option 3" v-model="checked" /&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-checkbox label="Option 1" />
          <v-checkbox
            label="Option 2"
            disabled />
          <v-checkbox
            v-model="checked"
            label="Option 3" />
        </div>
      </div>
    </div>

    <h2 class="text-h5 mb-4">Radio Buttons</h2>
    <div class="ml-4">
      <!-- Basic Radio -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-radio-group v-model="radioValue"&gt;
  &lt;v-radio label="Option 1" value="1" /&gt;
  &lt;v-radio label="Option 2" value="2" /&gt;
&lt;/v-radio-group&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-radio-group v-model="radioValue">
            <v-radio
              label="Option 1"
              value="1" />
            <v-radio
              label="Option 2"
              value="2" />
            <v-radio
              label="Option 3"
              value="3" />
          </v-radio-group>
        </div>
      </div>
    </div>

    <h2 class="text-h5 mb-4">Switches</h2>
    <div class="ml-4">
      <!-- Basic Switch -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-switch label="Enable notifications" /&gt;
&lt;v-switch label="Disabled" disabled /&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-switch label="Enable notifications" />
          <v-switch
            label="Disabled"
            disabled />
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const checked = ref(true);
const radioValue = ref('1');
</script>
