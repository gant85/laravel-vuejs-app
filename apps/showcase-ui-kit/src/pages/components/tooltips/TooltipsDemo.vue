<template>
  <v-container>
    <!-- Header -->
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Tooltips</h1>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Tooltips display brief, informational text when a user hovers over or focuses on a UI
        element. Two types are available: <strong>plain</strong> tooltips for short labels and
        <strong>rich</strong> tooltips for structured content with optional title and actions.
      </p>
    </div>

    <!-- ================================================================ -->
    <!--  PLAIN TOOLTIP — ANATOMY                                         -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Plain Tooltip</h2>
    <h3 class="text-h6 mb-4">Anatomy</h3>

    <v-row class="mb-12">
      <v-col
        cols="12"
        md="4">
        <p class="text-subtitle-2 font-weight-bold mb-2">Anatomy</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="tooltip-anatomy-panel">
            <div class="tooltip-plain-static">Supporting text</div>
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
              >Tooltip container</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">Min height: 24px</v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Background color:
              <router-link
                to="/brand/colors-demo"
                class="token-link">
                inverse-surface
              </router-link>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">Border radius: 3px</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Text</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Text color:
              <router-link
                to="/brand/colors-demo"
                class="token-link">
                inverse-on-surface
              </router-link>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Text style:
              <router-link
                to="/brand/typography-demo"
                class="token-link">
                body / small
              </router-link>
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  PLAIN TOOLTIP — TYPE                                            -->
    <!-- ================================================================ -->
    <h3 class="text-h6 mb-4">Type</h3>

    <v-row class="mb-12">
      <!-- Single line -->
      <v-col
        cols="12"
        md="6">
        <h4 class="text-subtitle-1 font-weight-bold mb-4">Single line</h4>

        <p class="text-subtitle-2 font-weight-bold mb-2">Preview</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="tooltip-anatomy-panel">
            <div class="tooltip-plain-static">Supporting text</div>
          </div>
        </v-sheet>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Layout and spacing</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="tooltip-ls-row">
            <div class="tooltip-ls-visual">
              <div class="tooltip-plain-static tooltip-plain-static--small">Text</div>
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">&#9671; Plain Tooltip</div>
              <table class="tooltip-spec-table">
                <tr>
                  <td>Direction</td>
                  <td>Vertical</td>
                </tr>
                <tr>
                  <td>Alignment</td>
                  <td>Middle center</td>
                </tr>
                <tr>
                  <td>Vertical resizing</td>
                  <td>Hug content</td>
                </tr>
                <tr>
                  <td>Horizontal resizing</td>
                  <td>Hug content</td>
                </tr>
                <tr>
                  <td>Padding top</td>
                  <td>2px</td>
                </tr>
                <tr>
                  <td>Padding bottom</td>
                  <td>2px</td>
                </tr>
                <tr>
                  <td>Padding left</td>
                  <td>8px</td>
                </tr>
                <tr>
                  <td>Padding right</td>
                  <td>8px</td>
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
          <HighlightedCode :code="examples.plainSingleLine" />
        </v-sheet>
      </v-col>

      <!-- Multi line -->
      <v-col
        cols="12"
        md="6">
        <h4 class="text-subtitle-1 font-weight-bold mb-4">Multi line</h4>

        <p class="text-subtitle-2 font-weight-bold mb-2">Preview</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="tooltip-anatomy-panel">
            <div class="tooltip-plain-static tooltip-plain-static--multi">
              Supporting text that wraps to multiple lines to demonstrate the max-width constraint
              behavior
            </div>
          </div>
        </v-sheet>

        <v-list
          density="compact"
          class="mt-2 text-caption">
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Plain Tooltip</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">Max width: 200px</v-list-item-subtitle>
          </v-list-item>
        </v-list>

        <p class="text-subtitle-2 font-weight-bold mt-6 mb-2">Usage</p>
        <v-sheet
          class="pa-3"
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.plainMultiLine" />
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  RICH TOOLTIP — ANATOMY                                          -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Rich Tooltip</h2>
    <h3 class="text-h6 mb-4">Anatomy</h3>

    <v-row class="mb-12">
      <v-col
        cols="12"
        md="4">
        <p class="text-subtitle-2 font-weight-bold mb-2">Anatomy</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="tooltip-anatomy-panel">
            <div class="tooltip-rich-static">
              <div class="tooltip-rich-static__content">
                <div class="tooltip-rich-static__title">Title</div>
                <div class="tooltip-rich-static__supporting">
                  Supporting line text lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="tooltip-rich-static__actions">
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="text"
                  prepend-icon="star"
                  label>
                  Label
                </v-chip>
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="text"
                  prepend-icon="star"
                  label>
                  Label
                </v-chip>
              </div>
            </div>
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
              >Rich Tooltip</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">
              Background color:
              <router-link
                to="/brand/colors-demo"
                class="token-link">
                surface-container-lowest
              </router-link>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Inner container</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">
              Background color:
              <router-link
                to="/brand/colors-demo"
                class="token-link">
                surface-container-lowest
              </router-link>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">Border radius: 3px</v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Drop shadow: M3/Elevation Light/1
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Content</v-list-item-title>
            <v-list-item-subtitle class="text-caption">Width: 312px</v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Subhead</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Text color:
              <router-link
                to="/brand/colors-demo"
                class="token-link">
                on-surface
              </router-link>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Text style:
              <router-link
                to="/brand/typography-demo"
                class="token-link">
                title / small
              </router-link>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold"
              >Supporting text</v-list-item-title
            >
            <v-list-item-subtitle class="text-caption">
              Text color:
              <router-link
                to="/brand/colors-demo"
                class="token-link">
                on-surface
              </router-link>
            </v-list-item-subtitle>
            <v-list-item-subtitle class="text-caption">
              Text style:
              <router-link
                to="/brand/typography-demo"
                class="token-link">
                body / small
              </router-link>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item>
            <v-list-item-title class="text-caption font-weight-bold">Actions</v-list-item-title>
            <v-list-item-subtitle class="text-caption">
              Depends on: Button (Tertiary XSmall)
            </v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  RICH TOOLTIP — PROPERTIES                                       -->
    <!-- ================================================================ -->
    <h3 class="text-h6 mb-4">Properties</h3>

    <v-row class="mb-12">
      <!-- Show subhead -->
      <v-col
        cols="12"
        md="6">
        <h4 class="text-subtitle-1 font-weight-bold mb-4">Show subhead</h4>

        <p class="text-subtitle-2 font-weight-bold mb-2">With subhead</p>
        <v-sheet
          class="overflow-hidden mb-4"
          border
          rounded="lg">
          <div class="tooltip-anatomy-panel">
            <div class="tooltip-rich-static">
              <div class="tooltip-rich-static__content">
                <div class="tooltip-rich-static__title">Title</div>
                <div class="tooltip-rich-static__supporting">
                  Supporting line text lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="tooltip-rich-static__actions">
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="text"
                  prepend-icon="star"
                  label>
                  Label
                </v-chip>
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="text"
                  prepend-icon="star"
                  label>
                  Label
                </v-chip>
              </div>
            </div>
          </div>
        </v-sheet>

        <p class="text-subtitle-2 font-weight-bold mb-2">Without subhead</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="tooltip-anatomy-panel">
            <div class="tooltip-rich-static">
              <div class="tooltip-rich-static__content">
                <div class="tooltip-rich-static__supporting">
                  Supporting line text lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="tooltip-rich-static__actions">
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="text"
                  prepend-icon="star"
                  label>
                  Label
                </v-chip>
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="text"
                  prepend-icon="star"
                  label>
                  Label
                </v-chip>
              </div>
            </div>
          </div>
        </v-sheet>
      </v-col>

      <!-- Show actions -->
      <v-col
        cols="12"
        md="6">
        <h4 class="text-subtitle-1 font-weight-bold mb-4">Show actions</h4>

        <p class="text-subtitle-2 font-weight-bold mb-2">With actions</p>
        <v-sheet
          class="overflow-hidden mb-4"
          border
          rounded="lg">
          <div class="tooltip-anatomy-panel">
            <div class="tooltip-rich-static">
              <div class="tooltip-rich-static__content">
                <div class="tooltip-rich-static__title">Title</div>
                <div class="tooltip-rich-static__supporting">
                  Supporting line text lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
              <div class="tooltip-rich-static__actions">
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="text"
                  prepend-icon="star"
                  label>
                  Label
                </v-chip>
                <v-chip
                  size="x-small"
                  color="primary"
                  variant="text"
                  prepend-icon="star"
                  label>
                  Label
                </v-chip>
              </div>
            </div>
          </div>
        </v-sheet>

        <p class="text-subtitle-2 font-weight-bold mb-2">Without actions</p>
        <v-sheet
          class="overflow-hidden"
          border
          rounded="lg">
          <div class="tooltip-anatomy-panel">
            <div class="tooltip-rich-static">
              <div class="tooltip-rich-static__content">
                <div class="tooltip-rich-static__title">Title</div>
                <div class="tooltip-rich-static__supporting">
                  Supporting line text lorem ipsum dolor sit amet, consectetur
                </div>
              </div>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  RICH TOOLTIP — LAYOUT AND SPACING                               -->
    <!-- ================================================================ -->
    <h3 class="text-h6 mb-4">Layout and spacing</h3>

    <v-row class="mb-12">
      <!-- Rich Tooltip container -->
      <v-col
        cols="12"
        md="6">
        <p class="text-subtitle-2 font-weight-bold mb-2">Rich Tooltip</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="tooltip-ls-row">
            <div class="tooltip-ls-visual tooltip-ls-visual--wide">
              <div class="tooltip-rich-static tooltip-rich-static--compact">
                <div class="tooltip-rich-static__content">
                  <div class="tooltip-rich-static__title">Title</div>
                  <div class="tooltip-rich-static__supporting">Supporting text</div>
                </div>
                <div class="tooltip-rich-static__actions">
                  <v-chip
                    size="x-small"
                    color="primary"
                    variant="text"
                    prepend-icon="star"
                    label>
                    Label
                  </v-chip>
                </div>
              </div>
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">&#9671; Rich Tooltip</div>
              <table class="tooltip-spec-table">
                <tr>
                  <td>Direction</td>
                  <td>Vertical</td>
                </tr>
                <tr>
                  <td>Alignment</td>
                  <td>Top left</td>
                </tr>
                <tr>
                  <td>Vertical resizing</td>
                  <td>Hug</td>
                </tr>
                <tr>
                  <td>Horizontal resizing</td>
                  <td>Hug</td>
                </tr>
                <tr>
                  <td>Item spacing</td>
                  <td>8px</td>
                </tr>
                <tr>
                  <td>Padding bottom</td>
                  <td>8px</td>
                </tr>
              </table>
            </div>
          </div>
        </v-sheet>
      </v-col>

      <!-- Content area -->
      <v-col
        cols="12"
        md="6">
        <p class="text-subtitle-2 font-weight-bold mb-2">Content</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="tooltip-ls-row">
            <div class="tooltip-ls-visual tooltip-ls-visual--wide">
              <div class="tooltip-rich-static tooltip-rich-static--compact">
                <div class="tooltip-rich-static__content">
                  <div class="tooltip-rich-static__title">Title</div>
                  <div class="tooltip-rich-static__supporting">Supporting text</div>
                </div>
              </div>
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">&#9879; Content</div>
              <table class="tooltip-spec-table">
                <tr>
                  <td>Direction</td>
                  <td>Vertical</td>
                </tr>
                <tr>
                  <td>Alignment</td>
                  <td>Top left</td>
                </tr>
                <tr>
                  <td>Vertical resizing</td>
                  <td>Hug</td>
                </tr>
                <tr>
                  <td>Horizontal resizing</td>
                  <td>Fixed</td>
                </tr>
                <tr>
                  <td>Item spacing</td>
                  <td>4px</td>
                </tr>
                <tr>
                  <td>Padding top</td>
                  <td>12px</td>
                </tr>
                <tr>
                  <td>Padding bottom</td>
                  <td>4px</td>
                </tr>
                <tr>
                  <td>Padding left</td>
                  <td>16px</td>
                </tr>
                <tr>
                  <td>Padding right</td>
                  <td>16px</td>
                </tr>
              </table>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <v-row class="mb-12">
      <!-- Actions area -->
      <v-col
        cols="12"
        md="6">
        <p class="text-subtitle-2 font-weight-bold mb-2">Actions</p>
        <v-sheet
          class="pa-4"
          color="white"
          border
          rounded="lg">
          <div class="tooltip-ls-row">
            <div class="tooltip-ls-visual tooltip-ls-visual--wide">
              <div class="tooltip-rich-static tooltip-rich-static--compact">
                <div class="tooltip-rich-static__content">
                  <div class="tooltip-rich-static__title">Title</div>
                  <div class="tooltip-rich-static__supporting">Supporting text</div>
                </div>
                <div class="tooltip-rich-static__actions">
                  <v-chip
                    size="x-small"
                    color="primary"
                    variant="text"
                    prepend-icon="star"
                    label>
                    Label
                  </v-chip>
                  <v-chip
                    size="x-small"
                    color="primary"
                    variant="text"
                    prepend-icon="star"
                    label>
                    Label
                  </v-chip>
                </div>
              </div>
            </div>
            <div class="text-caption text-grey-darken-2">
              <div class="font-weight-bold mb-2">&#9879; Actions</div>
              <table class="tooltip-spec-table">
                <tr>
                  <td>Direction</td>
                  <td>Horizontal</td>
                </tr>
                <tr>
                  <td>Alignment</td>
                  <td>Middle left</td>
                </tr>
                <tr>
                  <td>Vertical resizing</td>
                  <td>Hug</td>
                </tr>
                <tr>
                  <td>Horizontal resizing</td>
                  <td>Fill</td>
                </tr>
                <tr>
                  <td>Item spacing</td>
                  <td>8px</td>
                </tr>
                <tr>
                  <td>Padding left</td>
                  <td>4px</td>
                </tr>
                <tr>
                  <td>Padding right</td>
                  <td>4px</td>
                </tr>
              </table>
            </div>
          </div>
        </v-sheet>
      </v-col>
    </v-row>

    <!-- ================================================================ -->
    <!--  LIVE EXAMPLES                                                    -->
    <!-- ================================================================ -->
    <h2 class="text-h5 mb-6">Examples</h2>

    <v-row class="mb-12">
      <!-- Plain tooltip -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Plain Tooltip</h3>
        <CodeExample :code="examples.livePlain">
          <div class="d-flex align-center ga-6 pa-6 flex-wrap">
            <Tooltip text="Supporting text">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="tonal">
                  Hover me
                </v-btn>
              </template>
            </Tooltip>
            <Tooltip
              text="Supporting text that wraps to multiple lines to demonstrate the max-width constraint behavior"
              :max-width="200">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="tonal">
                  Multi line
                </v-btn>
              </template>
            </Tooltip>
          </div>
        </CodeExample>
      </v-col>

      <!-- Rich tooltip -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Rich Tooltip</h3>
        <CodeExample :code="examples.liveRich">
          <div class="d-flex align-center ga-6 pa-6">
            <Tooltip
              type="rich"
              title="Title"
              text="Supporting line text lorem ipsum dolor sit amet, consectetur"
              :show-actions="true">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="tonal">
                  Hover me
                </v-btn>
              </template>
              <template #actions>
                <v-btn
                  size="x-small"
                  variant="text"
                  color="primary"
                  prepend-icon="star">
                  Label
                </v-btn>
                <v-btn
                  size="x-small"
                  variant="text"
                  color="primary"
                  prepend-icon="star">
                  Label
                </v-btn>
              </template>
            </Tooltip>
          </div>
        </CodeExample>
      </v-col>
    </v-row>

    <v-row class="mb-12">
      <!-- Rich tooltip without subhead -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Rich Tooltip (no subhead)</h3>
        <CodeExample :code="examples.liveRichNoSubhead">
          <div class="d-flex align-center ga-6 pa-6">
            <Tooltip
              type="rich"
              text="Supporting line text lorem ipsum dolor sit amet, consectetur"
              :show-subhead="false"
              :show-actions="true">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="tonal">
                  No subhead
                </v-btn>
              </template>
              <template #actions>
                <v-btn
                  size="x-small"
                  variant="text"
                  color="primary"
                  prepend-icon="star">
                  Label
                </v-btn>
                <v-btn
                  size="x-small"
                  variant="text"
                  color="primary"
                  prepend-icon="star">
                  Label
                </v-btn>
              </template>
            </Tooltip>
          </div>
        </CodeExample>
      </v-col>

      <!-- Rich tooltip without actions -->
      <v-col
        cols="12"
        md="6">
        <h3 class="text-h6 font-weight-bold mb-4">Rich Tooltip (no actions)</h3>
        <CodeExample :code="examples.liveRichNoActions">
          <div class="d-flex align-center ga-6 pa-6">
            <Tooltip
              type="rich"
              title="Title"
              text="Supporting line text lorem ipsum dolor sit amet, consectetur">
              <template #activator="{ props: activatorProps }">
                <v-btn
                  v-bind="activatorProps"
                  variant="tonal">
                  No actions
                </v-btn>
              </template>
            </Tooltip>
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
          <td><code>type</code></td>
          <td><code class="text-no-wrap">'plain' | 'rich'</code></td>
          <td><code>'plain'</code></td>
          <td>
            Tooltip variant. <strong>Plain</strong> renders a dark overlay tooltip;
            <strong>Rich</strong> renders a light card with title, body and optional actions.
          </td>
        </tr>
        <tr>
          <td><code>text</code></td>
          <td><code>string</code></td>
          <td><code>undefined</code></td>
          <td>Tooltip text content. Can also be provided via the default slot.</td>
        </tr>
        <tr>
          <td><code>title</code></td>
          <td><code>string</code></td>
          <td><code>undefined</code></td>
          <td>
            Title text displayed as subhead in rich tooltip. Only shown when
            <code>showSubhead</code> is <code>true</code>.
          </td>
        </tr>
        <tr>
          <td><code>showSubhead</code></td>
          <td><code>boolean</code></td>
          <td><code>true</code></td>
          <td>Whether to show the subhead (title) section in a rich tooltip.</td>
        </tr>
        <tr>
          <td><code>showActions</code></td>
          <td><code>boolean</code></td>
          <td><code>false</code></td>
          <td>Whether to show the actions section in a rich tooltip.</td>
        </tr>
        <tr>
          <td><code>maxWidth</code></td>
          <td><code>number</code></td>
          <td><code>undefined</code></td>
          <td>
            Maximum width in pixels. Useful for multi-line plain tooltips (recommended: 200px).
          </td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">Slots</h3>
    <v-table
      density="compact"
      class="mb-8 api-table">
      <thead>
        <tr>
          <th class="text-left">Slot</th>
          <th class="text-left">Props</th>
          <th class="text-left">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><code>activator</code></td>
          <td><code>{ props }</code></td>
          <td>
            The element that triggers the tooltip. Spread <code>props</code> onto it via
            <code>v-bind</code>.
          </td>
        </tr>
        <tr>
          <td><code>default</code></td>
          <td>—</td>
          <td>
            Custom tooltip content. In plain mode, replaces the <code>text</code> prop. In rich
            mode, replaces the supporting text area.
          </td>
        </tr>
        <tr>
          <td><code>actions</code></td>
          <td>—</td>
          <td>Action buttons displayed at the bottom of a rich tooltip.</td>
        </tr>
      </tbody>
    </v-table>

    <h3 class="text-subtitle-1 font-weight-bold mb-2">Design specifications</h3>
    <v-table
      density="compact"
      class="mb-8 api-table">
      <thead>
        <tr>
          <th class="text-left">Property</th>
          <th class="text-left">Plain Tooltip</th>
          <th class="text-left">Rich Tooltip</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Background</td>
          <td>
            <router-link
              to="/brand/colors-demo"
              class="token-link"
              >inverse-surface</router-link
            >
          </td>
          <td>
            <router-link
              to="/brand/colors-demo"
              class="token-link"
              >surface-container-lowest</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Text color</td>
          <td>
            <router-link
              to="/brand/colors-demo"
              class="token-link"
              >inverse-on-surface</router-link
            >
          </td>
          <td>
            <router-link
              to="/brand/colors-demo"
              class="token-link"
              >on-surface</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Border radius</td>
          <td>3px</td>
          <td>3px</td>
        </tr>
        <tr>
          <td>Min height</td>
          <td>24px</td>
          <td>—</td>
        </tr>
        <tr>
          <td>Width</td>
          <td>Hug (max 200px multi-line)</td>
          <td>312px</td>
        </tr>
        <tr>
          <td>Content padding</td>
          <td>2px 8px</td>
          <td>12px 16px 4px 16px</td>
        </tr>
        <tr>
          <td>Body text style</td>
          <td>
            <router-link
              to="/brand/typography-demo"
              class="token-link"
              >body / small</router-link
            >
          </td>
          <td>
            <router-link
              to="/brand/typography-demo"
              class="token-link"
              >body / small</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Title text style</td>
          <td>—</td>
          <td>
            <router-link
              to="/brand/typography-demo"
              class="token-link"
              >title / small</router-link
            >
          </td>
        </tr>
        <tr>
          <td>Actions padding</td>
          <td>—</td>
          <td>0 4px</td>
        </tr>
        <tr>
          <td>Actions item spacing</td>
          <td>—</td>
          <td>8px</td>
        </tr>
        <tr>
          <td>Shadow</td>
          <td>—</td>
          <td>M3 Elevation Light/1</td>
        </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { Tooltip } from '@reference-app-laravel-vue/ui-kit';
import CodeExample from '../../../components/CodeExample.vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

/* ------------------------------------------------------------------ */
/*  Code strings                                                        */
/* ------------------------------------------------------------------ */
const examples = {
  plainSingleLine: `<Tooltip text="Supporting text">
  <template #activator="{ props }">
    <v-btn v-bind="props">Hover me</v-btn>
  </template>
</Tooltip>`,

  plainMultiLine: `<Tooltip
  text="Supporting text that wraps to multiple lines to demonstrate the max-width constraint behavior"
  :max-width="200"
>
  <template #activator="{ props }">
    <v-btn v-bind="props">Multi line</v-btn>
  </template>
</Tooltip>`,

  livePlain: `<Tooltip text="Supporting text">
  <template #activator="{ props }">
    <v-btn v-bind="props" variant="tonal">Hover me</v-btn>
  </template>
</Tooltip>

<Tooltip text="Supporting text that wraps to multiple lines to demonstrate the max-width constraint behavior" :max-width="200">
  <template #activator="{ props }">
    <v-btn v-bind="props" variant="tonal">Multi line</v-btn>
  </template>
</Tooltip>`,

  liveRich: `<Tooltip
  type="rich"
  title="Title"
  text="Supporting line text lorem ipsum dolor sit amet, consectetur"
  :show-actions="true"
>
  <template #activator="{ props }">
    <v-btn v-bind="props" variant="tonal">Hover me</v-btn>
  </template>
  <template #actions>
    <v-btn size="x-small" variant="text" color="primary" prepend-icon="star">Label</v-btn>
    <v-btn size="x-small" variant="text" color="primary" prepend-icon="star">Label</v-btn>
  </template>
</Tooltip>`,

  liveRichNoSubhead: `<Tooltip
  type="rich"
  text="Supporting line text lorem ipsum dolor sit amet, consectetur"
  :show-subhead="false"
  :show-actions="true"
>
  <template #activator="{ props }">
    <v-btn v-bind="props" variant="tonal">No subhead</v-btn>
  </template>
  <template #actions>
    <v-btn size="x-small" variant="text" color="primary" prepend-icon="star">Label</v-btn>
    <v-btn size="x-small" variant="text" color="primary" prepend-icon="star">Label</v-btn>
  </template>
</Tooltip>`,

  liveRichNoActions: `<Tooltip
  type="rich"
  title="Title"
  text="Supporting line text lorem ipsum dolor sit amet, consectetur"
>
  <template #activator="{ props }">
    <v-btn v-bind="props" variant="tonal">No actions</v-btn>
  </template>
</Tooltip>`,
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
.tooltip-anatomy-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110px;
  padding: 24px;
  background-color: #f5f5f5;
}

/* ── Plain tooltip static mock ────────────────────────────────────── */
.tooltip-plain-static {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 24px;
  padding: 2px 8px;
  font-size: 0.75rem;
  line-height: 1rem;
  color: #f5f5f5;
  background-color: #333;
  border-radius: 3px;
}

.tooltip-plain-static--small {
  min-height: 20px;
  padding: 1px 6px;
  font-size: 0.6875rem;
}

.tooltip-plain-static--multi {
  max-width: 200px;
  text-align: left;
}

/* ── Rich tooltip static mock ─────────────────────────────────────── */
.tooltip-rich-static {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 312px;
  padding-bottom: 8px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow:
    0 1px 3px 1px rgb(0 0 0 / 15%),
    0 1px 2px 0 rgb(0 0 0 / 30%);
}

.tooltip-rich-static--compact {
  width: 200px;
}

.tooltip-rich-static__content {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 16px 4px;
}

.tooltip-rich-static__title {
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}

.tooltip-rich-static__supporting {
  font-size: 0.75rem;
  line-height: 1rem;
  color: #424242;
}

.tooltip-rich-static__actions {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 0 4px;
}

/* ── Layout and spacing ───────────────────────────────────────────── */
.tooltip-ls-row {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.tooltip-ls-visual {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 120px;
  min-height: 60px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.tooltip-ls-visual--wide {
  width: 220px;
  padding: 8px;
}

.tooltip-spec-table {
  border-collapse: collapse;
}

.tooltip-spec-table td {
  padding: 2px 12px 2px 0;
  vertical-align: top;
}

.tooltip-spec-table td:first-child {
  color: #757575;
  white-space: nowrap;
}

/* ── Token links ──────────────────────────────────────────────────── */
.token-link {
  display: inline-block;
  padding: 0 6px;
  font-family: monospace;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  border: 1px solid rgb(var(--v-theme-primary) / 40%);
  border-radius: 4px;
  transition: background-color 0.15s;
}

.token-link:hover {
  background-color: rgb(var(--v-theme-primary) / 8%);
}
</style>
