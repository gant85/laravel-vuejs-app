<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Expansion Panels</h1>
      <p class="text-grey-darken-1 mt-2">
        Expansion panels provide an expandable details-summary view.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Expansion Panels -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-expansion-panels&gt;
  &lt;v-expansion-panel&gt;
    &lt;v-expansion-panel-title&gt;Panel 1&lt;/v-expansion-panel-title&gt;
    &lt;v-expansion-panel-text&gt;Content&lt;/v-expansion-panel-text&gt;
  &lt;/v-expansion-panel&gt;
&lt;/v-expansion-panels&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-expansion-panels>
            <v-expansion-panel>
              <v-expansion-panel-title>Panel 1</v-expansion-panel-title>
              <v-expansion-panel-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>Panel 2</v-expansion-panel-title>
              <v-expansion-panel-text>
                Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>Panel 3</v-expansion-panel-title>
              <v-expansion-panel-text>
                Ut enim ad minim veniam, quis nostrud exercitation.
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>

      <!-- Accordion -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Accordion (Only One Open)</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-expansion-panels variant="accordion"&gt;
  &lt;v-expansion-panel&gt;...&lt;/v-expansion-panel&gt;
&lt;/v-expansion-panels&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-expansion-panels variant="accordion">
            <v-expansion-panel>
              <v-expansion-panel-title>Item 1</v-expansion-panel-title>
              <v-expansion-panel-text>Content for item 1</v-expansion-panel-text>
            </v-expansion-panel>
            <v-expansion-panel>
              <v-expansion-panel-title>Item 2</v-expansion-panel-title>
              <v-expansion-panel-text>Content for item 2</v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
  </v-container>
</template>
