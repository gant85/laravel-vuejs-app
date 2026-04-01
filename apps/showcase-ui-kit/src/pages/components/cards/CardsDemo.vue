<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Cards</h1>
      <p class="text-grey-darken-1 mt-2">
        Cards are a convenient means of displaying content composed of different elements.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <v-row>
        <!-- Basic Card -->
        <v-col
          cols="12"
          md="6">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Basic Card</h3>
          <v-card>
            <v-card-title>Card Title</v-card-title>
            <v-card-text>
              This is a basic card with a title and some content. Cards can contain various types of
              content and actions.
            </v-card-text>
            <v-card-actions>
              <v-btn variant="text">Action</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Card with Image -->
        <v-col
          cols="12"
          md="6">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Card with Image</h3>
          <v-card>
            <v-img
              src="https://picsum.photos/400/200"
              height="200"
              cover />
            <v-card-title>Image Card</v-card-title>
            <v-card-text> Cards can include images along with text content. </v-card-text>
            <v-card-actions>
              <v-btn variant="text">Learn More</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- Outlined Card -->
        <v-col
          cols="12"
          md="6">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Outlined Card</h3>
          <v-card variant="outlined">
            <v-card-title>Outlined Card</v-card-title>
            <v-card-text>
              This card uses the outlined variant for a different visual style.
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Card with Elevation -->
        <v-col
          cols="12"
          md="6">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Card with Elevation</h3>
          <v-card elevation="8">
            <v-card-title>Elevated Card</v-card-title>
            <v-card-text> This card has a higher elevation for more visual depth. </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>
