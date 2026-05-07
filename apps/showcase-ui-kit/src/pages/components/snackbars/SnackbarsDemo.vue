<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Snackbars</h1>
      <p class="text-grey-darken-1 mt-2">
        Snackbars component is used to display a quick message to a user. Snackbars support
        positioning, removal delay, and callbacks.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Text only</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.basicSnackbar"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b text-center">
            <v-btn
              color="primary"
              @click="baseSnackbar = true"
              >Open Text only Snackbar</v-btn
            >
            <v-snackbar v-model="baseSnackbar">{{ text }}</v-snackbar>
          </div>
        </v-sheet>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">With Actions</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.actionsSnackbar"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b text-center">
            <v-btn
              color="primary"
              @click="snackbar = true"
              >Open Text & Action Snackbar</v-btn
            >
            <v-snackbar v-model="snackbar">
              {{ text }}
              <template v-slot:actions>
                <v-btn
                  color="inverse-primary"
                  size="small"
                  @click="snackbar = false"
                  >Close</v-btn
                >
                <v-btn
                  icon="close"
                  color="inverse-primary"
                  density="compact"
                  @click="snackbar = false"></v-btn>
              </template>
            </v-snackbar>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> To include interactive elements, use the
          <code><strong>v-slot:actions</strong></code
          >. This slot automatically aligns the buttons to the right side of the snackbar. You can
          combine text buttons with icon buttons for a better user experience.<br />
          Action buttons within an "black" (inverse-surface) snackbar must use the
          <code><strong>color="inverse-primary"</strong></code> attribute to comply with color
          mapping.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Multiline SnackBar</h3>

        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.multilineSnackbar"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b text-center">
            <v-btn
              color="primary"
              @click="multilineSnackbar = true">
              Open Multiline Snackbar
            </v-btn>

            <v-snackbar
              :timeout="-1"
              color="inverse-surface"
              multi-line
              v-model="multilineSnackbar">
              {{
                `I am a multi-line snackbar.\nI can have more than one line. This is another line that is quite long.`
              }}
              <template v-slot:actions>
                <v-btn
                  color="inverse-primary"
                  size="small"
                  @click="multilineSnackbar = false">
                  Close
                </v-btn>
                <v-btn
                  icon="close"
                  color="inverse-primary"
                  density="compact"
                  @click="multilineSnackbar = false"></v-btn>
              </template>
            </v-snackbar>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> For multiline snackbar add the
          <code>multiline</code> attribute on the v-snackbar tag.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Success Snackbar</h3>

        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.successSnackbar"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b text-center">
            <v-btn
              color="success"
              @click="snackbarSuccess = true">
              Open Success Snackbar
            </v-btn>

            <v-snackbar
              color="success"
              v-model="snackbarSuccess">
              <div class="d-flex">
                <v-icon
                  icon="check_circle-filled"
                  class="mr-1"></v-icon>
                <span>I am a success snackbar!</span>
              </div>
            </v-snackbar>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> To create a success notification, use the
          <code><strong>color="success"</strong></code> attribute. To display an icon before the
          text, wrap the content in a flex container (<code>d-flex</code>) and use the
          <code><strong>icon="check_circle-filled"</strong></code> for the visual indicator.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Success Snackbar with action</h3>

        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.successWithActionSnackbar"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b text-center">
            <v-btn
              color="success"
              @click="snackbarWithActionSuccess = true">
              Open Success Snackbar with Action
            </v-btn>

            <v-snackbar
              color="success"
              v-model="snackbarWithActionSuccess">
              <div class="d-flex">
                <v-icon
                  icon="check_circle-filled"
                  class="mr-1"></v-icon>
                <span>I am a success snackbar!</span>
              </div>
              <template v-slot:actions>
                <v-btn
                  size="small"
                  color="on-success"
                  @click="snackbarWithActionSuccess = false"
                  >Action</v-btn
                >
              </template>
            </v-snackbar>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> To create a success notification, use the
          <code><strong>color="success"</strong></code> attribute. To display an icon before the
          text, wrap the content in a flex container (<code>d-flex</code>) and use the
          <code><strong>icon="check_circle-filled"</strong></code> for the visual indicator.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Error Snackbar</h3>

        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.errorSnackBar"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b text-center">
            <v-btn
              color="error"
              @click="errorSnackBar = true">
              Open error Snackbar
            </v-btn>

            <v-snackbar
              color="error"
              v-model="errorSnackBar">
              <div class="d-flex">
                <v-icon
                  icon="error-filled"
                  class="mr-1"></v-icon>
                <span>{{ `I am a error snackbar!` }}</span>
              </div>
            </v-snackbar>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> To create a error notification, use the
          <code><strong>color="error"</strong></code> attribute. To display an icon before the text,
          wrap the content in a flex container (<code>d-flex</code>) and use the
          <code><strong>icon="error-filled"</strong></code> for the visual indicator.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Long Action (no icon before text)</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.longActionSnackBar"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b text-center">
            <v-btn
              color="primary"
              @click="longActionSnackBar = true">
              Open Long Action Snackbar
            </v-btn>

            <v-snackbar
              :timeout="-1"
              v-model="longActionSnackBar">
              <div class="d-flex flex-column">
                <div class="d-flex justify-space-between align-center mb-2">
                  <span>
                    {{ `I'm a snackbar with a long action button` }}
                  </span>
                  <v-btn
                    class="ml-2"
                    icon="close"
                    color="inverse-primary"
                    density="compact"
                    @click="longActionSnackBar = false"></v-btn>
                </div>

                <v-btn
                  color="inverse-primary"
                  size="small"
                  class="align-self-end"
                  @click="longActionSnackBar = false">
                  Long Action Button
                </v-btn>
              </div>
            </v-snackbar>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> For snackbars with a long action button, use the template
          above and ensure that colors and icons are configured according to the design.
        </div>
      </div>

      <div class="mb-12">
        <h3 class="text-h6 font-weight-bold mb-6">Long Action (Error)</h3>
        <v-sheet
          color="grey-lighten-4"
          rounded
          class="pa-0">
          <HighlightedCode :code="examples.longActionSnackBarError"></HighlightedCode>
          <div class="pa-8 bg-white rounded-b text-center">
            <v-btn
              color="error"
              @click="longActionSnackBarError = true">
              Open Long Action Snackbar
            </v-btn>

            <v-snackbar
              :timeout="-1"
              color="error"
              v-model="longActionSnackBarError">
              <div class="d-flex flex-column">
                <div class="d-flex justify-space-between align-baseline mb-2">
                  <div class="d-flex">
                    <v-icon
                      icon="error-filled"
                      class="mr-1"></v-icon>
                    <span>
                      {{ `I'm a snackbar with a long action button` }}
                    </span>
                  </div>

                  <v-btn
                    class="ml-2"
                    icon="close"
                    color="on-error"
                    density="compact"
                    @click="longActionSnackBarError = false"></v-btn>
                </div>

                <v-btn
                  color="on-error"
                  size="small"
                  class="align-self-end"
                  @click="longActionSnackBarError = false">
                  Long Action Button
                </v-btn>
              </div>
            </v-snackbar>
          </div>
        </v-sheet>

        <div class="text-body-medium mt-4">
          <strong>Developer Note:</strong> For snackbars with a long action button, use the template
          above and ensure that colors and icons are configured according to the design.
        </div>
      </div>

      <p class="text-body-medium-sb mt-6">
        For more details, refer to the
        <a
          href="https://v3.vuetifyjs.com/en/components/snackbars/"
          target="_blank"
          class="text-primary text-decoration-none"
          >Official Vuetify Documentation</a
        >.
      </p>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import HighlightedCode from '../../../components/HighlightedCode.vue';

const baseSnackbar = ref(false);
const multilineSnackbar = ref(false);
const snackbar = ref(false);
const snackbarSuccess = ref(false);
const snackbarWithActionSuccess = ref(false);
const errorSnackBar = ref(false);
const longActionSnackBar = ref(false);
const longActionSnackBarError = ref(false);
const text = `I am a snackbar!`;

const examples = {
  basicSnackbar: `
<v-snackbar v-model="baseSnackbar">
  {{ text }}
</v-snackbar>`,

  multilineSnackbar: `
<v-snackbar
  :timeout="-1"
  multi-line
  v-model="multilineSnackbar">
  {{ text }}
  <template v-slot:actions>
    <v-btn
      color="inverse-primary"
      size="small"
      @click="multilineSnackbar = false">
      Close
    </v-btn>
    <v-btn
      icon="close"
      color="inverse-primary"
      density="compact"
      @click="multilineSnackbar = false"></v-btn>
  </template>
</v-snackbar>`,

  successSnackbar: `
<v-snackbar
  color="success"
  v-model="snackbarSuccess">
  <div class="d-flex">
    <v-icon icon="check_circle-filled" class="mr-1"></v-icon>
    <span>I am a success snackbar!</span>
  </div>
</v-snackbar>`,

  successWithActionSnackbar: `
<v-snackbar
  color="success"
  v-model="snackbarWithActionSuccess">
  <div class="d-flex">
    <v-icon
      icon="check_circle-filled"
      class="mr-1"></v-icon>
    <span>I am a success snackbar!</span>
  </div>
  <template v-slot:actions>
    <v-btn
      size="small"
      color="on-success"
      @click="snackbarWithActionSuccess = false">
      Action
    </v-btn>
  </template>
</v-snackbar>`,

  errorSnackBar: `
<v-snackbar
  color="error"
  v-model="errorSnackBar">
  <div class="d-flex">
    <v-icon icon="error-filled" class="mr-1"></v-icon>
    <span>I am a error snackbar!</span>
  </div>
</v-snackbar>`,

  actionsSnackbar: `
<v-snackbar v-model="snackbar">
  {{ text }}
  <template v-slot:actions>
    <v-btn color="inverse-primary"  size="small" @click="snackbar = false">Close</v-btn>
    <v-btn color="inverse-primary" icon="close"  density="compact" @click="snackbar = false"></v-btn>
  </template>
</v-snackbar>`,

  longActionSnackBar: `
<v-snackbar
  :timeout="-1"
  v-model="longActionSnackBar">
  <div class="d-flex flex-column">
    <div class="d-flex justify-space-between align-center mb-2">
      <span>{{ text }}</span>
      <v-btn
        class="ml-2"
        icon="close"
        color="inverse-primary"
        density="compact"
        @click="longActionSnackBar = false"></v-btn>
    </div>
    <v-btn
      color="inverse-primary"
      size="small"
      class="align-self-end"
      @click="longActionSnackBar = false">
      Long Action Button
    </v-btn>
  </div>
</v-snackbar>`,

  longActionSnackBarError: `
<v-snackbar
  location="top right"
  :timeout="-1"
  color="error"
  v-model="longActionSnackBarError">
  <div class="d-flex flex-column">
    <div class="d-flex justify-space-between align-baseline mb-2">
      <div class="d-flex">
        <v-icon
          icon="error-filled"
          class="mr-1"></v-icon>
        <span>{{ text }}</span>
      </div>
      <v-btn
        class="ml-2"
        icon="close"
        color="on-error"
        density="compact"
        @click="longActionSnackBarError = false"></v-btn>
    </div>
    <v-btn
      size="small"
      color="on-error"
      class="align-self-end"
      @click="longActionSnackBarError = false">
      Long Action Button
    </v-btn>
  </div>
</v-snackbar>`,
};
</script>
