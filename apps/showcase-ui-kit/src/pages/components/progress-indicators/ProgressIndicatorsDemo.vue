<template>
  <v-container>
    <h1 class="text-h4 mb-6">Progress Indicators Demo</h1>

    <h2 class="text-h5 mb-4">Circular Progress</h2>
    <v-row class="mb-8">
      <v-col
        cols="12"
        md="4">
        <ProgressIndicatorCircular :value="25" />
        <p class="text-center mt-2">25%</p>
      </v-col>
      <v-col
        cols="12"
        md="4">
        <ProgressIndicatorCircular :value="50" />
        <p class="text-center mt-2">50%</p>
      </v-col>
      <v-col
        cols="12"
        md="4">
        <ProgressIndicatorCircular :value="75" />
        <p class="text-center mt-2">75%</p>
      </v-col>
    </v-row>

    <h2 class="text-h5 mb-4">Linear Progress</h2>
    <v-row>
      <v-col cols="12">
        <ProgressIndicatorLinear :value="25" />
        <p class="mt-2">25% Complete</p>
      </v-col>
      <v-col cols="12">
        <ProgressIndicatorLinear :value="50" />
        <p class="mt-2">50% Complete</p>
      </v-col>
      <v-col cols="12">
        <ProgressIndicatorLinear :value="75" />
        <p class="mt-2">75% Complete</p>
      </v-col>
      <v-col cols="12">
        <ProgressIndicatorLinear :indeterminate="true" />
        <p class="mt-2">Loading...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ProgressIndicatorCircular, ProgressIndicatorLinear } from '@reference-app-laravel-vue/ui-kit';
</script>
