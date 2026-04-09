<script setup lang="ts">
import { ref } from 'vue';
import { Head, router, usePage } from '@inertiajs/vue3';
import {
  MessageBar,
  MessageBarTypeEnum as MessageBarType,
} from '@reference-app-laravel-vue/ui-kit';

defineProps<{
  title?: string;
}>();

// Define the expected user/auth types for Inertia page props
interface User {
  id: number;
  name: string;
  email: string;
  avatar?: string;
}

interface PageProps {
  auth?: {
    user?: User;
  };
  [key: string]: unknown;
}

const page = usePage<PageProps>();
const user = page.props.auth?.user;

const drawer = ref(true);
const notifications = ref(3);
const userMenuOpen = ref(false);
const systemMessageVisible = ref(true);

const menuItems = [{ title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/' }];

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};

const logout = () => {
  router.post('/logout');
};
</script>

<template>
  <div>
    <Head :title="title" />

    <v-app>
      <!-- App Bar / Header -->
      <v-app-bar
        color="primary"
        prominent
        elevation="2">
        <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="d-flex align-center">
          <v-icon
            start
            size="large">
            mdi-view-dashboard
          </v-icon>
          <span class="text-h6 font-weight-bold"> Showcase Application </span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

        <!-- Search Bar -->
        <v-text-field
          variant="solo"
          density="compact"
          prepend-inner-icon="mdi-magnify"
          placeholder="Search users, events..."
          hide-details
          single-line
          class="mr-4"
          style="max-width: 400px"></v-text-field>

        <!-- Notifications -->
        <v-btn
          icon
          size="large">
          <v-badge
            :content="notifications"
            color="error"
            overlap>
            <v-icon>mdi-bell-outline</v-icon>
          </v-badge>
        </v-btn>

        <!-- User Menu -->
        <v-menu
          v-if="user"
          v-model="userMenuOpen"
          :close-on-content-click="false"
          location="bottom">
          <template #activator="{ props }">
            <v-btn
              icon
              size="large"
              v-bind="props">
              <v-avatar
                :image="user.avatar"
                :color="user.avatar ? undefined : 'secondary'">
                <span v-if="!user.avatar">{{ user.name?.charAt(0).toUpperCase() }}</span>
              </v-avatar>
            </v-btn>
          </template>

          <v-card min-width="300">
            <v-list>
              <v-list-item
                :prepend-avatar="user.avatar"
                :title="user.name"
                :subtitle="user.email">
                <template
                  v-if="!user.avatar"
                  #prepend>
                  <v-avatar color="primary">
                    <span class="text-white">{{ user.name?.charAt(0).toUpperCase() }}</span>
                  </v-avatar>
                </template>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list density="compact">
              <v-list-item
                prepend-icon="mdi-account-circle"
                title="Profile"></v-list-item>
              <v-list-item
                prepend-icon="mdi-cog"
                title="Settings"></v-list-item>
              <v-list-item
                prepend-icon="mdi-help-circle"
                title="Help"></v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn
                variant="text"
                color="error"
                block
                @click="logout">
                <v-icon start>mdi-logout</v-icon>
                Logout
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-app-bar>

      <!-- Navigation Drawer / Sidebar -->
      <v-navigation-drawer
        v-model="drawer"
        :rail="!drawer"
        permanent
        color="surface">
        <!-- Logo / Brand -->
        <div class="pa-4 d-flex align-center">
          <v-icon
            size="32"
            color="primary">
            mdi-application
          </v-icon>
          <span
            v-if="drawer"
            class="ml-3 text-h6 font-weight-bold">
            Dashboard
          </span>
        </div>

        <v-divider></v-divider>

        <!-- Menu Items -->
        <v-list
          density="compact"
          nav>
          <v-list-item
            v-for="item in menuItems"
            :key="item.title"
            :prepend-icon="item.icon"
            :title="item.title"
            :to="item.to"
            :value="item.title"
            rounded="xl"
            class="my-1"></v-list-item>

          <v-divider class="my-2"></v-divider>

          <v-list-item
            prepend-icon="mdi-cog"
            title="Settings"
            value="settings"
            rounded="xl"></v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Main Content Area -->
      <v-main>
        <!-- System Message Bar -->
        <MessageBar
          v-model="systemMessageVisible"
          :type="MessageBarType.Information"
          message="System is running smoothly. All services are operational."
          action="Details"
          @action="() => console.log('View details clicked')" />

        <v-container
          fluid
          class="pa-6">
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </div>
</template>

<style scoped>
/* Custom styles for the layout */
.v-navigation-drawer {
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.v-list-item {
  margin: 0 8px;
}

.v-list-item--active {
  background-color: rgb(var(--v-theme-primary), 0.1);
}
</style>
