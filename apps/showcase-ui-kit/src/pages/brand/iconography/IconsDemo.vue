<template>
  <v-container>
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">BRAND / ICONOGRAPHY</div>
      <h1 class="text-h4 font-weight-bold">Icons</h1>
      <p class="text-grey-darken-1 mt-2">
        Material Design Icons provide a comprehensive icon library for the application.
        <a
          class="text-primary"
          href="https://materialdesignicons.com/"
          target="_blank">
          Material Design Icons
        </a>
      </p>
    </div>

    <!-- Search Bar -->
    <v-text-field
      v-model="searchQuery"
      label="Search icons"
      prepend-inner-icon="mdi-magnify"
      variant="outlined"
      clearable
      class="mb-6" />

    <!-- Common Icons Section -->
    <div class="mb-8">
      <h2 class="text-h5 mb-4">Common Icons</h2>
      <v-row>
        <v-col
          v-for="icon in filteredCommonIcons"
          :key="icon.name"
          cols="6"
          sm="4"
          md="3"
          lg="2">
          <v-card
            class="pa-3 text-center icon-card"
            hover
            @click="copyIconName(icon.name)">
            <v-icon
              size="32"
              class="mb-2">
              {{ icon.name }}
            </v-icon>
            <div class="text-caption">{{ icon.label }}</div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Sizes -->
    <div class="mb-8">
      <h2 class="text-h5 mb-4">Icon Sizes</h2>
      <div class="d-flex align-center gap-6 flex-wrap">
        <div class="text-center">
          <v-icon size="x-small">mdi-home</v-icon>
          <div class="text-caption mt-1">x-small</div>
        </div>
        <div class="text-center">
          <v-icon size="small">mdi-home</v-icon>
          <div class="text-caption mt-1">small</div>
        </div>
        <div class="text-center">
          <v-icon>mdi-home</v-icon>
          <div class="text-caption mt-1">default</div>
        </div>
        <div class="text-center">
          <v-icon size="large">mdi-home</v-icon>
          <div class="text-caption mt-1">large</div>
        </div>
        <div class="text-center">
          <v-icon size="x-large">mdi-home</v-icon>
          <div class="text-caption mt-1">x-large</div>
        </div>
      </div>
    </div>

    <!-- Colors -->
    <div class="mb-8">
      <h2 class="text-h5 mb-4">Icon Colors</h2>
      <div class="d-flex align-center gap-6 flex-wrap">
        <div class="text-center">
          <v-icon
            size="large"
            color="primary">
            mdi-heart
          </v-icon>
          <div class="text-caption mt-1">primary</div>
        </div>
        <div class="text-center">
          <v-icon
            size="large"
            color="secondary">
            mdi-heart
          </v-icon>
          <div class="text-caption mt-1">secondary</div>
        </div>
        <div class="text-center">
          <v-icon
            size="large"
            color="success">
            mdi-heart
          </v-icon>
          <div class="text-caption mt-1">success</div>
        </div>
        <div class="text-center">
          <v-icon
            size="large"
            color="warning">
            mdi-heart
          </v-icon>
          <div class="text-caption mt-1">warning</div>
        </div>
        <div class="text-center">
          <v-icon
            size="large"
            color="error">
            mdi-heart
          </v-icon>
          <div class="text-caption mt-1">error</div>
        </div>
        <div class="text-center">
          <v-icon
            size="large"
            color="info">
            mdi-heart
          </v-icon>
          <div class="text-caption mt-1">info</div>
        </div>
      </div>
    </div>

    <!-- Snackbar for copy feedback -->
    <v-snackbar
      v-model="showCopySnackbar"
      :timeout="2000"
      color="success">
      Icon name copied to clipboard
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const searchQuery = ref('');
const showCopySnackbar = ref(false);

const commonIcons = [
  { name: 'mdi-home', label: 'Home' },
  { name: 'mdi-account', label: 'Account' },
  { name: 'mdi-cog', label: 'Settings' },
  { name: 'mdi-bell', label: 'Notifications' },
  { name: 'mdi-email', label: 'Email' },
  { name: 'mdi-phone', label: 'Phone' },
  { name: 'mdi-calendar', label: 'Calendar' },
  { name: 'mdi-clock', label: 'Clock' },
  { name: 'mdi-heart', label: 'Heart' },
  { name: 'mdi-star', label: 'Star' },
  { name: 'mdi-check', label: 'Check' },
  { name: 'mdi-close', label: 'Close' },
  { name: 'mdi-plus', label: 'Plus' },
  { name: 'mdi-minus', label: 'Minus' },
  { name: 'mdi-delete', label: 'Delete' },
  { name: 'mdi-pencil', label: 'Edit' },
  { name: 'mdi-content-save', label: 'Save' },
  { name: 'mdi-download', label: 'Download' },
  { name: 'mdi-upload', label: 'Upload' },
  { name: 'mdi-share', label: 'Share' },
  { name: 'mdi-magnify', label: 'Search' },
  { name: 'mdi-filter', label: 'Filter' },
  { name: 'mdi-refresh', label: 'Refresh' },
  { name: 'mdi-information', label: 'Info' },
  { name: 'mdi-alert', label: 'Alert' },
  { name: 'mdi-help-circle', label: 'Help' },
  { name: 'mdi-menu', label: 'Menu' },
  { name: 'mdi-dots-vertical', label: 'More' },
  { name: 'mdi-arrow-left', label: 'Back' },
  { name: 'mdi-arrow-right', label: 'Forward' },
  { name: 'mdi-chevron-down', label: 'Expand' },
  { name: 'mdi-chevron-up', label: 'Collapse' },
  { name: 'mdi-file', label: 'File' },
  { name: 'mdi-folder', label: 'Folder' },
  { name: 'mdi-image', label: 'Image' },
  { name: 'mdi-video', label: 'Video' },
];

const filteredCommonIcons = computed(() => {
  if (!searchQuery.value) return commonIcons;
  const query = searchQuery.value.toLowerCase();
  return commonIcons.filter(
    icon => icon.name.toLowerCase().includes(query) || icon.label.toLowerCase().includes(query)
  );
});

const copyIconName = async (iconName: string) => {
  try {
    await navigator.clipboard.writeText(iconName);
    showCopySnackbar.value = true;
  } catch (err) {
    console.error('Failed to copy icon name:', err);
  }
};
</script>

<style scoped>
.icon-card {
  cursor: pointer;
  transition: transform 0.2s;
}

.icon-card:hover {
  transform: scale(1.05);
}

.gap-6 {
  gap: 1.5rem;
}
</style>
