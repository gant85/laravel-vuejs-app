<template>
  <v-container>
    <!-- Header -->
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Dividers</h1>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Dividers group content in lists and other containers. They can be horizontal or vertical,
        with several inset variants and an optional subheader.
      </p>
    </div>

    <!-- ================================================================ -->
    <!--  HORIZONTAL VARIANTS                                              -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Horizontal</h2>

    <!-- Shared anatomy label -->
    <v-row>
      <v-col
        cols="12"
        md="4">
        <p class="text-subtitle-2 font-weight-bold mb-2">Anatomy</p>
      </v-col>
    </v-row>

    <!-- Anatomy diagrams row -->
    <v-row class="mb-2">
      <v-col
        cols="12"
        md="4">
        <h4 class="text-body-2 font-weight-bold mb-2">Full-width</h4>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="divider-demo-h anatomy-diagram">
            <div class="divider-demo-content"></div>
            <Divider indent="none" />
            <div class="divider-demo-content">
              <span
                class="callout-marker"
                style="top: -10px; left: 50%; transform: translateX(-50%)"
                >1</span
              >
            </div>
          </div>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="4">
        <h4 class="text-body-2 font-weight-bold mb-2">Inset</h4>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="divider-demo-h anatomy-diagram">
            <div class="divider-demo-content"></div>
            <Divider indent="inset" />
            <div class="divider-demo-content">
              <span
                class="callout-marker"
                style="top: -10px; left: 50%; transform: translateX(-50%)"
                >1</span
              >
            </div>
          </div>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="4">
        <h4 class="text-body-2 font-weight-bold mb-2">Middle-inset</h4>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="divider-demo-h anatomy-diagram">
            <div class="divider-demo-content"></div>
            <Divider indent="middle-inset" />
            <div class="divider-demo-content">
              <span
                class="callout-marker"
                style="top: -10px; left: 50%; transform: translateX(-50%)"
                >1</span
              >
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- Shared legend -->
    <v-row class="mb-8">
      <v-col cols="12">
        <v-list
          density="compact"
          class="text-caption">
          <v-list-item>
            <template #prepend>
              <v-avatar
                color="error"
                size="20"
                class="mr-2">
                <span
                  class="text-white"
                  style="font-size: 10px"
                  >1</span
                >
              </v-avatar>
            </template>
            <v-list-item-title class="text-caption font-weight-bold">Divider</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Border color:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                outline-variant
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Stroke alignment: Center
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption"> Border weight: 1px </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- Layout and spacing + Usage row -->
    <v-row class="mb-12">
      <!-- Full-width -->
      <v-col
        cols="12"
        md="4">
        <h3 class="text-h6 font-weight-bold mb-4">Horizontal / Full-width</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-6"
          color="white"
          border
          rounded="lg">
          <div class="dim-h">
            <div class="dim-h__ruler">
              <span class="dim-h__label">width: 100%</span>
            </div>
            <Divider indent="none" />
          </div>
        </v-sheet>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.hFullWidth" />
        </v-sheet>
      </v-col>

      <!-- Inset -->
      <v-col
        cols="12"
        md="4">
        <h3 class="text-h6 font-weight-bold mb-4">Horizontal / Inset</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-6"
          color="white"
          border
          rounded="lg">
          <div class="dim-h">
            <div class="dim-h__ruler">
              <span class="dim-h__label">width: 100%</span>
            </div>
            <div class="dim-h__offset-row">
              <div class="dim-h__ruler dim-h__ruler--sm">
                <span class="dim-h__label">16 px</span>
              </div>
              <span class="dim-h__spacer"></span>
            </div>
            <Divider indent="inset" />
          </div>
        </v-sheet>
        <div class="mt-2 text-caption text-grey-darken-1">margin-inline-start: 16px</div>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.hInset" />
        </v-sheet>
      </v-col>

      <!-- Middle-inset -->
      <v-col
        cols="12"
        md="4">
        <h3 class="text-h6 font-weight-bold mb-4">Horizontal / Middle-inset</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-6"
          color="white"
          border
          rounded="lg">
          <div class="dim-h">
            <div class="dim-h__ruler">
              <span class="dim-h__label">width: 100%</span>
            </div>
            <div class="dim-h__offset-row">
              <div class="dim-h__ruler dim-h__ruler--sm">
                <span class="dim-h__label">16 px</span>
              </div>
              <span class="dim-h__spacer"></span>
              <div class="dim-h__ruler dim-h__ruler--sm">
                <span class="dim-h__label">16 px</span>
              </div>
            </div>
            <Divider indent="middle-inset" />
          </div>
        </v-sheet>
        <div class="mt-2 text-caption text-grey-darken-1">
          margin-inline-start: 16px &bull; margin-inline-end: 16px
        </div>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.hMiddleInset" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  HORIZONTAL — DIVIDER WITH SUBHEADER                              -->
    <!-- ================================================================ -->
    <v-row class="mb-12">
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Horizontal / Divider with subhead</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Anatomy</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="divider-demo-h anatomy-diagram">
            <div class="divider-demo-content"></div>
            <Divider subheader="Subheader" />
            <div class="divider-demo-content">
              <span
                class="callout-marker"
                style="top: -35px; left: 50%; transform: translateX(-50%)"
                >1</span
              >
              <span
                class="callout-marker"
                style="top: -18px; left: 50%; transform: translateX(-50%)"
                >2</span
              >
            </div>
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <template #prepend>
              <v-avatar
                color="error"
                size="20"
                class="mr-2">
                <span
                  class="text-white"
                  style="font-size: 10px"
                  >1</span
                >
              </v-avatar>
            </template>
            <v-list-item-title class="text-caption font-weight-bold">Divider</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Border color:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                outline-variant
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Stroke alignment: Center
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption"> Border weight: 1px </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <template #prepend>
              <v-avatar
                color="error"
                size="20"
                class="mr-2">
                <span
                  class="text-white"
                  style="font-size: 10px"
                  >2</span
                >
              </v-avatar>
            </template>
            <v-list-item-title class="text-caption font-weight-bold">Subheader</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Text color:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                on-surface
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Text style:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                AH/title/small
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-6"
          color="white"
          border
          rounded="lg">
          <div class="dim-h">
            <div class="dim-h__ruler">
              <span class="dim-h__label">width: 100%</span>
            </div>
            <div class="dim-h__offset-row">
              <div class="dim-h__ruler dim-h__ruler--sm">
                <span class="dim-h__label">16 px</span>
              </div>
              <span class="dim-h__spacer"></span>
              <div class="dim-h__ruler dim-h__ruler--sm">
                <span class="dim-h__label">16 px</span>
              </div>
            </div>
            <Divider subheader="Subheader" />
          </div>
        </v-sheet>
        <div class="mt-2 text-caption text-grey-darken-1">
          gap: 4px &bull; margin-inline-start: 16px &bull; margin-inline-end: 16px
        </div>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.hSubheader" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  VERTICAL VARIANTS                                                -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Vertical</h2>

    <!-- Shared anatomy legend for all vertical variants -->
    <v-row>
      <v-col
        cols="12"
        md="4">
        <p class="text-subtitle-2 font-weight-bold mb-2">Anatomy</p>
      </v-col>
    </v-row>
    <v-row class="mb-2">
      <v-col
        cols="12"
        md="4">
        <h4 class="text-body-2 font-weight-bold mb-2">Full-width</h4>
        <v-sheet
          border
          rounded="lg">
          <div class="divider-demo-v anatomy-diagram">
            <div class="divider-demo-content"></div>
            <Divider
              indent="none"
              vertical />
            <div class="divider-demo-content"></div>
            <span class="callout-marker callout-marker--v">1</span>
          </div>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="4">
        <h4 class="text-body-2 font-weight-bold mb-2">Inset</h4>
        <v-sheet
          border
          rounded="lg">
          <div class="divider-demo-v anatomy-diagram">
            <div class="divider-demo-content"></div>
            <Divider
              indent="inset"
              vertical />
            <div class="divider-demo-content"></div>
            <span class="callout-marker callout-marker--v">1</span>
          </div>
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="4">
        <h4 class="text-body-2 font-weight-bold mb-2">Middle-inset</h4>
        <v-sheet
          border
          rounded="lg">
          <div class="divider-demo-v anatomy-diagram">
            <div class="divider-demo-content"></div>
            <Divider
              indent="middle-inset"
              vertical />
            <div class="divider-demo-content"></div>
            <span class="callout-marker callout-marker--v">1</span>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mb-8">
      <v-col cols="12">
        <v-list
          density="compact"
          class="text-caption">
          <v-list-item>
            <template #prepend>
              <v-avatar
                color="error"
                size="20"
                class="mr-2">
                <span
                  class="text-white"
                  style="font-size: 10px"
                  >1</span
                >
              </v-avatar>
            </template>
            <v-list-item-title class="text-caption font-weight-bold">Divider</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Border color:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                outline-variant
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Stroke alignment: Center
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption"> Border weight: 1px </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- Vertical layout & spacing + usage -->
    <v-row class="mb-12">
      <v-col
        cols="12"
        md="4">
        <h3 class="text-h6 font-weight-bold mb-4">Vertical / Full-width</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-6"
          color="white"
          border
          rounded="lg">
          <div
            class="dim-v"
            style="height: 120px">
            <Divider
              indent="none"
              vertical />
            <div class="dim-v__ruler">
              <span class="dim-v__label">height: 100%</span>
            </div>
          </div>
        </v-sheet>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.vFullWidth" />
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        md="4">
        <h3 class="text-h6 font-weight-bold mb-4">Vertical / Inset</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-6"
          color="white"
          border
          rounded="lg">
          <div
            class="dim-v"
            style="height: 120px">
            <Divider
              indent="inset"
              vertical />
            <div class="dim-v__ruler">
              <span class="dim-v__label">height: 100%</span>
            </div>
            <div class="dim-v__offsets">
              <div class="dim-v__ruler dim-v__ruler--sm">
                <span class="dim-v__label">16 px</span>
              </div>
              <span class="dim-v__spacer"></span>
            </div>
          </div>
        </v-sheet>
        <div class="mt-2 text-caption text-grey-darken-1">margin-block-start: 16px</div>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.vInset" />
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        md="4">
        <h3 class="text-h6 font-weight-bold mb-4">Vertical / Middle-inset</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-6"
          color="white"
          border
          rounded="lg">
          <div
            class="dim-v"
            style="height: 120px">
            <Divider
              indent="middle-inset"
              vertical />
            <div class="dim-v__ruler">
              <span class="dim-v__label">height: 100%</span>
            </div>
            <div class="dim-v__offsets">
              <div class="dim-v__ruler dim-v__ruler--sm">
                <span class="dim-v__label">16 px</span>
              </div>
              <span class="dim-v__spacer"></span>
              <div class="dim-v__ruler dim-v__ruler--sm">
                <span class="dim-v__label">16 px</span>
              </div>
            </div>
          </div>
        </v-sheet>
        <div class="mt-2 text-caption text-grey-darken-1">
          margin-block-start: 16px &bull; margin-block-end: 16px
        </div>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.vMiddleInset" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  LIVE EXAMPLES                                                    -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Live examples</h2>

    <!-- Horizontal in a list -->
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Horizontal dividers in a list</h3>
      <CodeExample :code="examples.liveHorizontal">
        <v-list>
          <v-list-item title="Item above full-width divider" />
          <Divider indent="none" />
          <v-list-item title="Item above inset divider" />
          <Divider indent="inset" />
          <v-list-item title="Item above middle-inset divider" />
          <Divider indent="middle-inset" />
          <v-list-item title="Item below middle-inset divider" />
        </v-list>
      </CodeExample>
    </div>

    <!-- Divider with subheader -->
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Divider with subheader</h3>
      <CodeExample :code="examples.liveSubheader">
        <v-list>
          <v-list-item title="First item" />
          <v-list-item title="Second item" />
          <Divider subheader="Section A" />
          <v-list-item title="Third item" />
          <v-list-item title="Fourth item" />
          <Divider subheader="Section B" />
          <v-list-item title="Fifth item" />
        </v-list>
      </CodeExample>
    </div>

    <!-- Vertical dividers -->
    <div class="mb-8">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">Vertical dividers</h3>
      <CodeExample :code="examples.liveVertical">
        <div class="pa-4">
          <div
            class="d-flex align-center justify-center ga-6"
            style="height: 100px">
            <span>Left</span>
            <Divider
              indent="none"
              vertical />
            <span>Center</span>
            <Divider
              indent="inset"
              vertical />
            <span>Right</span>
            <Divider
              indent="middle-inset"
              vertical />
            <span>End</span>
          </div>
        </div>
      </CodeExample>
    </div>

    <!-- ================================================================ -->
    <!--  API REFERENCE                                                    -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-4">API Reference</h2>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">UiDivider props</h3>
    <v-table
      density="compact"
      class="mb-6 api-table">
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
          <td><code>indent</code></td>
          <td><code class="text-no-wrap">'none' | 'inset' | 'middle&#8209;inset'</code></td>
          <td><code>'none'</code></td>
          <td>
            Controls the margin/indentation of the divider line per MD3 spec (16&nbsp;px). Does
            <strong>not</strong> collide with Vuetify’s <code>variant</code> or
            <code>inset</code> props.
          </td>
        </tr>
        <tr>
          <td><code>vertical</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>Displays the divider vertically (mirrors Vuetify’s native prop 1:1).</td>
        </tr>
        <tr>
          <td><code>subheader</code></td>
          <td><code>string</code></td>
          <td><code>undefined</code></td>
          <td>
            Renders a horizontal divider followed by a subheader label styled with
            <code>title/small</code> typography and
            <code class="text-no-wrap">on&#8209;surface</code> color.
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { Divider } from '@reference-app-laravel-vue/ui-kit';
import CodeExample from '../../../components/CodeExample.vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

/* ------------------------------------------------------------------ */
/*  Code strings – keep in sync with the corresponding preview markup  */
/* ------------------------------------------------------------------ */
const examples = {
  /* Spec sections (single-tag usage) */
  hFullWidth: '<Divider indent="none" />',
  hInset: '<Divider indent="inset" />',
  hMiddleInset: '<Divider indent="middle-inset" />',
  hSubheader: '<Divider subheader="Subheader" />',
  vFullWidth: '<Divider indent="none" vertical />',
  vInset: '<Divider indent="inset" vertical />',
  vMiddleInset: '<Divider indent="middle-inset" vertical />',

  /* Live examples (full usage with context) */
  liveHorizontal: `<v-list>
  <v-list-item title="Item above full-width divider" />
  <Divider indent="none" />
  <v-list-item title="Item above inset divider" />
  <Divider indent="inset" />
  <v-list-item title="Item above middle-inset divider" />
  <Divider indent="middle-inset" />
  <v-list-item title="Item below middle-inset divider" />
</v-list>`,
  liveSubheader: `<v-list>
  <v-list-item title="First item" />
  <v-list-item title="Second item" />
  <Divider subheader="Section A" />
  <v-list-item title="Third item" />
  <v-list-item title="Fourth item" />
  <Divider subheader="Section B" />
  <v-list-item title="Fifth item" />
</v-list>`,
  liveVertical: `<div
  class="d-flex align-center justify-center ga-6"
  style="height: 100px">
  <span>Left</span>
  <Divider indent="none" vertical />
  <span>Center</span>
  <Divider indent="inset" vertical />
  <span>Right</span>
  <Divider indent="middle-inset" vertical />
  <span>End</span>
</div>`,
};
</script>

<style scoped>
.h-100 {
  height: 100%;
}

.w-100 {
  width: 100%;
}

.position-relative {
  position: relative;
}

/* Prevent compound words from line-breaking */
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

/* --- Divider demo panels --- */
.divider-demo-h {
  display: flex;
  flex-direction: column;
}

.divider-demo-v {
  position: relative;
  display: flex;
  flex-direction: row;
  gap: 4px;
  height: 120px;
}

.divider-demo-content {
  position: relative;
  flex: 1;
  min-height: 36px;
  background-color: #e8eaf6;
}

/* --- Anatomy callout markers --- */
.callout-marker {
  position: absolute;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 10px;
  font-weight: 700;
  line-height: 1;
  color: #fff;
  pointer-events: none;
  background-color: #d32f2f;
  border-radius: 50%;
  box-shadow: 0 1px 3px rgb(0 0 0 / 30%);
}

/* vertical variant: centered on divider line */
.callout-marker--v {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ---- Horizontal dimension annotations ---- */
.dim-h {
  display: flex;
  flex-direction: column;
  gap: 6px;
  justify-content: center;
  min-height: 48px;
}

.dim-h__ruler {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 16px;
  border-right: 1px solid #90a4ae;

  /* perpendicular end-caps */
  border-left: 1px solid #90a4ae;
}

/* horizontal line segments */
.dim-h__ruler::before,
.dim-h__ruler::after {
  flex: 1;
  height: 0;
  content: '';
  border-top: 1px solid #90a4ae;
}

.dim-h__ruler::before {
  margin-right: 4px;
}

.dim-h__ruler::after {
  margin-left: 4px;
}

.dim-h__label {
  position: relative;
  padding: 0 2px;
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  color: #546e7a;
  white-space: nowrap;
}

/* left arrowhead on label */
.dim-h__label::before {
  position: absolute;
  top: 50%;
  right: 100%;
  width: 0;
  height: 0;
  content: '';
  border-top: 4px solid transparent;
  border-right: 6px solid #90a4ae;
  border-bottom: 4px solid transparent;
  transform: translateY(-50%);
}

/* right arrowhead on label */
.dim-h__label::after {
  position: absolute;
  top: 50%;
  left: 100%;
  width: 0;
  height: 0;
  content: '';
  border-top: 4px solid transparent;
  border-bottom: 4px solid transparent;
  border-left: 6px solid #90a4ae;
  transform: translateY(-50%);
}

.dim-h__offset-row {
  display: flex;
  gap: 0;
  align-items: center;
}

/* small ruler for offset annotations (e.g. 16 px) — exactly 16px */
.dim-h__ruler--sm {
  position: relative;
  flex: 0 0 16px;
  overflow: visible;
}

.dim-h__ruler--sm::before {
  position: absolute;
  top: 50%;
  right: 0;
  left: 0;
  flex: none;
  height: 0;
  margin: 0;
  content: '';
  border-top: 1px solid #90a4ae;
}

.dim-h__ruler--sm::after {
  display: none;
}

/* label outside the ruler span */
.dim-h__ruler--sm .dim-h__label {
  position: absolute;
  top: 50%;
  left: calc(100% + 4px);
  padding: 0;
  transform: translateY(-50%);
}

/* right-side ruler: label to the left */
.dim-h__offset-row > .dim-h__ruler--sm:last-child .dim-h__label {
  right: calc(100% + 4px);
  left: auto;
}

.dim-h__ruler--sm .dim-h__label::before,
.dim-h__ruler--sm .dim-h__label::after {
  display: none;
}

.dim-h__spacer {
  flex: 1;
}

/* ---- Vertical dimension annotations ---- */
.dim-v {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
}

.dim-v__ruler {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 100%;

  /* perpendicular end-caps */
  border-top: 1px solid #90a4ae;
  border-bottom: 1px solid #90a4ae;
}

/* vertical line segments */
.dim-v__ruler::before,
.dim-v__ruler::after {
  flex: 1;
  width: 0;
  content: '';
  border-left: 1px solid #90a4ae;
}

.dim-v__ruler::before {
  margin-bottom: 2px;
}

.dim-v__ruler::after {
  margin-top: 2px;
}

.dim-v__label {
  position: relative;
  padding: 2px 0;
  font-family: 'Roboto Mono', monospace;
  font-size: 11px;
  color: #546e7a;
  white-space: nowrap;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
}

/* top arrowhead on label */
.dim-v__label::before {
  position: absolute;
  bottom: 100%;
  left: 50%;
  width: 0;
  height: 0;
  content: '';
  border-right: 4px solid transparent;
  border-bottom: 6px solid #90a4ae;
  border-left: 4px solid transparent;
  transform: translateX(-50%);
}

/* bottom arrowhead on label */
.dim-v__label::after {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 0;
  height: 0;
  content: '';
  border-top: 6px solid #90a4ae;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
  transform: translateX(-50%);
}

.dim-v__offsets {
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 100%;
}

/* small ruler for offset annotations (e.g. 16 px) — exactly 16px */
.dim-v__ruler--sm {
  position: relative;
  flex: 0 0 16px;
  height: 16px;
  overflow: visible;
}

.dim-v__ruler--sm::before {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  flex: none;
  width: 0;
  margin: 0;
  content: '';
  border-left: 1px solid #90a4ae;
}

.dim-v__ruler--sm::after {
  display: none;
}

/* label outside the ruler span */
.dim-v__ruler--sm .dim-v__label {
  position: absolute;
  top: 50%;
  left: calc(50% + 8px);
  padding: 0;
  transform: translateY(-50%) rotate(180deg);
}

.dim-v__ruler--sm .dim-v__label::before,
.dim-v__ruler--sm .dim-v__label::after {
  display: none;
}

.dim-v__spacer {
  flex: 1;
}
</style>
