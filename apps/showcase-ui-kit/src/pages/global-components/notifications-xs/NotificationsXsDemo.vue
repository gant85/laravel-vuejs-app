<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">GLOBAL COMPONENTS</div>
      <h1 class="text-h4 font-weight-bold">Notifications XS</h1>
      <p class="text-grey-darken-1 mt-2">
        Small notification cards for compact displays and toast-like notifications.
      </p>
    </div>

    <h2 class="text-h5 mb-4">Examples</h2>
    <div class="ml-4">
      <v-row>
        <!-- Success Notification -->
        <v-col
          cols="12"
          md="6"
          lg="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Success</h3>
          <NotificationCard
            :type="NotificationCardType.Success"
            title="Success"
            message="Operation completed successfully"
            timestamp="Just now"
            dismissible />
        </v-col>

        <!-- Error Notification -->
        <v-col
          cols="12"
          md="6"
          lg="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Error</h3>
          <NotificationCard
            :type="NotificationCardType.Error"
            title="Error"
            message="An error occurred while processing your request"
            timestamp="2 mins ago"
            dismissible />
        </v-col>

        <!-- Warning Notification -->
        <v-col
          cols="12"
          md="6"
          lg="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Warning</h3>
          <NotificationCard
            :type="NotificationCardType.Warning"
            title="Warning"
            message="Please review your changes before continuing"
            timestamp="5 mins ago"
            dismissible />
        </v-col>

        <!-- Info Notification -->
        <v-col
          cols="12"
          md="6"
          lg="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Information</h3>
          <NotificationCard
            :type="NotificationCardType.Info"
            title="Information"
            message="Your data has been saved automatically"
            timestamp="10 mins ago"
            dismissible />
        </v-col>

        <!-- Non-dismissible -->
        <v-col
          cols="12"
          md="6"
          lg="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Non-dismissible</h3>
          <NotificationCard
            :type="NotificationCardType.Success"
            title="Persistent"
            message="This notification cannot be dismissed"
            timestamp="1 hour ago"
            :dismissible="false" />
        </v-col>

        <!-- Long Message -->
        <v-col
          cols="12"
          md="6"
          lg="4">
          <h3 class="text-subtitle-1 font-weight-bold mb-2">Long Message</h3>
          <NotificationCard
            :type="NotificationCardType.Info"
            title="Update Available"
            message="A new version of the application is available. Please save your work and refresh the page to get the latest features and bug fixes."
            timestamp="Today at 9:30 AM"
            dismissible />
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup lang="ts">
import {
  NotificationCard,
  NotificationCardTypeEnum as NotificationCardType,
} from '@reference-app-laravel-vue/ui-kit';
</script>
