<template>
  <v-container>
    <!-- ================================================================ -->
    <!--  HEADER                                                           -->
    <!-- ================================================================ -->
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Switch</h1>
      <p class="text-grey-darken-1 mt-2">
        Switches toggle a single setting on or off. They support an optional label with a required
        indicator. The track is 40 × 20 px with a 14 × 14 px handle, matching the MD3 spec.
      </p>
    </div>

    <!-- ================================================================ -->
    <!--  ANATOMY                                                          -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Anatomy</h2>

    <v-row class="mb-12">
      <!-- Switch anatomy -->
      <v-col
        cols="12"
        md="6">
        <p class="text-subtitle-2 font-weight-bold mb-2">Switch</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="switch-anatomy-panel">
            <Switch />
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Switch track</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption"
              >Height: 20px · Width: 40px · Border radius: 100px</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >State layer (target)</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption"
              >Height: 30px · Width: 30px</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Handle shape</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption"
              >Height: 14px · Width: 14px · Border radius: 24px</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </v-col>

      <!-- Switch with label anatomy -->
      <v-col
        cols="12"
        md="6">
        <p class="text-subtitle-2 font-weight-bold mb-2">Switch with label</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="switch-anatomy-panel">
            <Switch
              label="Label"
              :model-value="true"
              required />
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Switch</v-list-item-title>
            <v-list-item-subtitle class="text-caption"
              >Depends on Switch component</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Label after</v-list-item-title>
            <v-list-item-subtitle class="text-caption">Item spacing: 4px</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Label</v-list-item-title>
            <v-list-item-subtitle class="text-caption"
              >Text color: on-surface · Text style: AH/label/large</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Required asterisk</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption"
              >Text color: error · Text style: AH/label/large-bd</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  STATE                                                            -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">State</h2>

    <v-row class="mb-12">
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Enabled</h3>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="switch-anatomy-panel">
            <Switch
              label="Label"
              :model-value="true"
              required />
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Switch</v-list-item-title>
            <v-list-item-subtitle class="text-caption">State: Enabled</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Label after</v-list-item-title>
            <v-list-item-subtitle class="text-caption">Opacity: 100%</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>

      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Disabled</h3>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="switch-anatomy-panel">
            <Switch
              label="Label"
              :model-value="true"
              required
              disabled />
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Switch</v-list-item-title>
            <v-list-item-subtitle class="text-caption">State: Disabled</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Label after</v-list-item-title>
            <v-list-item-subtitle class="text-caption">Opacity: 38%</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  PROPERTIES — ACTIVE ON                                           -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Properties — State: active on</h2>

    <v-row class="mb-12">
      <v-col
        v-for="s in activeOnStates"
        :key="s.label"
        cols="12"
        md="3">
        <h3 class="text-h6 font-weight-bold mb-4">{{ s.label }}</h3>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="switch-anatomy-panel">
            <div
              :class="[
                'switch-state-preview',
                'switch-state-preview--on',
                `switch-state-preview--${s.previewState}`,
              ]">
              <Switch
                :model-value="true"
                :disabled="s.disabled" />
            </div>
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Switch</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Background:
              <v-chip
                size="x-small"
                variant="outlined"
                label
                >{{ s.trackBg }}</v-chip
              >
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="s.stateLayer">
            <v-list-item-title class="text-caption font-weight-bold">State layer</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Background:
              <v-chip
                size="x-small"
                variant="outlined"
                label
                >{{ s.stateLayer }}</v-chip
              >
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Handle shape</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">
              Background:
              <v-chip
                size="x-small"
                variant="outlined"
                label
                >{{ s.handleBg }}</v-chip
              >
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  PROPERTIES — ACTIVE OFF                                          -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Properties — State: active off</h2>

    <v-row class="mb-12">
      <v-col
        v-for="s in activeOffStates"
        :key="s.label"
        cols="12"
        md="3">
        <h3 class="text-h6 font-weight-bold mb-4">{{ s.label }}</h3>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="switch-anatomy-panel">
            <div
              :class="[
                'switch-state-preview',
                'switch-state-preview--off',
                `switch-state-preview--${s.previewState}`,
              ]">
              <Switch
                :model-value="false"
                :disabled="s.disabled" />
            </div>
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Switch</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Background:
              <v-chip
                size="x-small"
                variant="outlined"
                label
                >{{ s.trackBg }}</v-chip
              >
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Border:
              <v-chip
                size="x-small"
                variant="outlined"
                label
                >{{ s.trackBorder }}</v-chip
              >
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-if="s.stateLayer">
            <v-list-item-title class="text-caption font-weight-bold">State layer</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Background:
              <v-chip
                size="x-small"
                variant="outlined"
                label
                >{{ s.stateLayer }}</v-chip
              >
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Handle shape</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">
              Background:
              <v-chip
                size="x-small"
                variant="outlined"
                label
                >{{ s.handleBg }}</v-chip
              >
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  LAYOUT AND SPACING                                               -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Layout and spacing</h2>

    <v-row class="mb-12">
      <!-- Switch with label -->
      <v-col
        cols="12"
        md="6">
        <p class="text-subtitle-2 font-weight-bold mb-2">Switch with label</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="switch-ls-row">
            <div class="switch-ls-visual">
              <Switch
                label="Label"
                :model-value="true"
                required />
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">Switch with label</div>
              <table class="switch-spec-table">
                <tr>
                  <td>Vertical resizing</td>
                  <td>Hug</td>
                </tr>
                <tr>
                  <td>Horizontal resizing</td>
                  <td>Hug</td>
                </tr>
                <tr>
                  <td>Padding</td>
                  <td>4px</td>
                </tr>
              </table>
              <div class="font-weight-bold mt-3 mb-2">Label after</div>
              <table class="switch-spec-table">
                <tr>
                  <td>Item spacing</td>
                  <td>4px</td>
                </tr>
              </table>
            </div>
          </div>
        </v-sheet>
      </v-col>

      <!-- Switch track -->
      <v-col
        cols="12"
        md="6">
        <p class="text-subtitle-2 font-weight-bold mb-2">Switch track</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="switch-ls-row">
            <div class="switch-ls-visual">
              <Switch :model-value="false" />
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">Switch</div>
              <table class="switch-spec-table">
                <tr>
                  <td>Width</td>
                  <td>40px</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>20px</td>
                </tr>
                <tr>
                  <td>Border radius</td>
                  <td>100px</td>
                </tr>
              </table>
              <div class="font-weight-bold mt-3 mb-2">Handle shape</div>
              <table class="switch-spec-table">
                <tr>
                  <td>Width</td>
                  <td>14px</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>14px</td>
                </tr>
                <tr>
                  <td>Border radius</td>
                  <td>24px</td>
                </tr>
              </table>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  ALL VARIANTS                                                     -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">All variants</h2>

    <v-sheet
      class="pa-6 mb-12"
      border
      rounded="lg">
      <!-- Active on row -->
      <p class="text-subtitle-2 font-weight-bold mb-3">Active on</p>
      <div class="d-flex align-center ga-6 mb-4 flex-wrap">
        <Switch :model-value="true" />
        <Switch
          :model-value="true"
          disabled />
      </div>

      <v-divider class="my-4" />

      <!-- Active off row -->
      <p class="text-subtitle-2 font-weight-bold mb-3">Active off</p>
      <div class="d-flex align-center ga-6 mb-4 flex-wrap">
        <Switch :model-value="false" />
        <Switch
          :model-value="false"
          disabled />
      </div>

      <v-divider class="my-4" />

      <!-- With label row -->
      <p class="text-subtitle-2 font-weight-bold mb-3">Switch with label</p>
      <div class="d-flex flex-column ga-3 align-start">
        <Switch
          label="Label"
          :model-value="true"
          required />
        <Switch
          label="Label"
          :model-value="false"
          required
          disabled />
      </div>
    </v-sheet>

    <!-- ================================================================ -->
    <!--  LIVE EXAMPLES                                                    -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Examples</h2>

    <v-row class="mb-12">
      <!-- Basic toggle -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Basic toggle</h3>
        <CodeExample :code="examples.basicToggle">
          <div class="d-flex align-center ga-6 pa-6 flex-wrap">
            <Switch
              v-model="demoOn"
              label="Notifications" />
          </div>
        </CodeExample>
      </v-col>

      <!-- Required switch -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Required field</h3>
        <CodeExample :code="examples.requiredSwitch">
          <div class="d-flex align-center ga-6 pa-6 flex-wrap">
            <Switch
              v-model="demoRequired"
              label="I agree to the terms"
              required />
          </div>
        </CodeExample>
      </v-col>
    </v-row>

    <v-row class="mb-12">
      <!-- Without label -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Without label</h3>
        <CodeExample :code="examples.noLabel">
          <div class="d-flex align-center ga-6 pa-6 flex-wrap">
            <Switch v-model="demoPlain" />
          </div>
        </CodeExample>
      </v-col>

      <!-- Disabled states -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Disabled</h3>
        <CodeExample :code="examples.disabled">
          <div class="d-flex flex-column ga-4 align-start pa-6">
            <Switch
              :model-value="true"
              label="Enabled (on)"
              disabled />
            <Switch
              :model-value="false"
              label="Enabled (off)"
              disabled />
          </div>
        </CodeExample>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  API REFERENCE                                                    -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-4">API Reference</h2>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">Props</h3>
    <v-table
      density="compact"
      class="mb-8 api-table">
      <thead>
        <tr>
          <th class="text-left">Prop</th>
          <th class="text-left">Type</th>
          <th class="text-left">Default</th>
          <th class="text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>label</code></td>
          <td><code>string</code></td>
          <td><code>undefined</code></td>
          <td>Label text displayed next to the switch.</td>
        </tr>
        <tr>
          <td><code>required</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>When true, shows a red required asterisk after the label.</td>
        </tr>
        <tr>
          <td><code>modelValue</code></td>
          <td><code>boolean</code></td>
          <td><code>undefined</code></td>
          <td>Controlled value (v-model). Forwarded to the underlying <code>v-switch</code>.</td>
        </tr>
        <tr>
          <td><code>disabled</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>
            Disables the switch interaction. Forwarded to the underlying <code>v-switch</code>.
          </td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">Color tokens</h3>
    <v-table
      density="compact"
      class="mb-8 api-table">
      <thead>
        <tr>
          <th class="text-left">State</th>
          <th class="text-left">Track background</th>
          <th class="text-left">Track border</th>
          <th class="text-left">Handle background</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="row in colorTokenRows"
          :key="row.state">
          <td>{{ row.state }}</td>
          <td>
            <v-chip
              size="x-small"
              variant="outlined"
              label
              >{{ row.trackBg }}</v-chip
            >
          </td>
          <td>
            <v-chip
              v-if="row.trackBorder"
              size="x-small"
              variant="outlined"
              label
              >{{ row.trackBorder }}</v-chip
            >
            <span v-else>—</span>
          </td>
          <td>
            <v-chip
              size="x-small"
              variant="outlined"
              label
              >{{ row.handleBg }}</v-chip
            >
          </td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">Dimensions</h3>
    <v-table
      density="compact"
      class="mb-8 api-table">
      <thead>
        <tr>
          <th class="text-left">Element</th>
          <th class="text-left">Width</th>
          <th class="text-left">Height</th>
          <th class="text-left">Border radius</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Track</td>
          <td>40px</td>
          <td>20px</td>
          <td>100px</td>
        </tr>
        <tr>
          <td>Handle shape</td>
          <td>14px</td>
          <td>14px</td>
          <td>24px</td>
        </tr>
        <tr>
          <td>State layer (target)</td>
          <td>30px</td>
          <td>30px</td>
          <td>—</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Switch } from '@reference-app-laravel-vue/ui-kit';
import CodeExample from '../../../components/CodeExample.vue';

/* ------------------------------------------------------------------ */
/*  Interactive demo state                                              */
/* ------------------------------------------------------------------ */
const demoOn = ref(true);
const demoRequired = ref(false);
const demoPlain = ref(true);

/* ------------------------------------------------------------------ */
/*  State data — active on                                             */
/* ------------------------------------------------------------------ */
interface SwitchStateEntry {
  label: string;
  previewState: 'enabled' | 'hovered' | 'pressed' | 'disabled';
  disabled: boolean;
  trackBg: string;
  trackBorder?: string;
  stateLayer?: string;
  handleBg: string;
}

const activeOnStates: SwitchStateEntry[] = [
  {
    label: 'Enabled',
    previewState: 'enabled',
    disabled: false,
    trackBg: 'primary',
    handleBg: 'on-primary',
  },
  {
    label: 'Hovered',
    previewState: 'hovered',
    disabled: false,
    trackBg: 'primary',
    stateLayer: 'surface-tint-14',
    handleBg: 'inverse-primary',
  },
  {
    label: 'Pressed',
    previewState: 'pressed',
    disabled: false,
    trackBg: 'primary',
    stateLayer: 'surface-tint-16',
    handleBg: 'inverse-primary',
  },
  {
    label: 'Disabled',
    previewState: 'disabled',
    disabled: true,
    trackBg: 'surface-container-highest',
    trackBorder: 'outline-variant',
    handleBg: 'on-primary',
  },
];

/* ------------------------------------------------------------------ */
/*  State data — active off                                            */
/* ------------------------------------------------------------------ */
const activeOffStates: SwitchStateEntry[] = [
  {
    label: 'Enabled',
    previewState: 'enabled',
    disabled: false,
    trackBg: 'surface-container',
    trackBorder: 'outline',
    handleBg: 'on-primary',
  },
  {
    label: 'Hovered',
    previewState: 'hovered',
    disabled: false,
    trackBg: 'surface-container',
    trackBorder: 'outline',
    stateLayer: 'on-surface-16',
    handleBg: 'on-surface',
  },
  {
    label: 'Pressed',
    previewState: 'pressed',
    disabled: false,
    trackBg: 'surface-container',
    trackBorder: 'outline',
    stateLayer: 'on-surface-16',
    handleBg: 'on-surface',
  },
  {
    label: 'Disabled',
    previewState: 'disabled',
    disabled: true,
    trackBg: 'surface-container-highest',
    trackBorder: 'outline-variant',
    handleBg: 'on-surface-variant',
  },
];

/* ------------------------------------------------------------------ */
/*  Color token table                                                   */
/* ------------------------------------------------------------------ */
interface ColorTokenRow {
  state: string;
  trackBg: string;
  trackBorder?: string;
  handleBg: string;
}

const colorTokenRows: ColorTokenRow[] = [
  { state: 'Active on — enabled', trackBg: 'primary', handleBg: 'on-primary' },
  {
    state: 'Active on — disabled',
    trackBg: 'surface-container-highest',
    trackBorder: 'outline-variant',
    handleBg: 'on-primary',
  },
  {
    state: 'Active off — enabled',
    trackBg: 'surface-container',
    trackBorder: 'outline',
    handleBg: 'on-primary',
  },
  {
    state: 'Active off — disabled',
    trackBg: 'surface-container-highest',
    trackBorder: 'outline-variant',
    handleBg: 'on-surface-variant',
  },
];

/* ------------------------------------------------------------------ */
/*  Code strings                                                        */
/* ------------------------------------------------------------------ */
const examples = {
  basicToggle: `<Switch v-model="notificationsEnabled" label="Notifications" />`,

  requiredSwitch: `<Switch
  v-model="agreedToTerms"
  label="I agree to the terms"
  required
/>`,

  noLabel: `<Switch v-model="value" />`,

  disabled: `<Switch :model-value="true" label="Enabled (on)" disabled />
<Switch :model-value="false" label="Enabled (off)" disabled />`,
};
</script>

<style scoped>
.text-no-wrap {
  white-space: nowrap;
}

/* API reference tables */
.api-table :deep(td),
.api-table :deep(th) {
  white-space: nowrap;
}

.api-table :deep(td:last-child) {
  white-space: normal;
}

/* ── Anatomy panel ────────────────────────────────────────────────── */
.switch-anatomy-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110px;
  padding: 24px;
  background-color: #f5f5f5;
}

.switch-state-preview {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 30px;
  overflow: visible;
}

.switch-state-preview::before {
  position: absolute;
  top: 0;
  width: 30px;
  height: 30px;
  content: '';
  border-radius: 50%;
  opacity: 0;
}

.switch-state-preview--off::before {
  left: -5px;
}

.switch-state-preview--on::before {
  left: 15px;
}

.switch-state-preview--hovered.switch-state-preview--on::before {
  background-color: #d0e4ff;
  opacity: 1;
}

.switch-state-preview--pressed.switch-state-preview--on::before {
  background-color: #bfd7f6;
  opacity: 1;
}

.switch-state-preview--hovered.switch-state-preview--off::before {
  background-color: #e1e2e6;
  opacity: 1;
}

.switch-state-preview--pressed.switch-state-preview--off::before {
  background-color: #d2d4d8;
  opacity: 1;
}

.switch-state-preview :deep(.ui-switch) {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  height: 30px;
}

.switch-state-preview :deep(.v-input__control) {
  display: flex;
  align-items: center;
  height: 30px;
}

.switch-state-preview :deep(.v-selection-control) {
  height: 30px;
  min-height: 30px;
}

.switch-state-preview :deep(.v-selection-control__wrapper) {
  height: 30px;
}

.switch-state-preview :deep(.v-selection-control__input) {
  top: -5px;
}

.switch-state-preview :deep(.v-input__details) {
  display: none;
}

/* ── Layout and spacing ───────────────────────────────────────────── */
.switch-ls-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.switch-ls-visual {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  min-height: 60px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.switch-spec-table {
  border-collapse: collapse;
}

.switch-spec-table td {
  padding: 2px 12px 2px 0;
  vertical-align: top;
}

.switch-spec-table td:first-child {
  color: #757575;
  white-space: nowrap;
}
</style>
