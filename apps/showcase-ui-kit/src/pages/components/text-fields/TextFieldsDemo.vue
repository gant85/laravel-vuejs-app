<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Input fields</h1>
      <p class="text-grey-darken-1 mt-2">
        Input components allow users to enter text and select options. This set includes standard
        text fields, comboboxes for custom tags, and autocompletes for large lists.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Text Fields -->
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Text Fields</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.textFields"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <div class="d-flex ga-4">
              <div class="ah-input-field">
                <v-label>Label</v-label>
                <v-text-field
                  placeholder="placeholder"
                  hint="Supporting text"></v-text-field>
              </div>
              <div class="ah-input-field">
                <v-label>Error field</v-label>
                <v-text-field
                  hint="Supporting text"
                  prepend-inner-icon="search"
                  clearable
                  placeholder="placeholder"
                  :rules="[rules.email]">
                </v-text-field>
              </div>
              <div class="ah-input-field-full">
                <v-label>Disabled field</v-label>
                <v-text-field
                  placeholder="placeholder"
                  hint="Supporting text"
                  prepend-inner-icon="search"
                  clearable
                  disabled
                  v-model="disabledField"></v-text-field>
              </div>
            </div>
          </div>
        </v-sheet>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Inputs are wrapped in a <code>ah-input-field</code> div
          with an external <code>v-label</code>. By default, this container has a
          <code>max-width</code> of 400px to maintain readability. If the field needs to fill the
          entire width of its parent container, apply the <code>ah-input-field-full</code> class.
        </div>
      </div>

      <!-- Dropdown -->
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Dropdown</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.combobox"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <div class="d-flex ga-4">
              <div class="ah-input-field">
                <v-label>Dropdown (Single)</v-label>
                <v-combobox
                  prepend-inner-icon="search"
                  density="compact"
                  placeholder="placeholder"
                  variant="outlined"
                  v-model="dropdown2"
                  :items="['Option 1', 'Option 2', 'Option 3']"
                  clearable
                  hint="Supporting text"
                  persistent-hint></v-combobox>
              </div>
              <div class="ah-input-field">
                <v-label>Dropdown (Multiple & Chips)</v-label>
                <v-combobox
                  prepend-inner-icon="search"
                  density="compact"
                  placeholder="placeholder"
                  variant="outlined"
                  v-model="dropdown1"
                  :items="items"
                  chips
                  clearable
                  closable-chips
                  hint="Supporting text"
                  persistent-hint
                  multiple></v-combobox>
              </div>
            </div>
          </div>
        </v-sheet>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> The <code>v-combobox</code> is ideal for tags or cases
          where the user can enter values not present in the list. Note that the attributes
          <code>density="compact"</code>, <code>variant="outlined"</code>, and
          <code>persistent-hint</code> must be set directly on the component, as they may not be
          correctly inherited if defined globally in the Vuetify defaults.
        </div>
      </div>

      <!-- Autocomplete -->
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Autocomplete</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.autocomplete"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <div class="d-flex flex-column ga-4">
              <div class="ah-input-field">
                <v-label>Autocomplete</v-label>
                <v-autocomplete
                  multiple
                  chips
                  prepend-inner-icon="search"
                  placeholder="placeholder"
                  :items="item2"
                  hint="Supporting text"></v-autocomplete>
              </div>
            </div>
          </div>
        </v-sheet>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Use <code>v-autocomplete</code> for large datasets. It
          filters the items list as the user types. Note that, unlike <code>v-combobox</code>, the
          user <strong>cannot</strong> add custom values that are not present in the provided list.
        </div>
      </div>

      <!-- Datepicker -->
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Datepicker</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.datepicker"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b">
            <div class="d-flex flex-column ga-4">
              <div class="ah-input-field datepicker">
                <v-label>Date picker</v-label>
                <v-date-input
                  v-maska="'##/##/####'"
                  placeholder="DD/MM/YYYY"
                  hint="Supporting text"></v-date-input>
              </div>
            </div>
          </div>
        </v-sheet>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> Use <code>v-date-input</code> to provide a calendar-based
          date selection. To use this component, you must <strong>import </strong>
          <code>VDateInput</code> from the Vuetify <strong>Labs</strong> components. Additionally,
          ensure the
          <a
            href="https://www.npmjs.com/package/maska?activeTab=readme"
            target="_blank"
            class="text-primary text-decoration-none">
            maska
          </a>
          dependency is installed and registered to enable the <code>v-maska</code> directive for
          automatic date formatting.
        </div>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode
            lang="typescript"
            :code="examples.datepickerConfig"></HighlightedCode
        ></v-sheet>
      </div>

      <p class="text-body-medium-sb mt-6">
        For more details on validation, slots, and advanced props, refer to the Official Vuetify
        Documentation:
        <a
          href="https://v3.vuetifyjs.com/en/components/text-fields/"
          target="_blank"
          class="text-primary text-decoration-none">
          Text Fields </a
        >,
        <a
          href="https://v3.vuetifyjs.com/en/components/combobox/"
          target="_blank"
          class="text-primary text-decoration-none">
          Combobox </a
        >,
        <a
          href="https://v3.vuetifyjs.com/en/components/autocompletes/"
          target="_blank"
          class="text-primary text-decoration-none">
          Autocomplete </a
        >.
      </p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

const dropdown1 = ref([]);
const dropdown2 = ref();
const disabledField = ref();

const items = [
  { title: 'Option 1', value: 1 },
  { title: 'Opzion 2', value: 2 },
  { title: 'Option 3 (disabled)', value: 3, props: { disabled: true } },
];

const item2 = [
  { title: 'Option 1', value: 1, props: { subtitle: 'Subtitle 1' } },
  { title: 'Opzion 2', value: 2, props: { subtitle: 'Subtitle 2' } },
  { title: 'Option 3', value: 3, props: { subtitle: 'Subtitle 3' } },
  { title: 'Option 4', value: 4, props: { subtitle: 'Subtitle 4' } },
];

const rules = {
  email: (value: string) => {
    const pattern =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return pattern.test(value) || 'Invalid e-mail.';
  },
};

const examples = {
  textFields: `
<div class="ah-input-field">
  <v-label>Label</v-label>
  <v-text-field placeholder="placeholder" hint="Supporting text"></v-text-field>
</div>

 <div class="ah-input-field">
  <v-label>Error field</v-label>
  <v-text-field
    hint="Supporting text"
    prepend-inner-icon="search"
    clearable
    placeholder="placeholder"
    :rules="[rules.email]">
  </v-text-field>
</div>

<div class="ah-input-field-full">
  <v-label>Disabled field</v-label>
  <v-text-field
    placeholder="placeholder"
    hint="Supporting text"
    prepend-inner-icon="search"
    clearable
    disabled
    v-model="disabledField"></v-text-field>
</div>`,

  combobox: `
<div class="ah-input-field">
  <v-label>Dropdown (Single)</v-label>
  <v-combobox
    prepend-inner-icon="search"
    density="compact"
    placeholder="placeholder"
    variant="outlined"
    v-model="dropdown2"
    :items="['Option 1', 'Option 2', 'Option 3']"
    clearable
    hint="Supporting text"
    persistent-hint></v-combobox>
</div>

<div class="ah-input-field">
  <v-label>Dropdown (Multiple & Chips)</v-label>
  <v-combobox
    prepend-inner-icon="search"
    density="compact"
    placeholder="placeholder"
    variant="outlined"
    v-model="dropdown1"
    :items="items"
    chips
    clearable
    closable-chips
    hint="Supporting text"
    persistent-hint
    multiple></v-combobox>
</div>
`,

  autocomplete: `
<div class="ah-input-field">
  <v-label>Autocomplete</v-label>
  <v-autocomplete
    multiple
    chips
    prepend-inner-icon="search"
    placeholder="placeholder"
    :items="item2"
    hint="Supporting text"></v-autocomplete>
</div>`,

  datepicker: `
<div class="ah-input-field">
  <v-label>Date picker</v-label>
  <v-date-input
    v-maska="'##/##/####'"
    placeholder="DD/MM/YYYY"></v-date-input>
</div>`,

  datepickerConfig: `
import { VDateInput } from 'vuetify/labs/VDateInput'
import { vMaska } from 'maska/vue';

const vuetify = createVuetify({
  components: {
    VDateInput,
  },
  directives: {
    maska: vMaska
  },
  // ... other configs (locale, theme, etc.)
`,
};
</script>

<style lang="scss" scoped>
.datepicker {
  width: 145px;
}
</style>
