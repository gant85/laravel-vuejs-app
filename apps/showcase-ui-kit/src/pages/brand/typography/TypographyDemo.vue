<template>
  <v-container>
    <!-- Header -->
    <div class="mb-8">
      <div class="text-caption text-grey-darken-1">BRAND</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Typography</h1>
        <v-chip
          class="ml-2"
          color="success"
          size="small"
          variant="tonal">
          Complete
        </v-chip>
      </div>
      <p class="text-grey-darken-1 mt-2">
        AH Design System type scale based on Material Design 3. Font family:
        <strong>Open Sans</strong>. Each role supports four weights: Regular, Light (-lt), SemiBold
        (-sb), Bold (-bd).
      </p>
    </div>

    <!-- One section per role -->
    <template
      v-for="role in roles"
      :key="role.name">
      <h2 class="text-h5 mb-4 text-capitalize">{{ role.name }}</h2>

      <v-table
        density="compact"
        class="mb-12 typography-table">
        <thead>
          <tr>
            <th
              class="text-left"
              style="min-width: 120px">
              Size
            </th>
            <th
              v-for="w in weights"
              :key="w.key"
              class="text-left"
              style="min-width: 220px">
              <span class="text-caption font-weight-bold text-uppercase">{{ w.label }}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="size in role.sizes"
            :key="size.key">
            <!-- Size label + specs -->
            <td class="align-top pt-3">
              <code class="text-caption">{{ size.label }}</code>
              <br />
              <span class="text-caption text-grey-darken-1">
                {{ size.fontSizePx }}/{{ size.lineHeightPx }}
              </span>
            </td>
            <!-- Each weight column -->
            <td
              v-for="w in weights"
              :key="w.key"
              class="align-top pt-3">
              <!-- Sample text with the generated class -->
              <span :class="cssClass(role.name, size.key, w.key)">
                {{ role.sampleText }}
              </span>
              <br />
              <span class="text-caption text-grey-darken-2">
                <code>.{{ cssClass(role.name, size.key, w.key) }}</code>
              </span>
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>
  </v-container>
</template>

<script setup lang="ts">
import { typeClass } from '@reference-app-laravel-vue/ui-kit';
import type {
  TypeScaleRole,
  TypeScaleSize,
  TypeScaleWeight,
} from '@reference-app-laravel-vue/ui-kit';

// ── Weight columns ──────────────────────────────────────────────
const weights: { key: TypeScaleWeight; label: string; suffix: string }[] = [
  { key: 'regular', label: 'Regular', suffix: '' },
  { key: 'light', label: 'Light', suffix: 'lt' },
  { key: 'semibold', label: 'SemiBold', suffix: 'sb' },
  { key: 'bold', label: 'Bold', suffix: 'bd' },
];

// ── Size data per role (px values from Figma / _typography.scss) ─
interface SizeEntry {
  key: TypeScaleSize;
  label: string;
  fontSizePx: number;
  lineHeightPx: number;
}

interface RoleEntry {
  name: TypeScaleRole;
  sampleText: string;
  sizes: SizeEntry[];
}

const roles: RoleEntry[] = [
  {
    name: 'display',
    sampleText: 'Display',
    sizes: [
      { key: 'large', label: 'Large', fontSizePx: 57, lineHeightPx: 64 },
      { key: 'medium', label: 'Medium', fontSizePx: 45, lineHeightPx: 52 },
      { key: 'small', label: 'Small', fontSizePx: 36, lineHeightPx: 44 },
    ],
  },
  {
    name: 'headline',
    sampleText: 'Headline',
    sizes: [
      { key: 'large', label: 'Large', fontSizePx: 32, lineHeightPx: 40 },
      { key: 'medium', label: 'Medium', fontSizePx: 28, lineHeightPx: 36 },
      { key: 'small', label: 'Small', fontSizePx: 24, lineHeightPx: 32 },
    ],
  },
  {
    name: 'title',
    sampleText: 'Title',
    sizes: [
      { key: 'large', label: 'Large', fontSizePx: 22, lineHeightPx: 28 },
      { key: 'medium', label: 'Medium', fontSizePx: 16, lineHeightPx: 24 },
      { key: 'small', label: 'Small', fontSizePx: 14, lineHeightPx: 20 },
    ],
  },
  {
    name: 'label',
    sampleText: 'Label',
    sizes: [
      { key: 'large', label: 'Large', fontSizePx: 14, lineHeightPx: 20 },
      { key: 'medium', label: 'Medium', fontSizePx: 12, lineHeightPx: 16 },
      { key: 'small', label: 'Small', fontSizePx: 11, lineHeightPx: 16 },
      { key: 'extraSmall', label: 'Extra-small', fontSizePx: 10, lineHeightPx: 14 },
    ],
  },
  {
    name: 'body',
    sampleText: 'Body',
    sizes: [
      { key: 'large', label: 'Large', fontSizePx: 16, lineHeightPx: 24 },
      { key: 'medium', label: 'Medium', fontSizePx: 14, lineHeightPx: 20 },
      { key: 'small', label: 'Small', fontSizePx: 12, lineHeightPx: 16 },
    ],
  },
];

// ── Helper ───────────────────────────────────────────────────────
function cssClass(role: TypeScaleRole, size: TypeScaleSize, weight: TypeScaleWeight): string {
  return typeClass(role, size, weight);
}
</script>

<style scoped>
.typography-table :deep(td),
.typography-table :deep(th) {
  white-space: nowrap;
}
</style>
