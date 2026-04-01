<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Elevations</h1>
      <p class="text-grey-darken-1 mt-2">
        Elevation demonstrates how components use shadows to create depth.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <v-row>
        <v-col
          v-for="elevation in elevations"
          :key="elevation"
          cols="12"
          sm="6"
          md="4">
          <v-card
            :elevation="elevation"
            class="pa-4 text-center">
            <p class="text-subtitle-2 mb-2">Elevation {{ elevation }}</p>
            <p class="text-caption text-grey">elevation="{{ elevation }}"</p>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const elevations = [0, 1, 2, 4, 6, 8, 12, 16, 24];
</script>
