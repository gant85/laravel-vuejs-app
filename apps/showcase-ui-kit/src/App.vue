<template>
  <v-app>
    <v-app-bar
      color="primary"
      density="compact">
      <v-app-bar-title>UI Kit Showcase</v-app-bar-title>
      <v-spacer />
      <v-btn
        icon="home"
        @click="router.push('/')" />
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<style>
.rxr-text-body {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
</style>
