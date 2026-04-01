<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Tabs</h1>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Tabs organize content across different screens and views.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Tabs -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Tabs</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-tabs v-model="tab"&gt;
  &lt;v-tab value="one"&gt;Tab 1&lt;/v-tab&gt;
  &lt;v-tab value="two"&gt;Tab 2&lt;/v-tab&gt;
  &lt;v-tab value="three"&gt;Tab 3&lt;/v-tab&gt;
&lt;/v-tabs&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-tabs v-model="tab1">
            <v-tab value="one">Tab 1</v-tab>
            <v-tab value="two">Tab 2</v-tab>
            <v-tab value="three">Tab 3</v-tab>
          </v-tabs>
          <v-window v-model="tab1">
            <v-window-item value="one">
              <v-card
                flat
                class="pa-4">
                Content for Tab 1
              </v-card>
            </v-window-item>
            <v-window-item value="two">
              <v-card
                flat
                class="pa-4">
                Content for Tab 2
              </v-card>
            </v-window-item>
            <v-window-item value="three">
              <v-card
                flat
                class="pa-4">
                Content for Tab 3
              </v-card>
            </v-window-item>
          </v-window>
        </div>
      </div>

      <!-- Tabs with Icons -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Tabs with Icons</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-tabs v-model="tab"&gt;
  &lt;v-tab value="phone"&gt;
    &lt;v-icon&gt;mdi-phone&lt;/v-icon&gt;
  &lt;/v-tab&gt;
&lt;/v-tabs&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-tabs v-model="tab2">
            <v-tab value="phone">
              <v-icon>mdi-phone</v-icon>
            </v-tab>
            <v-tab value="heart">
              <v-icon>mdi-heart</v-icon>
            </v-tab>
            <v-tab value="account">
              <v-icon>mdi-account</v-icon>
            </v-tab>
          </v-tabs>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const tab1 = ref('one');
const tab2 = ref('phone');
</script>
