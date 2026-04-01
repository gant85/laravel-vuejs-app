<script setup lang="ts">
import { computed } from 'vue';
import { Head, usePage } from '@inertiajs/vue3';

interface PageProps {
  errors?: {
    error?: string;
  };
  [key: string]: unknown;
}

// Redirect to Azure login on component mount
const loginWithAzure = () => {
  window.location.href = '/auth/azure';
};

const page = usePage<PageProps>();
const authError = computed(() => page.props.errors?.error ?? '');
</script>

<template>
  <Head title="Login" />

  <v-app>
    <v-main>
      <v-container
        class="fill-height"
        fluid>
        <v-row
          align="center"
          justify="center">
          <v-col
            cols="12"
            sm="8"
            md="6"
            lg="4"
            xl="3">
            <v-card
              elevation="12"
              class="mx-auto">
              <v-card-title class="text-h5 text-center bg-primary py-6">
                <v-icon
                  size="large"
                  class="mr-2">
                  mdi-hospital-building
                </v-icon>
                Showcase Application
              </v-card-title>

              <v-card-text class="pa-8">
                <v-alert
                  v-if="authError"
                  type="error"
                  variant="tonal"
                  class="mb-6">
                  {{ authError }}
                </v-alert>

                <div class="text-center mb-6">
                  <v-icon
                    size="80"
                    color="primary">
                    mdi-shield-lock
                  </v-icon>
                  <h2 class="text-h6 mt-4 mb-2">Secure Entra Login</h2>
                  <p class="text-body-2 text-medium-emphasis">
                    Sign in with your Microsoft Entra ID account to continue
                  </p>
                </div>

                <v-divider class="mb-6" />

                <v-btn
                  block
                  size="large"
                  color="primary"
                  variant="flat"
                  prepend-icon="mdi-microsoft"
                  @click="loginWithAzure">
                  Sign in with Microsoft
                </v-btn>

                <div class="text-center mt-6">
                  <v-chip
                    size="small"
                    variant="outlined"
                    color="primary">
                    <v-icon
                      start
                      size="small">
                      mdi-shield-check
                    </v-icon>
                    Microsoft Entra ID Protected
                  </v-chip>
                </div>
              </v-card-text>

              <v-card-actions class="bg-grey-lighten-4 pa-4">
                <v-spacer />
                <small class="text-caption text-medium-emphasis">
                  Powered by Microsoft Entra ID
                </small>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
