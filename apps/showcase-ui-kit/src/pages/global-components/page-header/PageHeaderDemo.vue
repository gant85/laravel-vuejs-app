<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">GLOBAL COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Page Header</h1>
        <v-chip
          class="ml-2"
          color="primary"
          size="small"
          variant="tonal">
          In progress
        </v-chip>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Page header should be used on every page. It consists of back and forward arrows and a page
        title. In Dispense app it also displays bookmarks, allowing the user to quickly go to a
        saved task.
        <a
          class="text-primary"
          href="https://zeroheight.com/9ced1a3e9/p/76e654-page-header/b/671f02"
          target="_blank">
          Page Header PILL
        </a>
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>

    <!-- With action button -->
    <div class="mb-8 ml-4">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">With action button</h3>
      <v-sheet
        class="pa-4"
        color="grey-lighten-4"
        rounded>
        <pre class="text-caption"><code>&lt;v-app-bar elevation="2"&gt;
  &lt;v-btn icon="mdi-arrow-left" /&gt;
  &lt;v-toolbar-title&gt;Page Header&lt;/v-toolbar-title&gt;
  &lt;v-spacer /&gt;
  &lt;v-btn&gt;Main CTA&lt;/v-btn&gt;
&lt;/v-app-bar&gt;</code></pre>
      </v-sheet>
      <div class="mt-4">
        <v-app-bar elevation="2">
          <v-btn icon="mdi-arrow-left" />
          <v-toolbar-title>Page Header</v-toolbar-title>
          <v-spacer />
          <v-btn>Main CTA</v-btn>
        </v-app-bar>
      </div>
    </div>

    <!-- With 3-dot menu -->
    <div class="mb-8 ml-4">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">With 3-dot menu</h3>
      <v-sheet
        class="pa-4"
        color="grey-lighten-4"
        rounded>
        <pre class="text-caption"><code>&lt;v-app-bar elevation="2"&gt;
  &lt;v-btn icon="mdi-arrow-left" /&gt;
  &lt;v-toolbar-title&gt;Page Header&lt;/v-toolbar-title&gt;
  &lt;v-spacer /&gt;
  &lt;v-btn icon="mdi-dots-vertical" /&gt;
&lt;/v-app-bar&gt;</code></pre>
      </v-sheet>
      <div class="mt-4">
        <v-app-bar elevation="2">
          <v-btn icon="mdi-arrow-left" />
          <v-toolbar-title>Page Header</v-toolbar-title>
          <v-spacer />
          <v-btn icon="mdi-dots-vertical" />
        </v-app-bar>
      </div>
    </div>

    <!-- With back and forward arrows -->
    <div class="mb-8 ml-4">
      <h3 class="text-subtitle-1 font-weight-bold mb-2">With back and forward arrows</h3>
      <v-sheet
        class="pa-4"
        color="grey-lighten-4"
        rounded>
        <pre class="text-caption"><code>&lt;v-app-bar elevation="2"&gt;
  &lt;v-btn icon="mdi-arrow-left" /&gt;
  &lt;v-btn icon="mdi-arrow-right" disabled /&gt;
  &lt;v-toolbar-title&gt;Page Header&lt;/v-toolbar-title&gt;
&lt;/v-app-bar&gt;</code></pre>
      </v-sheet>
      <div class="mt-4">
        <v-app-bar elevation="2">
          <v-btn icon="mdi-arrow-left" />
          <v-btn
            icon="mdi-arrow-right"
            disabled />
          <v-toolbar-title>Page Header</v-toolbar-title>
        </v-app-bar>
      </div>
    </div>
  </v-container>
</template>
