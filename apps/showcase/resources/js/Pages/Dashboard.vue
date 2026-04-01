<script setup lang="ts">
import { ref, computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import AppLayout from '@/Layouts/AppLayout.vue';
import {
  Badge,
  Button,
  Divider,
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
const user = (page.props.auth as any)?.user;

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
    icon: 'verified_user',
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
    text: 'You have successfully logged in.',
  },
  {
    type: NotificationCardType.Info,
    title: 'System Info',
    text: 'Dashboard loaded successfully.',
  },
]);
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

    <!-- Quick actions and notifications powered by ui-kit -->
    <v-row class="mt-4">
      <v-col
        cols="12"
        md="6">
        <Panel>
          <template #title>
            <div class="d-flex align-center ga-2">
              <v-icon size="18">bolt</v-icon>
              <span>Quick Actions</span>
              <Badge dot />
            </div>
          </template>

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

            <Divider class="my-3" />

            <div class="d-flex align-center gap-2">
              <Label
                text="Priority"
                color="important"
                appearance="tint" />
              <Label
                text="Healthy"
                color="success"
                appearance="filled" />
            </div>
          </div>
        </Panel>
      </v-col>

      <v-col
        cols="12"
        md="6">
        <Panel>
          <template #title>
            <div class="d-flex align-center ga-2">
              <v-icon size="18">notifications</v-icon>
              <span>Recent Notifications</span>
            </div>
          </template>

          <div class="pa-4">
            <NotificationCard
              v-for="(notification, index) in notifications"
              :key="index"
              :type="notification.type"
              :title="notification.title"
              class="mb-3">
              <p class="text-body-2 mb-0">{{ notification.text }}</p>
            </NotificationCard>
          </div>
        </Panel>
      </v-col>
    </v-row>

    <!-- Progress Indicators -->
    <v-row class="mt-4">
      <v-col cols="12">
        <Panel>
          <template #title>
            <div class="d-flex align-center ga-2">
              <v-icon size="18">monitoring</v-icon>
              <span>System Resources</span>
            </div>
          </template>

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

    <!-- Global alert powered by ui-kit -->
    <v-row class="mt-4">
      <v-col cols="12">
        <MessageBar
          :type="MessageBarType.Info"
          text="Dashboard uses shared ui-kit components to keep a consistent visual language across apps." />
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
