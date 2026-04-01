<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Menus</h1>
      <p class="text-grey-darken-1 mt-2">
        Menus display a list of choices on temporary surfaces.
        <a
          class="text-primary"
          href="https://zeroheight.com/9ced1a3e9/p/00ba76-menus"
          target="_blank">
          Menu PILL
        </a>
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <!-- Basic Menu -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Menu</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-menu&gt;
  &lt;template #activator="{ props }"&gt;
    &lt;v-btn v-bind="props"&gt;Menu&lt;/v-btn&gt;
  &lt;/template&gt;
  &lt;v-list&gt;
    &lt;v-list-item&gt;Item 1&lt;/v-list-item&gt;
    &lt;v-list-item&gt;Item 2&lt;/v-list-item&gt;
  &lt;/v-list&gt;
&lt;/v-menu&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-menu>
            <template #activator="{ props }">
              <v-btn v-bind="props">Menu</v-btn>
            </template>
            <v-list>
              <v-list-item title="Item 1" />
              <v-list-item title="Item 2" />
              <v-list-item title="Item 3" />
            </v-list>
          </v-menu>
        </div>
      </div>

      <!-- Icon Menu -->
      <div class="mb-8">
        <h3 class="text-subtitle-1 font-weight-bold mb-2">Icon Menu</h3>
        <v-sheet
          class="pa-4"
          color="grey-lighten-4"
          rounded>
          <pre class="text-caption"><code>&lt;v-menu&gt;
  &lt;template #activator="{ props }"&gt;
    &lt;v-btn icon="mdi-dots-vertical" v-bind="props" /&gt;
  &lt;/template&gt;
  &lt;v-list&gt;
    &lt;v-list-item prepend-icon="mdi-pencil"&gt;Edit&lt;/v-list-item&gt;
  &lt;/v-list&gt;
&lt;/v-menu&gt;</code></pre>
        </v-sheet>
        <div class="mt-4">
          <v-menu>
            <template #activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                v-bind="props" />
            </template>
            <v-list>
              <v-list-item
                prepend-icon="mdi-pencil"
                title="Edit" />
              <v-list-item
                prepend-icon="mdi-delete"
                title="Delete" />
              <v-list-item
                prepend-icon="mdi-share"
                title="Share" />
            </v-list>
          </v-menu>
        </div>
      </div>
    </div>
  </v-container>
</template>
