<template>
  <v-container>
    <!-- Header -->
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">COMPONENTS</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Buttons</h1>
        <v-chip
          class="ml-2"
          color="primary"
          size="small"
          variant="tonal">
          In progress
        </v-chip>
      </div>
      <p class="text-grey-darken-1 mt-2">
        Buttons communicate the action that will occur when the user interacts with them.
        <a
          class="text-primary"
          href="https://zeroheight.com/9ced1a3e9/p/75c83d-buttons"
          target="_blank">
          Button PILL
        </a>
      </p>
    </div>

    <!-- Permutation table -->
    <h2 class="text-h5 mb-4">Permutations</h2>
    <p class="text-grey-darken-1 mb-4">
      All combinations of <strong>size</strong> × <strong>variant</strong> × <strong>color</strong>,
      each shown in normal, pressed, and disabled state. All buttons include a leading icon.
    </p>

    <v-table
      density="compact"
      class="mb-12">
      <thead>
        <tr>
          <th
            class="text-left"
            style="min-width: 80px">
            Size
          </th>
          <th
            class="text-left"
            style="min-width: 60px">
            State
          </th>
          <th
            v-for="col in columns"
            :key="col.key"
            class="text-center"
            style="min-width: 160px">
            <span class="text-caption font-weight-bold text-uppercase">{{ col.variant }}</span>
            <br />
            <span class="text-caption text-grey-darken-1">{{ col.color }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="size in sizes"
          :key="size">
          <tr
            v-for="(state, stateIdx) in states"
            :key="`${size}-${state.label}`">
            <!-- Size label (rowspan) -->
            <td
              v-if="stateIdx === 0"
              :rowspan="states.length"
              class="align-top pt-3">
              <code class="text-caption">{{ size }}</code>
            </td>
            <!-- State label -->
            <td>
              <span class="text-caption">{{ state.label }}</span>
            </td>
            <!-- Buttons -->
            <td
              v-for="col in columns"
              :key="col.key"
              class="text-center py-2">
              <Button
                :size="size"
                :variant="col.variant"
                :color="col.color"
                :disabled="state.disabled"
                :active="state.active"
                prepend-icon="add">
                Label
              </Button>
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>

    <!-- Icon buttons -->
    <h2 class="text-h5 mb-4">Icon Buttons</h2>
    <v-table
      density="compact"
      class="mb-12">
      <thead>
        <tr>
          <th class="text-left">Size</th>
          <th class="text-left">State</th>
          <th
            v-for="color in iconColors"
            :key="color"
            class="text-center">
            <span class="text-caption font-weight-bold text-uppercase">{{ color }}</span>
          </th>
        </tr>
      </thead>
      <tbody>
        <template
          v-for="size in sizes"
          :key="size">
          <tr
            v-for="(state, stateIdx) in states"
            :key="`icon-${size}-${state.label}`">
            <td
              v-if="stateIdx === 0"
              :rowspan="states.length"
              class="align-top pt-3">
              <code class="text-caption">{{ size }}</code>
            </td>
            <td>
              <span class="text-caption">{{ state.label }}</span>
            </td>
            <td
              v-for="color in iconColors"
              :key="color"
              class="text-center py-2">
              <v-btn
                icon="add"
                :size="size"
                :color="color"
                :disabled="state.disabled"
                :active="state.active" />
            </td>
          </tr>
        </template>
      </tbody>
    </v-table>
  </v-container>
</template>

<script setup lang="ts">
import { Button } from '@reference-app-laravel-vue/ui-kit';

const sizes = ['small', 'default', 'large'] as const;

type Variant = 'flat' | 'outlined' | 'text';

const columns: { key: string; variant: Variant; color: string }[] = [
  { key: 'flat-primary', variant: 'flat', color: 'primary' },
  { key: 'outlined-secondary', variant: 'outlined', color: 'secondary' },
  { key: 'text-secondary', variant: 'text', color: 'secondary' },
];

const states = [
  { label: 'Normal', disabled: false, active: false },
  { label: 'Pressed', disabled: false, active: true },
  { label: 'Disabled', disabled: true, active: false },
] as const;

const iconColors = ['primary', 'secondary', 'error'] as const;
</script>
