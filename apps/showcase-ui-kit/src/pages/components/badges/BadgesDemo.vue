<template>
  <v-container>
    <!-- Header -->
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Badges</h1>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Badges are small visual indicators attached to a UI element. They convey dynamic information
        such as notification counts (large) or a simple presence/status signal (small dot). Badges
        always use the <code>error</code> color token by default, matching the MD3 specification.
      </p>
    </div>

    <!-- ================================================================ -->
    <!--  ANATOMY                                                          -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Anatomy</h2>

    <!-- Anatomy diagram + description -->
    <v-row class="mb-12">
      <v-col
        cols="12"
        md="4">
        <p class="text-subtitle-2 font-weight-bold mb-2">Anatomy</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="badge-anatomy-panel">
            <Badge :content="3">
              <div class="badge-anchor" />
            </Badge>
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
              >Badge container</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">
              Background color:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                error
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">Border radius: 100</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Badge label</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Text color:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                on-error
              </v-chip>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">Text align: Center</v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Text style:
              <v-chip
                size="x-small"
                variant="outlined"
                label>
                label / small
              </v-chip>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  SIZE                                                             -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Size</h2>

    <v-row class="mb-12">
      <!-- Large -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Large</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Preview</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="badge-anatomy-panel">
            <Badge :content="3">
              <div class="badge-anchor" />
            </Badge>
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Badge container</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">Height: 14px</v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">Min width: 14px</v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">Max width: 34px</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="badge-ls-row">
            <div class="badge-ls-visual">
              <Badge :content="3">
                <div class="badge-ls-anchor" />
              </Badge>
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">&#9671; Badges</div>
              <table class="badge-spec-table">
                <tr>
                  <td>Direction</td>
                  <td>Horizontal</td>
                </tr>
                <tr>
                  <td>Alignment</td>
                  <td>Middle center</td>
                </tr>
                <tr>
                  <td>Vertical resizing</td>
                  <td>Fixed</td>
                </tr>
                <tr>
                  <td>Horizontal resizing</td>
                  <td>Hug</td>
                </tr>
                <tr>
                  <td>Padding left</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>Padding right</td>
                  <td>3</td>
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
          <HighlightedCode :code="examples.large" />
        </v-sheet>
      </v-col>

      <!-- Small -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Small</h3>

        <p class="text-subtitle-2 font-weight-bold mb-2">Preview</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="badge-anatomy-panel">
            <Badge>
              <div class="badge-anchor" />
            </Badge>
          </div>
        </v-sheet>
        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Badge container</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">Height: 5px</v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">Width: 5px</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="badge-ls-row">
            <div class="badge-ls-visual">
              <Badge>
                <div class="badge-ls-anchor" />
              </Badge>
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">&#9671; Badges</div>
              <table class="badge-spec-table">
                <tr>
                  <td>Height</td>
                  <td>5px (fixed)</td>
                </tr>
                <tr>
                  <td>Width</td>
                  <td>5px (fixed)</td>
                </tr>
                <tr>
                  <td>Border radius</td>
                  <td>50%</td>
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
          <HighlightedCode :code="examples.small" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  LIVE EXAMPLES                                                    -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Examples</h2>

    <v-row class="mb-12">
      <!-- Notification (large) -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Notification count</h3>
        <CodeExample :code="examples.liveNotification">
          <div class="d-flex align-center ga-6 pa-6">
            <Badge :content="4">
              <v-icon size="28">notifications</v-icon>
            </Badge>
            <Badge :content="99">
              <v-icon size="28">mail</v-icon>
            </Badge>
            <Badge content="99+">
              <v-icon size="28">chat_bubble</v-icon>
            </Badge>
          </div>
        </CodeExample>
      </v-col>

      <!-- Status dot (small) -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Status indicator</h3>
        <CodeExample :code="examples.liveStatus">
          <div class="d-flex align-center ga-6 pa-6">
            <Badge>
              <v-icon size="28">person</v-icon>
            </Badge>
            <Badge>
              <v-avatar
                color="grey-lighten-2"
                size="36">
                <v-icon>account_circle</v-icon>
              </v-avatar>
            </Badge>
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
          <td><code>content</code></td>
          <td><code class="text-no-wrap">string | number</code></td>
          <td><code>undefined</code></td>
          <td>
            Badge label. When provided renders a <strong>large</strong> (numbered) badge; when
            omitted renders a <strong>small</strong> dot badge.
          </td>
        </tr>
        <tr>
          <td><code>color</code></td>
          <td><code>string</code></td>
          <td><code class="text-no-wrap">'error'</code></td>
          <td>
            Badge background color (any Vuetify color token or CSS value). Passed through to
            <code>&lt;v-badge&gt;</code>.
          </td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">Behavior</h3>
    <v-table
      density="compact"
      class="mb-8 api-table">
      <thead>
        <tr>
          <th class="text-left">Variant</th>
          <th class="text-left">Trigger</th>
          <th class="text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>Large</code></td>
          <td><code>:content="n"</code></td>
          <td>
            Pill-shaped badge with numeric or text label. Height: 14px, min-width: 14px, max-width:
            34px, padding: 0&thinsp;3px, border-radius: 100px.
          </td>
        </tr>
        <tr>
          <td><code>Small</code></td>
          <td><code>(no content)</code></td>
          <td>
            Circular dot indicator. Height: 5px, width: 5px. No label, used for status or
            unread-notification signals.
          </td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { Badge } from '@reference-app-laravel-vue/ui-kit';
import CodeExample from '../../../components/CodeExample.vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

/* ------------------------------------------------------------------ */
/*  Code strings                                                        */
/* ------------------------------------------------------------------ */
const examples = {
  large: '<Badge :content="4">\n  <v-icon>notifications</v-icon>\n</Badge>',
  small: '<Badge>\n  <v-icon>person</v-icon>\n</Badge>',

  liveNotification: `<Badge :content="4">
  <v-icon size="28">notifications</v-icon>
</Badge>

<Badge :content="99">
  <v-icon size="28">mail</v-icon>
</Badge>

<Badge content="99+">
  <v-icon size="28">chat_bubble</v-icon>
</Badge>`,

  liveStatus: `<Badge>
  <v-icon size="28">person</v-icon>
</Badge>

<Badge>
  <v-avatar color="grey-lighten-2" size="36">
    <v-icon>account_circle</v-icon>
  </v-avatar>
</Badge>`,
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
.badge-anatomy-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110px;
  padding: 24px;
  background-color: #f5f5f5;
}

/* Grey placeholder representing a wrapped icon/element */
.badge-anchor {
  width: 48px;
  height: 32px;
  background-color: #e8eaf6;
  border-radius: 4px;
}

/* ── Layout and spacing ───────────────────────────────────────────── */
.badge-ls-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.badge-ls-visual {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 90px;
  min-height: 60px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.badge-ls-anchor {
  width: 32px;
  height: 24px;
  background-color: #e8eaf6;
  border-radius: 4px;
}

.badge-spec-table {
  border-collapse: collapse;
}

.badge-spec-table td {
  padding: 2px 12px 2px 0;
  vertical-align: top;
}

.badge-spec-table td:first-child {
  color: #757575;
  white-space: nowrap;
}
</style>
