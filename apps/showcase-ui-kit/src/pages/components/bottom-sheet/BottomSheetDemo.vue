<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Bottom Sheet</h1>
      <p class="text-grey-darken-1 mt-2">
        Mobile bottom sheets allow users to complete a series of simple steps within a larger task.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Bottom Sheet -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Bottom Sheet</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre
            class="text-caption"><code>&lt;v-btn @click="sheet = true"&gt;Open Bottom Sheet&lt;/v-btn&gt;
&lt;v-bottom-sheet v-model="sheet"&gt;
  &lt;v-card&gt;
    &lt;v-card-title&gt;Title&lt;/v-card-title&gt;
    &lt;v-card-text&gt;Content&lt;/v-card-text&gt;
  &lt;/v-card&gt;
&lt;/v-bottom-sheet&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-btn @click="basicSheet = true">Open Bottom Sheet</v-btn>
          <v-bottom-sheet v-model="basicSheet">
            <v-card>
              <v-card-title>Bottom Sheet Title</v-card-title>
              <v-card-text>
                <p class="mb-4">
                  This is a bottom sheet component. It slides up from the bottom of the screen.
                </p>
                <p>
                  Bottom sheets are commonly used on mobile devices for quick actions or selections.
                </p>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  variant="text"
                  @click="basicSheet = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-bottom-sheet>
        </div>
      </div>

      <!-- Bottom Sheet with List -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">With List</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-bottom-sheet v-model="sheet"&gt;
  &lt;v-list&gt;
    &lt;v-list-item&gt;Item 1&lt;/v-list-item&gt;
    &lt;v-list-item&gt;Item 2&lt;/v-list-item&gt;
  &lt;/v-list&gt;
&lt;/v-bottom-sheet&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-btn @click="listSheet = true">Open List Sheet</v-btn>
          <v-bottom-sheet v-model="listSheet">
            <v-list>
              <v-list-item
                prepend-icon="mdi-share"
                title="Share"
                @click="listSheet = false" />
              <v-list-item
                prepend-icon="mdi-link"
                title="Get link"
                @click="listSheet = false" />
              <v-list-item
                prepend-icon="mdi-content-copy"
                title="Copy"
                @click="listSheet = false" />
              <v-list-item
                prepend-icon="mdi-delete"
                title="Delete"
                @click="listSheet = false" />
            </v-list>
          </v-bottom-sheet>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const basicSheet = ref(false);
const listSheet = ref(false);
</script>
