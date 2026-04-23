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
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.basicDialog"></HighlightedCode>
        </v-sheet>
        <div class="mt-4">
          <v-btn
            color="primary"
            variant="flat"
            @click="basicDialog = true"
            >Open basic dialog</v-btn
          >
          <v-dialog
            v-model="basicDialog"
            max-width="560"
            min-width="380">
            <v-card
              elevation="0"
              prepend-icon="star">
              <template v-slot:title>
                <span class="text-body-large-sb">Basic dialog title</span>
              </template>
              <template v-slot:append>
                <v-btn
                  icon="close"
                  variant="text"
                  @click="basicDialog = false"></v-btn>
              </template>
              <v-card-text class="text-body-medium">
                This is a basic dialog with some content. Dialogs are useful for displaying
                important information or getting user confirmation.
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <Button
                  size="small"
                  @click="basicDialog = false"
                  variant="outlined">
                  Close
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="flat"
                  @click="basicDialog = false">
                  Ok
                </Button>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> To add a prepend icon to the title, use the
          <code><strong>prepend-icon="icon-name"</strong></code> attribute directly on the
          <code>v-card</code> component.
        </div>
      </div>

      <!-- Confirmation Dialog -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">List Dialog</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded>
          <HighlightedCode :code="examples.listDialog"></HighlightedCode>
        </v-sheet>

        <div class="mt-4">
          <v-btn
            color="primary"
            variant="flat"
            @click="listDialog = true"
            >Open list dialog</v-btn
          >
          <v-dialog
            class="scrollable"
            v-model="listDialog"
            max-width="560"
            min-width="380"
            max-height="500px">
            <v-card elevation="0">
              <template v-slot:title>
                <span class="text-body-large-sb">List dialog</span>
              </template>
              <template v-slot:append>
                <v-btn
                  icon="close"
                  variant="text"
                  @click="listDialog = false"></v-btn>
              </template>
              <v-card-text class="text-body-medium">
                <p>
                  Dialogs are useful for displaying important information or getting user
                  confirmation.
                </p>
                <v-list
                  :items="items"
                  lines="three"
                  item-props>
                  <template v-slot:subtitle="{ subtitle }">
                    <div v-html="subtitle"></div>
                  </template>
                </v-list>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <Button
                  size="small"
                  @click="listDialog = false"
                  variant="outlined">
                  Close
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="flat"
                  @click="listDialog = false">
                  Ok
                </Button>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> To make the dialog scrollable, add the
          <code><strong>scrollable</strong></code> class to the <code>v-dialog</code> component and
          set a <code>max-height</code> (e.g., <code>max-height="500px"</code>).
        </div>
        <p class="text-body-medium-sb mt-6">
          For more details, refer to the
          <a
            href="https://v3.vuetifyjs.com/en/components/dialogs/#usage"
            target="_blank"
            class="text-primary text-decoration-none"
            >Official Vuetify Documentation</a
          >.
        </p>
      </div>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@reference-app-laravel-vue/ui-kit';
import HighlightedCode from '../../../components/HighlightedCode.vue';

const basicDialog = ref(false);
const listDialog = ref(false);

const examples = {
  basicDialog: `
  <v-btn color="primary" variant="flat" @click="basicDialog = true">Open basic dialog</v-btn>
  <v-dialog v-model="basicDialog" max-width="560" min-width="380">
    <v-card elevation="0" prepend-icon="star">
      <template v-slot:title>
        <span class="text-body-large-sb">Basic dialog title</span>
      </template>
      <template v-slot:append>
        <v-btn icon="close" variant="text" @click="basicDialog = false"></v-btn>
      </template>
      <v-card-text class="text-body-medium">
          This is a basic dialog with some content. Dialogs are useful for displaying
          important information or getting user confirmation.
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <Button size="small" @click="basicDialog = false" variant="outlined">
          Close
        </Button>
        <Button size="small" color="primary" variant="flat" @click="basicDialog = false">
          Ok
        </Button>
      </v-card-actions>
    </v-card>
  </v-dialog>`,
  listDialog: `
  <v-btn color="primary" variant="flat" @click="listDialog = true">Open list dialog</v-btn>
  <v-dialog class="scrollable" v-model="listDialog" max-width="560" min-width="380" max-height="500px">
    <v-card elevation="0">
    <template v-slot:title>
      <span class="text-body-large-sb">List dialog</span>
    </template>
    <template v-slot:append>
      <v-btn icon="close" variant="text" @click="listDialog = false"></v-btn>
    </template>
    <v-card-text class="text-body-medium">
      <p>
        Dialogs are useful for displaying important information or getting user
        confirmation.
      </p>
      <v-list :items="items" lines="three" item-props>
        <template v-slot:subtitle="{ subtitle }">
           <div v-html="subtitle"></div>
        </template>
      </v-list>
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <Button size="small" @click="listDialog = false" variant="outlined">
          Close
        </Button>
        <Button size="small" color="primary" variant="flat" @click="listDialog = false">
          Ok
        </Button>
      </v-card-actions>
    </v-card>
  </v-dialog>
  `,
};

const items = [
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
    title: 'Brunch this weekend?',
    subtitle: `<span class="text-body-medium">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
    title: 'Summer BBQ',
    subtitle: `<span class="text-body-medium">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
    title: 'Oui oui',
    subtitle:
      '<span class="text-body-medium">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
    title: 'Birthday gift',
    subtitle:
      '<span class="text-body-medium">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
  },
  { type: 'divider', inset: true },
  {
    prependAvatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
    title: 'Recipe to try',
    subtitle:
      '<span class="text-body-medium">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
  },
];
</script>
