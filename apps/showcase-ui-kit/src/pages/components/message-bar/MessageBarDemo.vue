<template>
  <v-container>
    <h1 class="text-h4 mb-6">Message Bar Demo</h1>
    <v-row>
      <v-col cols="12">
        <v-btn @click="showSuccess = true">Show Success</v-btn>
        <MessageBar
          v-model="showSuccess"
          :type="MessageBarType.Success"
          message="Success message bar example" />
      </v-col>
      <v-col cols="12">
        <v-btn @click="showError = true">Show Error</v-btn>
        <MessageBar
          v-model="showError"
          :type="MessageBarType.Error"
          message="Error message bar example" />
      </v-col>
      <v-col cols="12">
        <v-btn @click="showWarning = true">Show Warning</v-btn>
        <MessageBar
          v-model="showWarning"
          :type="MessageBarType.Warning"
          message="Warning message bar example" />
      </v-col>
      <v-col cols="12">
        <v-btn @click="showInfo = true">Show Info</v-btn>
        <MessageBar
          v-model="showInfo"
          :type="MessageBarType.Information"
          message="Info message bar example" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { MessageBar, MessageBarTypeEnum as MessageBarType } from '@reference-app-laravel-vue/ui-kit';

const showSuccess = ref(false);
const showError = ref(false);
const showWarning = ref(false);
const showInfo = ref(false);
</script>
