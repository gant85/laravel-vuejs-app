<template>
  <v-container>
    <!-- Header -->
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Labels</h1>
      <p class="text-grey-darken-1 mt-2">
        Labels are compact tag-like elements used to convey status, category, or metadata. They
        support 4 sizes, 3 visual appearances (filled, tint, subtle), 6 semantic colors, and an
        optional leading icon.
      </p>
    </div>

    <!-- ================================================================ -->
    <!--  ANATOMY                                                          -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Anatomy</h2>

    <v-row class="mb-12">
      <v-col
        cols="12"
        md="4">
        <p class="text-subtitle-2 font-weight-bold mb-2">Anatomy</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="label-anatomy-panel">
            <Label
              text="Label"
              color="brand"
              icon="star"
              size="large" />
          </div>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="8">
        <v-list
          density="compact"
          class="text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Labels component</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">Border radius: 2px</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Icon</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Property type:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                Boolean
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Text</v-list-item-title>
            <v-list-item-subtitle class="text-caption">Label text content</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  SIZE                                                             -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Size</h2>

    <v-row class="mb-12">
      <v-col
        v-for="s in sizeEntries"
        :key="s.value"
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">{{ s.label }}</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Preview</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="label-anatomy-panel">
            <Label
              text="Label"
              color="brand"
              icon="star"
              :size="s.value" />
          </div>
        </v-sheet>

        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Labels container</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption"
              >Height: {{ s.height }}px</v-list-item-subtitle
            >
            <v-list-item-subtitle class="text-caption"
              >Min width: {{ s.height }}px</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Text offset</v-list-item-title>
            <v-list-item-subtitle class="text-caption"
              >Height: {{ s.textOffsetHeight }}px</v-list-item-subtitle
            >
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Text style</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                {{ s.textStyle }}
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="label-ls-row">
            <div class="label-ls-visual">
              <Label
                text="Label"
                color="brand"
                icon="star"
                :size="s.value" />
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">&#9671; Labels</div>
              <table class="label-spec-table">
                <tr>
                  <td>Padding left</td>
                  <td>{{ s.padding }}px</td>
                </tr>
                <tr>
                  <td>Padding right</td>
                  <td>{{ s.padding }}px</td>
                </tr>
                <tr v-if="s.itemSpacing !== undefined">
                  <td>Item spacing</td>
                  <td>{{ s.itemSpacing }}px</td>
                </tr>
              </table>
            </div>
          </div>
        </v-sheet>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="sizeUsageCode[s.value]" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  APPEARANCE                                                       -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Appearance</h2>

    <v-row class="mb-12">
      <v-col
        v-for="app in appearanceEntries"
        :key="app.value"
        cols="12"
        md="4">
        <h3 class="text-h6 font-weight-bold mb-4">{{ app.label }}</h3>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="label-anatomy-panel">
            <Label
              text="Label"
              color="brand"
              icon="star"
              :appearance="app.value"
              size="large" />
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">{{
              app.label
            }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption">{{ app.description }}</v-list-item-subtitle>
            <v-list-item-subtitle
              v-if="app.border"
              class="text-caption"
              >Border weight: {{ app.border }}</v-list-item-subtitle
            >
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  COLORS                                                           -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Colors</h2>

    <v-row class="mb-12">
      <v-col
        v-for="c in colorEntries"
        :key="c.value"
        cols="12"
        md="4">
        <h3 class="text-h6 font-weight-bold mb-4">{{ c.label }}</h3>
        <v-sheet
          class="pa-4"
          border
          rounded="lg">
          <div class="d-flex flex-column align-start ga-2 mb-4">
            <Label
              :text="c.label"
              :color="c.value"
              appearance="filled"
              icon="star" />
            <Label
              :text="c.label"
              :color="c.value"
              appearance="tint"
              icon="star" />
            <Label
              :text="c.label"
              :color="c.value"
              appearance="subtle"
              icon="star" />
          </div>
          <table class="label-spec-table text-caption">
            <tr>
              <td>Background color Filled:</td>
              <td>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label>
                  {{ c.tokens.bgFilled }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <td>Text / Icon color Filled:</td>
              <td>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label>
                  {{ c.tokens.textFilled }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <td>Background color Tint:</td>
              <td>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label>
                  {{ c.tokens.bgTint }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <td>Text / Icon color Tint:</td>
              <td>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label>
                  {{ c.tokens.textTint }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <td>Background color Subtle:</td>
              <td>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label>
                  {{ c.tokens.bgSubtle }}
                </v-chip>
              </td>
            </tr>
            <tr>
              <td>Text / Icon color Subtle:</td>
              <td>
                <v-chip
                  size="x-small"
                  variant="outlined"
                  label>
                  {{ c.tokens.textSubtle }}
                </v-chip>
              </td>
            </tr>
          </table>
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
      <template
        v-for="c in colorEntries"
        :key="c.value">
        <p class="text-subtitle-2 font-weight-bold mb-3">{{ c.label }}</p>
        <div
          v-for="s in sizeValues"
          :key="`${c.value}-${s}`"
          class="d-flex align-center ga-4 mb-2">
          <Label
            v-for="a in appearanceValues"
            :key="a"
            :text="c.label"
            :color="c.value"
            :size="s"
            :appearance="a"
            icon="star" />
        </div>
        <v-divider
          v-if="c.value !== 'info'"
          class="my-4" />
      </template>
    </v-sheet>

    <!-- ================================================================ -->
    <!--  LIVE EXAMPLES                                                    -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Examples</h2>

    <v-row class="mb-12">
      <!-- All sizes -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">All sizes</h3>
        <CodeExample :code="examples.liveSizes">
          <div class="d-flex align-center ga-4 pa-6 flex-wrap">
            <Label
              text="Extra Large"
              size="extra-large"
              color="brand"
              icon="star" />
            <Label
              text="Large"
              size="large"
              color="brand"
              icon="star" />
            <Label
              text="Medium"
              size="medium"
              color="brand"
              icon="star" />
            <Label
              text="Small"
              size="small"
              color="brand"
              icon="star" />
          </div>
        </CodeExample>
      </v-col>

      <!-- All appearances -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Appearances</h3>
        <CodeExample :code="examples.liveAppearances">
          <div class="d-flex align-center ga-4 pa-6 flex-wrap">
            <Label
              text="Filled"
              appearance="filled"
              color="brand"
              icon="star" />
            <Label
              text="Tint"
              appearance="tint"
              color="brand"
              icon="star" />
            <Label
              text="Subtle"
              appearance="subtle"
              color="brand"
              icon="star" />
          </div>
        </CodeExample>
      </v-col>
    </v-row>

    <v-row class="mb-12">
      <!-- All colors (filled) -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Color palette</h3>
        <CodeExample :code="examples.liveColors">
          <div class="d-flex align-center ga-4 pa-6 flex-wrap">
            <Label
              text="Brand"
              color="brand"
              icon="star" />
            <Label
              text="Error"
              color="error"
              icon="star" />
            <Label
              text="Warning"
              color="warning"
              icon="star" />
            <Label
              text="Success"
              color="success"
              icon="star" />
            <Label
              text="Important"
              color="important"
              icon="star" />
            <Label
              text="Info"
              color="info"
              icon="star" />
          </div>
        </CodeExample>
      </v-col>

      <!-- Without icon -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Without icon</h3>
        <CodeExample :code="examples.liveNoIcon">
          <div class="d-flex align-center ga-4 pa-6 flex-wrap">
            <Label
              text="Status"
              color="success" />
            <Label
              text="Draft"
              color="important"
              appearance="tint" />
            <Label
              text="Archived"
              color="brand"
              appearance="subtle" />
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
          <td><code>text</code></td>
          <td><code>string</code></td>
          <td><code>undefined</code></td>
          <td>Label text content. Can also be provided via the default slot.</td>
        </tr>
        <tr>
          <td><code>size</code></td>
          <td><code class="text-no-wrap">LabelSize</code></td>
          <td><code class="text-no-wrap">'medium'</code></td>
          <td>
            Component size:
            <code>'extra-large'</code> | <code>'large'</code> | <code>'medium'</code> |
            <code>'small'</code>.
          </td>
        </tr>
        <tr>
          <td><code>appearance</code></td>
          <td><code class="text-no-wrap">LabelAppearance</code></td>
          <td><code class="text-no-wrap">'filled'</code></td>
          <td>
            Visual variant: <code>'filled'</code> (solid bg) | <code>'tint'</code> (container bg +
            border) | <code>'subtle'</code> (text only).
          </td>
        </tr>
        <tr>
          <td><code>color</code></td>
          <td><code class="text-no-wrap">LabelColor</code></td>
          <td><code class="text-no-wrap">'brand'</code></td>
          <td>
            Semantic color: <code>'brand'</code> | <code>'error'</code> | <code>'warning'</code> |
            <code>'success'</code> | <code>'important'</code> | <code>'info'</code>.
          </td>
        </tr>
        <tr>
          <td><code>icon</code></td>
          <td><code>string</code></td>
          <td><code>undefined</code></td>
          <td>Material Symbols icon name displayed before the text.</td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">Size specifications</h3>
    <v-table
      density="compact"
      class="mb-8 api-table">
      <thead>
        <tr>
          <th class="text-left">Size</th>
          <th class="text-left">Height</th>
          <th class="text-left">Min width</th>
          <th class="text-left">Padding</th>
          <th class="text-left">Text style</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>extra-large</code></td>
          <td>32 px</td>
          <td>32 px</td>
          <td>0 4 px</td>
          <td>label / medium-sb</td>
        </tr>
        <tr>
          <td><code>large</code></td>
          <td>24 px</td>
          <td>24 px</td>
          <td>0 4 px</td>
          <td>label / medium-sb</td>
        </tr>
        <tr>
          <td><code>medium</code></td>
          <td>20 px</td>
          <td>20 px</td>
          <td>0 4 px</td>
          <td>label / extra-small-sb</td>
        </tr>
        <tr>
          <td><code>small</code></td>
          <td>16 px</td>
          <td>16 px</td>
          <td>0 2 px</td>
          <td>label / extra-small-sb</td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">Color tokens</h3>
    <v-table
      density="compact"
      class="mb-8 api-table">
      <thead>
        <tr>
          <th class="text-left">Color</th>
          <th class="text-left">Filled bg</th>
          <th class="text-left">Tint bg</th>
          <th class="text-left">Text / Icon</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="c in colorEntries"
          :key="c.value">
          <td>
            <code>{{ c.value }}</code>
          </td>
          <td>{{ c.tokens.bgFilled }}</td>
          <td>{{ c.tokens.bgTint }}</td>
          <td>{{ c.tokens.textFilled }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { Label } from '@reference-app-laravel-vue/ui-kit';
import type { LabelAppearance, LabelColor, LabelSize } from '@reference-app-laravel-vue/ui-kit';
import CodeExample from '../../../components/CodeExample.vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

/* ------------------------------------------------------------------ */
/*  Size data                                                           */
/* ------------------------------------------------------------------ */
interface SizeEntry {
  value: LabelSize;
  label: string;
  height: number;
  textOffsetHeight: number;
  textStyle: string;
  padding: number;
  itemSpacing?: number;
}

const sizeEntries: SizeEntry[] = [
  {
    value: 'extra-large',
    label: 'Extra large',
    height: 32,
    textOffsetHeight: 16,
    textStyle: 'AH/label/medium-sb',
    padding: 4,
  },
  {
    value: 'large',
    label: 'Large',
    height: 24,
    textOffsetHeight: 16,
    textStyle: 'AH/label/medium-sb',
    padding: 4,
    itemSpacing: 2,
  },
  {
    value: 'medium',
    label: 'Medium',
    height: 20,
    textOffsetHeight: 14,
    textStyle: 'AH/label/extra-small-sb',
    padding: 4,
  },
  {
    value: 'small',
    label: 'Small',
    height: 16,
    textOffsetHeight: 14,
    textStyle: 'AH/label/extra-small-sb',
    padding: 2,
  },
];

const sizeUsageCode: Record<LabelSize, string> = {
  'extra-large': '<Label text="Status" size="extra-large" icon="star" />',
  large: '<Label text="Status" size="large" icon="star" />',
  medium: '<Label text="Status" icon="star" />',
  small: '<Label text="Status" size="small" icon="star" />',
};

/* ------------------------------------------------------------------ */
/*  Appearance data                                                     */
/* ------------------------------------------------------------------ */
interface AppearanceEntry {
  value: LabelAppearance;
  label: string;
  description: string;
  border?: string;
}

const appearanceEntries: AppearanceEntry[] = [
  {
    value: 'filled',
    label: 'Filled',
    description: 'Solid background with contrasting text. Highest visual emphasis.',
  },
  {
    value: 'tint',
    label: 'Tint',
    description: 'Lighter container background with colored text and 1px border.',
    border: '1px',
  },
  {
    value: 'subtle',
    label: 'Subtle',
    description: 'No background. Colored text only. Lowest visual emphasis.',
  },
];

/* ------------------------------------------------------------------ */
/*  Color data                                                          */
/* ------------------------------------------------------------------ */
interface ColorEntry {
  value: LabelColor;
  label: string;
  tokens: {
    bgFilled: string;
    textFilled: string;
    bgTint: string;
    textTint: string;
    bgSubtle: string;
    textSubtle: string;
  };
}

const colorEntries: ColorEntry[] = [
  {
    value: 'brand',
    label: 'Brand',
    tokens: {
      bgFilled: 'primary',
      textFilled: 'primary',
      bgTint: 'primary-container',
      textTint: 'primary',
      bgSubtle: '---',
      textSubtle: 'primary',
    },
  },
  {
    value: 'error',
    label: 'Error',
    tokens: {
      bgFilled: 'error',
      textFilled: 'error',
      bgTint: 'error-container',
      textTint: 'error',
      bgSubtle: '---',
      textSubtle: 'error',
    },
  },
  {
    value: 'warning',
    label: 'Warning',
    tokens: {
      bgFilled: 'warning',
      textFilled: 'warning',
      bgTint: 'warning-container',
      textTint: 'warning',
      bgSubtle: '---',
      textSubtle: 'warning',
    },
  },
  {
    value: 'success',
    label: 'Success',
    tokens: {
      bgFilled: 'success',
      textFilled: 'success',
      bgTint: 'success-container',
      textTint: 'success',
      bgSubtle: '---',
      textSubtle: 'success',
    },
  },
  {
    value: 'important',
    label: 'Important',
    tokens: {
      bgFilled: 'on-surface',
      textFilled: 'surface',
      bgTint: 'surface',
      textTint: 'on-surface',
      bgSubtle: '---',
      textSubtle: 'on-surface',
    },
  },
  {
    value: 'info',
    label: 'Info',
    tokens: {
      bgFilled: 'info',
      textFilled: 'info',
      bgTint: 'info-container',
      textTint: 'info',
      bgSubtle: '---',
      textSubtle: 'info',
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Iterators for All Variants grid                                     */
/* ------------------------------------------------------------------ */
const sizeValues: LabelSize[] = ['extra-large', 'large', 'medium', 'small'];
const appearanceValues: LabelAppearance[] = ['filled', 'tint', 'subtle'];

/* ------------------------------------------------------------------ */
/*  Code strings                                                        */
/* ------------------------------------------------------------------ */
const examples = {
  liveSizes: `<Label text="Extra Large" size="extra-large" icon="star" />
<Label text="Large" size="large" icon="star" />
<Label text="Medium" size="medium" icon="star" />
<Label text="Small" size="small" icon="star" />`,

  liveAppearances: `<Label text="Filled" appearance="filled" color="brand" icon="star" />
<Label text="Tint" appearance="tint" color="brand" icon="star" />
<Label text="Subtle" appearance="subtle" color="brand" icon="star" />`,

  liveColors: `<Label text="Brand" color="brand" icon="star" />
<Label text="Error" color="error" icon="star" />
<Label text="Warning" color="warning" icon="star" />
<Label text="Success" color="success" icon="star" />
<Label text="Important" color="important" icon="star" />
<Label text="Info" color="info" icon="star" />`,

  liveNoIcon: `<Label text="Status" color="success" />
<Label text="Draft" color="important" appearance="tint" />
<Label text="Archived" color="brand" appearance="subtle" />`,
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
.label-anatomy-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110px;
  padding: 24px;
  background-color: #f5f5f5;
}

/* ── Layout and spacing ───────────────────────────────────────────── */
.label-ls-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.label-ls-visual {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 120px;
  min-height: 60px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.label-spec-table {
  border-collapse: collapse;
}

.label-spec-table td {
  padding: 2px 12px 2px 0;
  vertical-align: top;
}

.label-spec-table td:first-child {
  color: #757575;
  white-space: nowrap;
}
</style>
