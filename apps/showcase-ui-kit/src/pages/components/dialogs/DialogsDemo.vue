<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Dialogs</h1>
      <p class="text-grey-darken-1 mt-2">
        Dialogs inform users about a task and can contain critical information.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Dialog -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Dialog</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre
            class="text-caption"><code>&lt;v-btn @click="dialog = true"&gt;Open Dialog&lt;/v-btn&gt;
&lt;v-dialog v-model="dialog" max-width="500"&gt;
  &lt;v-card&gt;
    &lt;v-card-title&gt;Title&lt;/v-card-title&gt;
    &lt;v-card-text&gt;Content&lt;/v-card-text&gt;
    &lt;v-card-actions&gt;
      &lt;v-btn @click="dialog = false"&gt;Close&lt;/v-btn&gt;
    &lt;/v-card-actions&gt;
  &lt;/v-card&gt;
&lt;/v-dialog&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-btn @click="basicDialog = true">Open Basic Dialog</v-btn>
          <v-dialog
            v-model="basicDialog"
            max-width="500">
            <v-card>
              <v-card-title>Dialog Title</v-card-title>
              <v-card-text>
                This is a basic dialog with some content. Dialogs are useful for displaying
                important information or getting user confirmation.
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  variant="text"
                  @click="basicDialog = false">
                  Close
                </v-btn>
                <v-btn @click="basicDialog = false">OK</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>

      <!-- Confirmation Dialog -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Confirmation Dialog</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre
            class="text-caption"><code>&lt;v-btn @click="confirmDialog = true"&gt;Delete&lt;/v-btn&gt;
&lt;v-dialog v-model="confirmDialog" max-width="400"&gt;
  &lt;v-card&gt;
    &lt;v-card-title&gt;Confirm&lt;/v-card-title&gt;
    &lt;v-card-text&gt;Are you sure?&lt;/v-card-text&gt;
    &lt;v-card-actions&gt;
      &lt;v-btn @click="confirmDialog = false"&gt;Cancel&lt;/v-btn&gt;
      &lt;v-btn color="error"&gt;Delete&lt;/v-btn&gt;
    &lt;/v-card-actions&gt;
  &lt;/v-card&gt;
&lt;/v-dialog&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-btn
            color="error"
            @click="confirmDialog = true">
            Delete Item
          </v-btn>
          <v-dialog
            v-model="confirmDialog"
            max-width="400">
            <v-card>
              <v-card-title>Confirm Deletion</v-card-title>
              <v-card-text>
                Are you sure you want to delete this item? This action cannot be undone.
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn
                  variant="text"
                  @click="confirmDialog = false">
                  Cancel
                </v-btn>
                <v-btn
                  color="error"
                  @click="confirmDialog = false">
                  Delete
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const basicDialog = ref(false);
const confirmDialog = ref(false);
</script>
