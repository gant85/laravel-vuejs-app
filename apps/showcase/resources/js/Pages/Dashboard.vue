<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import {
  Button,
  Label,
  Panel,
  NotificationCard,
  NotificationCardTypeEnum as NotificationCardType,
  ProgressIndicatorLinear,
  MessageBar,
  MessageBarTypeEnum as MessageBarType,
} from '@reference-app-laravel-vue/ui-kit';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Post {
  id: number;
  title: string;
  body: string;
}

const props = defineProps<{
  users?: User[];
  posts?: Post[];
  statistics?: {
    total_users: number;
    total_posts: number;
    active_users: number;
    growth_rate: number;
  };
}>();

// Get authenticated user from shared data
const page = usePage();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const authUser = (page.props.auth as any)?.user as {
  id: number;
  name: string;
  email: string;
  avatar?: string;
  entra_roles: string[];
  entra_groups: string[];
} | null;
const user = authUser;

// Stats Data from props or defaults
const stats = computed(() => [
  {
    title: 'Total Users',
    value: props.statistics?.total_users?.toString() || '0',
    icon: 'group',
    color: 'primary',
  },
  {
    title: 'Total Posts',
    value: props.statistics?.total_posts?.toString() || '0',
    icon: 'article',
    color: 'secondary',
  },
  {
    title: 'Active Users',
    value: props.statistics?.active_users?.toString() || '0',
    icon: 'how_to_reg',
    color: 'success',
  },
  {
    title: 'Growth Rate',
    value: `${props.statistics?.growth_rate || 0}%`,
    icon: 'trending_up',
    color: 'info',
  },
]);

// Notifications
const notifications = ref([
  {
    type: NotificationCardType.Success,
    title: 'Welcome!',
    message: 'You have successfully logged in',
    timestamp: 'Just now',
  },
  {
    type: NotificationCardType.Info,
    title: 'System Info',
    message: 'Dashboard loaded successfully',
    timestamp: '1 min ago',
  },
]);

const messageBarVisible = ref(true);

const dismissNotification = (index: number) => {
  notifications.value.splice(index, 1);
};
</script>

<template>
  <AppLayout title="Dashboard">
    <!-- Welcome Header -->
    <v-row>
      <v-col cols="12">
        <v-card
          color="primary"
          variant="flat"
          class="rounded-lg">
          <v-card-text class="pa-6">
            <div class="d-flex align-center justify-space-between flex-wrap">
              <div>
                <h1 class="text-h4 text-white font-weight-bold mb-2">
                  Welcome back, {{ user?.name || 'Guest' }}!
                </h1>
                <p class="text-subtitle-1 text-white opacity-90">
                  Here is your dashboard overview for today
                </p>
                <p class="text-body-2 text-white opacity-75 mt-2">
                  <v-icon
                    size="small"
                    color="white">
                    calendar_today
                  </v-icon>
                  {{
                    new Date().toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  }}
                </p>
              </div>
              <v-icon
                size="120"
                color="white"
                class="opacity-25">
                dashboard
              </v-icon>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Stats Cards -->
    <v-row class="mt-4">
      <v-col
        v-for="stat in stats"
        :key="stat.title"
        cols="12"
        sm="6"
        md="3">
        <v-card
          :color="stat.color"
          variant="tonal"
          class="rounded-lg">
          <v-card-text>
            <div class="d-flex justify-space-between align-center">
              <div>
                <p class="text-caption text-medium-emphasis">{{ stat.title }}</p>
                <h3 class="text-h4 font-weight-bold mt-2">{{ stat.value }}</h3>
              </div>
              <v-avatar
                :color="stat.color"
                size="56">
                <v-icon
                  :color="`${stat.color}-darken-2`"
                  size="32">
                  {{ stat.icon }}
                </v-icon>
              </v-avatar>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- UI Kit Components Demo -->
    <v-row class="mt-4">
      <!-- Panel Component -->
      <v-col
        cols="12"
        md="6">
        <Panel title="Quick Actions">
          <div class="d-flex flex-column gap-2 pa-4">
            <Button
              variant="elevated"
              color="primary"
              prepend-icon="person_add">
              Add New User
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              prepend-icon="description">
              Generate Report
            </Button>
            <Button
              variant="tonal"
              color="success"
              prepend-icon="check_circle">
              Complete Task
            </Button>
          </div>
        </Panel>
      </v-col>

      <!-- Notifications -->
      <v-col
        cols="12"
        md="6">
        <Panel title="Recent Notifications">
          <div class="pa-4">
            <NotificationCard
              v-for="(notification, index) in notifications"
              :key="index"
              :type="notification.type"
              :title="notification.title"
              class="mb-3">
              <div class="d-flex justify-space-between align-center">
                <div>
                  <p class="mb-0">{{ notification.message }}</p>
                  <p class="text-caption mt-1 mb-0 opacity-75">{{ notification.timestamp }}</p>
                </div>
                <v-btn
                  icon
                  size="small"
                  variant="text"
                  @click="dismissNotification(index)">
                  <v-icon size="small">close</v-icon>
                </v-btn>
              </div>
            </NotificationCard>
          </div>
        </Panel>
      </v-col>
    </v-row>

    <!-- Entra ID Identity Panel -->
    <v-row class="mt-4">
      <v-col
        cols="12"
        md="6">
        <Panel title="Entra ID Roles">
          <div class="pa-4">
            <p
              v-if="!user?.entra_roles?.length"
              class="text-body-2 text-medium-emphasis">
              No app roles assigned.
            </p>
            <div
              v-else
              class="d-flex flex-wrap gap-2">
              <Label
                v-for="role in user.entra_roles"
                :key="role"
                color="brand">
                {{ role }}
              </Label>
            </div>
          </div>
        </Panel>
      </v-col>

      <v-col
        cols="12"
        md="6">
        <Panel title="Entra ID Groups">
          <div class="pa-4">
            <p
              v-if="!user?.entra_groups?.length"
              class="text-body-2 text-medium-emphasis">
              No group memberships returned.
            </p>
            <div
              v-else
              class="d-flex flex-wrap gap-2">
              <Label
                v-for="group in user.entra_groups"
                :key="group"
                color="info">
                {{ group }}
              </Label>
            </div>
          </div>
        </Panel>
      </v-col>
    </v-row>

    <!-- Progress Indicators -->
    <v-row class="mt-4">
      <v-col cols="12">
        <Panel title="System Resources">
          <div class="pa-4">
            <div class="mb-4">
              <div class="d-flex justify-space-between mb-2">
                <span class="text-body-2">CPU Usage</span>
                <span class="text-body-2 font-weight-bold">65%</span>
              </div>
              <ProgressIndicatorLinear
                :value="65"
                color="primary" />
            </div>

            <div class="mb-4">
              <div class="d-flex justify-space-between mb-2">
                <span class="text-body-2">Memory Usage</span>
                <span class="text-body-2 font-weight-bold">82%</span>
              </div>
              <ProgressIndicatorLinear
                :value="82"
                color="warning" />
            </div>

            <div>
              <div class="d-flex justify-space-between mb-2">
                <span class="text-body-2">Disk Usage</span>
                <span class="text-body-2 font-weight-bold">45%</span>
              </div>
              <ProgressIndicatorLinear
                :value="45"
                color="success" />
            </div>
          </div>
        </Panel>
      </v-col>
    </v-row>

    <!-- Message Bar Demo -->
    <v-row class="mt-4">
      <v-col cols="12">
        <MessageBar
          v-model="messageBarVisible"
          closable
          :type="MessageBarType.Info">
          This is a demo dashboard showcasing UI-kit components from the shared library
        </MessageBar>
      </v-col>
    </v-row>
  </AppLayout>
</template>

<style scoped>
.gap-2 {
  gap: 0.5rem;
}

.gap-3 {
  gap: 0.75rem;
}
</style>
