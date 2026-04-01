<template>
  <v-container class="py-8">
    <!-- ═══════════════════════════════════════════════════════════════
         Header
         ═══════════════════════════════════════════════════════════════ -->
    <div class="mb-10">
      <div class="text-caption text-grey-darken-1">BRAND</div>
      <div class="d-flex align-center">
        <h1 class="text-h4 font-weight-bold">Colors</h1>
        <v-chip
          class="ml-2"
          color="success"
          size="small"
          variant="tonal">
          Complete
        </v-chip>
      </div>
      <p
        class="text-grey-darken-1 mt-2"
        style="max-width: 720px">
        Material Design 3 tonal color system. Every color below is available as a Vuetify
        <strong>color prop</strong>, <strong>utility class</strong> (<code>text-*</code> /
        <code>bg-*</code>), and <strong>CSS custom property</strong>
        (<code>--v-theme-*</code>).
      </p>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════
         Theme toggle
         ═══════════════════════════════════════════════════════════════ -->
    <div class="d-flex align-center mb-8">
      <v-btn-toggle
        v-model="activeTheme"
        mandatory
        density="comfortable"
        rounded="lg"
        color="primary">
        <v-btn value="light">
          <v-icon start>light_mode</v-icon>
          Light
        </v-btn>
        <v-btn value="dark">
          <v-icon start>dark_mode</v-icon>
          Dark
        </v-btn>
      </v-btn-toggle>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════
         Section 1 — Tonal Palettes
         ═══════════════════════════════════════════════════════════════ -->
    <section class="mb-14">
      <h2 class="text-h5 font-weight-bold mb-1">Tonal Palettes</h2>
      <p
        class="text-body-2 text-medium-emphasis mb-6"
        style="max-width: 640px">
        The raw tonal scales from which all semantic tokens are derived. Each palette provides tones
        from 0 (darkest) to 100 (lightest).
      </p>

      <div
        v-for="pal in tonalPalettes"
        :key="pal.name"
        class="mb-6">
        <div class="text-subtitle-2 font-weight-bold text-capitalize mb-2">
          {{ pal.label }}
        </div>
        <div class="palette-row">
          <div
            v-for="tone in pal.tones"
            :key="tone.key"
            class="palette-swatch"
            :style="{ backgroundColor: tone.hex }"
            @click="copySwatch(tone.hex)">
            <span
              class="swatch-tone"
              :style="{ color: tone.textColor }">
              {{ tone.key }}
            </span>
            <span
              class="swatch-hex"
              :style="{ color: tone.textColor }">
              {{ tone.hex }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <v-theme-provider
      :theme="activeTheme"
      with-background
      class="rounded-lg">
      <!-- ═══════════════════════════════════════════════════════════════
         Section 2 — Semantic Color Roles (Theme-Aware)
         ═══════════════════════════════════════════════════════════════ -->
      <section class="mb-14 px-4 pt-6">
        <h2 class="text-h5 font-weight-bold mb-1">Semantic Color Roles</h2>
        <p
          class="text-body-2 text-medium-emphasis mb-6"
          style="max-width: 640px">
          Semantic tokens mapped to the
          <strong>{{ activeTheme }}</strong> theme. Click any swatch to copy its token name.
        </p>

        <div
          v-for="group in semanticGroups"
          :key="group.title"
          class="mb-10">
          <h3 class="text-subtitle-1 font-weight-bold mb-4">{{ group.title }}</h3>

          <v-row dense>
            <v-col
              v-for="token in group.tokens"
              :key="token.name"
              cols="12"
              sm="6"
              md="4"
              lg="3">
              <div
                class="semantic-card"
                :style="{ backgroundColor: token.bg }"
                @click="copySwatch(token.name)">
                <span
                  class="semantic-label"
                  :style="{ color: token.fg }">
                  {{ token.name }}
                </span>
                <span
                  class="semantic-hex"
                  :style="{ color: token.fg }">
                  {{ token.hex }}
                </span>
                <span
                  class="semantic-tone"
                  :style="{ color: token.fg }">
                  {{ token.paletteRef }}
                </span>
              </div>
            </v-col>
          </v-row>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════════
         Section 3 — How to Use
         ═══════════════════════════════════════════════════════════════ -->
      <section class="mb-14 px-4">
        <h2 class="text-h5 font-weight-bold mb-1">How to Use</h2>
        <p
          class="text-body-2 text-medium-emphasis mb-6"
          style="max-width: 640px">
          Three ways to apply colors in your Vue components. All tokens switch automatically between
          light and dark themes.
        </p>

        <!-- Method 1: color prop -->
        <v-card
          variant="outlined"
          class="mb-6"
          rounded="lg">
          <v-card-title class="text-subtitle-1 font-weight-bold pb-0">
            1. Component <code>color</code> prop
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 text-medium-emphasis mb-3">
              Pass any semantic token name to Vuetify's <code>color</code> prop.
            </p>
            <v-sheet
              color="surface-container"
              rounded="lg"
              class="pa-4 mb-4">
              <!-- eslint-disable vue/no-v-html -->
              <pre
                class="code-block text-body-2"
                v-html="codeBlock1" />
              <!-- eslint-enable vue/no-v-html -->
            </v-sheet>
            <div class="d-flex flex-wrap ga-2">
              <v-btn color="primary">Primary</v-btn>
              <v-btn color="secondary">Secondary</v-btn>
              <v-btn color="tertiary">Tertiary</v-btn>
              <v-btn color="error">Error</v-btn>
              <v-btn color="success">Success</v-btn>
              <v-btn color="warning">Warning</v-btn>
              <v-btn color="info">Info</v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Method 2: utility classes -->
        <v-card
          variant="outlined"
          class="mb-6"
          rounded="lg">
          <v-card-title class="text-subtitle-1 font-weight-bold pb-0">
            2. Utility classes <code>text-*</code> / <code>bg-*</code>
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 text-medium-emphasis mb-3">
              Vuetify auto-generates <code>text-{token}</code> and <code>bg-{token}</code> classes
              for every color in the theme.
            </p>
            <v-sheet
              color="surface-container"
              rounded="lg"
              class="pa-4 mb-4">
              <!-- eslint-disable vue/no-v-html -->
              <pre
                class="code-block text-body-2"
                v-html="codeBlock2" />
              <!-- eslint-enable vue/no-v-html -->
            </v-sheet>
            <div class="d-flex flex-wrap ga-3">
              <div class="bg-primary-container text-on-primary-container pa-3 rounded-lg">
                primary-container
              </div>
              <div class="bg-secondary-container text-on-secondary-container pa-3 rounded-lg">
                secondary-container
              </div>
              <div class="bg-tertiary-container text-on-tertiary-container pa-3 rounded-lg">
                tertiary-container
              </div>
              <div class="bg-error-container text-on-error-container pa-3 rounded-lg">
                error-container
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Method 3: CSS custom properties -->
        <v-card
          variant="outlined"
          class="mb-6"
          rounded="lg">
          <v-card-title class="text-subtitle-1 font-weight-bold pb-0">
            3. CSS custom properties <code>--v-theme-*</code>
          </v-card-title>
          <v-card-text>
            <p class="text-body-2 text-medium-emphasis mb-3">
              For custom styling — gradients, opacity, borders. Values are comma-separated RGB.
            </p>
            <v-sheet
              color="surface-container"
              rounded="lg"
              class="pa-4 mb-4">
              <!-- eslint-disable vue/no-v-html -->
              <pre
                class="code-block text-body-2"
                v-html="codeBlock3" />
              <!-- eslint-enable vue/no-v-html -->
            </v-sheet>
            <div class="d-flex flex-wrap ga-3">
              <div class="css-var-demo css-var-demo--primary pa-3 rounded-lg">
                primary @ 8% opacity
              </div>
              <div class="css-var-demo css-var-demo--gradient pa-3 rounded-lg">
                gradient: primary → tertiary
              </div>
              <div class="css-var-demo css-var-demo--border pa-3 rounded-lg">outline border</div>
            </div>
          </v-card-text>
        </v-card>
      </section>

      <!-- ═══════════════════════════════════════════════════════════════
         Section 4 — Accessible Pairings
         ═══════════════════════════════════════════════════════════════ -->
      <section class="mb-14 px-4">
        <h2 class="text-h5 font-weight-bold mb-1">Accessible Pairings</h2>
        <p
          class="text-body-2 text-medium-emphasis mb-6"
          style="max-width: 640px">
          Each color role comes with a matching <code>on-*</code> foreground that guarantees WCAG AA
          (4.5:1) or AAA (7:1) contrast. Always use the pair together.
        </p>

        <v-row dense>
          <v-col
            v-for="pair in accessPairs"
            :key="pair.bg"
            cols="12"
            sm="6"
            md="4"
            lg="3">
            <div
              class="pair-card"
              :class="`bg-${pair.bg}`">
              <span
                class="pair-label"
                :class="`text-${pair.fg}`">
                {{ pair.label }}
              </span>
              <div class="pair-meta">
                <v-chip
                  size="x-small"
                  label
                  :class="`text-${pair.fg}`"
                  variant="outlined">
                  {{ pair.contrast }}
                </v-chip>
              </div>
              <div class="pair-tokens">
                <code :class="`text-${pair.fg}`">bg-{{ pair.bg }}</code>
                <code :class="`text-${pair.fg}`">text-{{ pair.fg }}</code>
              </div>
            </div>
          </v-col>
        </v-row>
      </section>

      <!-- ═══════════════════════════════════════════════════════════════
         Section 5 — Surface Hierarchy
         ═══════════════════════════════════════════════════════════════ -->
      <section class="mb-14 px-4">
        <h2 class="text-h5 font-weight-bold mb-1">Surface Hierarchy</h2>
        <p
          class="text-body-2 text-medium-emphasis mb-6"
          style="max-width: 640px">
          Surfaces use subtle tonal differences to create visual hierarchy without relying on
          elevation shadows alone.
        </p>

        <div class="surface-strip">
          <div
            v-for="s in surfaceLevels"
            :key="s.token"
            class="surface-block"
            :class="`bg-${s.token}`">
            <span class="text-on-surface text-caption font-weight-bold">
              {{ s.label }}
            </span>
            <code
              class="text-on-surface-variant"
              style="font-size: 10px">
              {{ s.token }}
            </code>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════════════
         Section 6 — Status Colors in Context
         ═══════════════════════════════════════════════════════════════ -->
      <section class="mb-10 px-4 pb-6">
        <h2 class="text-h5 font-weight-bold mb-1">Status Colors in Context</h2>
        <p
          class="text-body-2 text-medium-emphasis mb-6"
          style="max-width: 640px">
          How semantic status colors look when applied to common components.
        </p>

        <v-row>
          <v-col
            v-for="status in statusExamples"
            :key="status.type"
            cols="12"
            sm="6"
            md="3">
            <v-card
              variant="flat"
              :color="status.type"
              class="mb-3">
              <v-card-title class="text-subtitle-2">{{ status.title }}</v-card-title>
              <v-card-text class="text-body-2">{{ status.message }}</v-card-text>
            </v-card>

            <v-alert
              :color="status.type"
              :icon="status.icon"
              variant="flat"
              density="compact"
              class="mb-3">
              {{ status.title }}
            </v-alert>

            <div class="d-flex ga-2">
              <v-chip
                :color="status.type"
                size="small"
                label>
                {{ status.title }}
              </v-chip>
              <v-chip
                :color="status.type"
                size="small"
                variant="outlined"
                label>
                {{ status.title }}
              </v-chip>
            </div>
          </v-col>
        </v-row>
      </section>
    </v-theme-provider>

    <!-- Snackbar for copy feedback -->
    <v-snackbar
      v-model="snackbar"
      :timeout="1500"
      color="inverse-surface"
      location="bottom center">
      <span class="text-inverse-on-surface">
        Copied <strong>{{ copiedValue }}</strong>
      </span>
    </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { palettes, lightTheme, darkTheme } from '@reference-app-laravel-vue/ui-kit';

// ── Syntax Highlight Helpers ─────────────────────────────────────
const t = (s: string) => `<span class="hl-tag">${s}</span>`;
const a = (s: string) => `<span class="hl-attr">${s}</span>`;
const v = (s: string) => `<span class="hl-value">"${s}"</span>`;
const tx = (s: string) => `<span class="hl-text">${s}</span>`;
const p = (s: string) => `<span class="hl-prop">${s}</span>`;
const vl = (s: string) => `<span class="hl-css-val">${s}</span>`;
const sel = (s: string) => `<span class="hl-selector">${s}</span>`;
const cm = (s: string) => `<span class="hl-comment">${s}</span>`;

function htmlTag(tag: string, attrs: string, content: string, selfClose = false): string {
  if (selfClose) return `${t('&lt;')}${t(tag)} ${attrs}${t(' /&gt;')}`;
  return `${t('&lt;')}${t(tag)} ${attrs}${t('&gt;')}${tx(content)}${t('&lt;/')}${t(tag)}${t('&gt;')}`;
}

function attr(name: string, value: string): string {
  return `${a(name)}=${v(value)}`;
}

// ── Code Block 1: color prop (matches demo: 7 buttons) ──────────
const codeBlock1 = [
  htmlTag('v-btn', attr('color', 'primary'), 'Primary'),
  htmlTag('v-btn', attr('color', 'secondary'), 'Secondary'),
  htmlTag('v-btn', attr('color', 'tertiary'), 'Tertiary'),
  htmlTag('v-btn', attr('color', 'error'), 'Error'),
  htmlTag('v-btn', attr('color', 'success'), 'Success'),
  htmlTag('v-btn', attr('color', 'warning'), 'Warning'),
  htmlTag('v-btn', attr('color', 'info'), 'Info'),
].join('\n');

// ── Code Block 2: utility classes (matches demo: 4 containers) ──
const codeBlock2 = [
  htmlTag(
    'div',
    `${a('class')}=${v('bg-primary-container text-on-primary-container pa-3 rounded-lg')}`,
    'primary-container'
  ),
  htmlTag(
    'div',
    `${a('class')}=${v('bg-secondary-container text-on-secondary-container pa-3 rounded-lg')}`,
    'secondary-container'
  ),
  htmlTag(
    'div',
    `${a('class')}=${v('bg-tertiary-container text-on-tertiary-container pa-3 rounded-lg')}`,
    'tertiary-container'
  ),
  htmlTag(
    'div',
    `${a('class')}=${v('bg-error-container text-on-error-container pa-3 rounded-lg')}`,
    'error-container'
  ),
].join('\n');

// ── Code Block 3: CSS custom properties (matches demo: 3 boxes) ─
const codeBlock3 = [
  `${cm('/* primary @ 8% opacity */')}`,
  `${sel('.primary-overlay')} {`,
  `  ${p('color')}: ${vl('rgb(var(--v-theme-primary))')};`,
  `  ${p('background')}: ${vl('rgb(var(--v-theme-primary), 0.08)')};`,
  `}`,
  ``,
  `${cm('/* gradient: primary → tertiary */')}`,
  `${sel('.gradient-banner')} {`,
  `  ${p('color')}: ${vl('rgb(var(--v-theme-on-primary-container))')};`,
  `  ${p('background')}: ${vl('linear-gradient(')}\n    ${vl('135deg,')}\n    ${vl('rgb(var(--v-theme-primary-container)),')}\n    ${vl('rgb(var(--v-theme-tertiary-container))')}\n  ${vl(')')};`,
  `}`,
  ``,
  `${cm('/* outline border */')}`,
  `${sel('.outlined-card')} {`,
  `  ${p('color')}: ${vl('rgb(var(--v-theme-on-surface))')};`,
  `  ${p('border')}: ${vl('2px solid rgb(var(--v-theme-outline), 0.4)')};`,
  `}`,
].join('\n');

// ── Theme Toggle ─────────────────────────────────────────────────
const activeTheme = ref<'light' | 'dark'>('light');

const currentThemeColors = computed(() => {
  const theme = activeTheme.value === 'light' ? lightTheme : darkTheme;
  return theme.colors ?? {};
});

// ── Copy to clipboard ────────────────────────────────────────────
const snackbar = ref(false);
const copiedValue = ref('');

function copySwatch(value: string) {
  navigator.clipboard.writeText(value);
  copiedValue.value = value;
  snackbar.value = true;
}

// ── Helpers ──────────────────────────────────────────────────────
function luminance(hex: string): number {
  const rgb = hex
    .replace('#', '')
    .match(/.{2}/g)!
    .map(c => {
      const v = parseInt(c, 16) / 255;
      return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
}

function textColorFor(hex: string): string {
  return luminance(hex) > 0.4 ? '#000000' : '#ffffff';
}

// ── Section 1: Tonal Palettes ────────────────────────────────────
interface TonalPalette {
  name: string;
  label: string;
  tones: { key: number; hex: string; textColor: string }[];
}

const paletteNames: { name: keyof typeof palettes; label: string }[] = [
  { name: 'primary', label: 'Primary' },
  { name: 'secondary', label: 'Secondary' },
  { name: 'tertiary', label: 'Tertiary' },
  { name: 'error', label: 'Error' },
  { name: 'neutral', label: 'Neutral' },
  { name: 'neutralVariant', label: 'Neutral Variant' },
  { name: 'success', label: 'Success' },
  { name: 'warning', label: 'Warning' },
  { name: 'info', label: 'Info' },
];

const tonalPalettes = computed<TonalPalette[]>(() =>
  paletteNames
    .filter(p => p.name !== 'surfaceTint')
    .map(p => {
      const pal = palettes[p.name];
      if (typeof pal === 'string') return { name: p.name, label: p.label, tones: [] };
      const entries = Object.entries(pal)
        .map(([k, v]) => ({ key: Number(k), hex: v as string }))
        .sort((a, b) => a.key - b.key);
      return {
        name: p.name,
        label: p.label,
        tones: entries.map(e => ({
          key: e.key,
          hex: e.hex,
          textColor: textColorFor(e.hex),
        })),
      };
    })
);

// ── Section 2: Semantic Groups ───────────────────────────────────
interface SemanticToken {
  name: string;
  bg: string;
  fg: string;
  hex: string;
  paletteRef: string;
}

interface SemanticGroup {
  title: string;
  tokens: SemanticToken[];
}

// Mapping of token name → palette reference for light/dark
const lightRefs: Record<string, string> = {
  primary: 'P-40',
  'on-primary': 'P-100',
  'primary-container': 'P-95',
  'on-primary-container': 'P-30',
  secondary: 'S-40',
  'on-secondary': 'S-100',
  'secondary-container': 'S-95',
  'on-secondary-container': 'S-30',
  tertiary: 'T-40',
  'on-tertiary': 'T-100',
  'tertiary-container': 'T-95',
  'on-tertiary-container': 'T-30',
  error: 'E-40',
  'on-error': 'E-100',
  'error-container': 'E-95',
  'on-error-container': 'E-30',
  'primary-fixed': 'P-90',
  'primary-fixed-dim': 'P-80',
  'on-primary-fixed': 'P-10',
  'on-primary-fixed-variant': 'P-30',
  'secondary-fixed': 'S-90',
  'secondary-fixed-dim': 'S-80',
  'on-secondary-fixed': 'S-10',
  'on-secondary-fixed-variant': 'S-30',
  'tertiary-fixed': 'T-90',
  'tertiary-fixed-dim': 'T-80',
  'on-tertiary-fixed': 'T-10',
  'on-tertiary-fixed-variant': 'T-30',
  surface: 'N-99',
  'on-surface': 'N-10',
  'surface-variant': 'NV-90',
  'on-surface-variant': 'NV-30',
  'surface-dim': 'N-87',
  'surface-bright': 'N-98',
  'surface-container-lowest': 'N-100',
  'surface-container-low': 'N-96',
  'surface-container': 'N-94',
  'surface-container-high': 'N-92',
  'surface-container-highest': 'N-90',
  outline: 'NV-50',
  'outline-variant': 'NV-80',
  'inverse-surface': 'N-20',
  'inverse-on-surface': 'N-95',
  'inverse-primary': 'P-80',
  shadow: 'N-0',
  scrim: 'N-0',
  background: 'N-98',
  'on-background': 'N-10',
  success: 'G-20',
  'on-success': 'G-100',
  'success-container': 'G-95',
  'on-success-container': 'G-10',
  warning: 'O-30',
  'on-warning': 'O-100',
  'warning-container': 'O-95',
  'on-warning-container': 'O-20',
  info: 'Y-50',
  'on-info': 'Y-0',
  'info-container': 'Y-90',
  'on-info-container': 'Y-0',
};

const darkRefs: Record<string, string> = {
  primary: 'P-80',
  'on-primary': 'P-20',
  'primary-container': 'P-30',
  'on-primary-container': 'P-90',
  secondary: 'S-80',
  'on-secondary': 'S-20',
  'secondary-container': 'S-30',
  'on-secondary-container': 'S-90',
  tertiary: 'T-80',
  'on-tertiary': 'T-20',
  'tertiary-container': 'T-30',
  'on-tertiary-container': 'T-90',
  error: 'E-80',
  'on-error': 'E-20',
  'error-container': 'E-30',
  'on-error-container': 'E-90',
  'primary-fixed': 'P-90',
  'primary-fixed-dim': 'P-80',
  'on-primary-fixed': 'P-10',
  'on-primary-fixed-variant': 'P-30',
  'secondary-fixed': 'S-90',
  'secondary-fixed-dim': 'S-80',
  'on-secondary-fixed': 'S-10',
  'on-secondary-fixed-variant': 'S-30',
  'tertiary-fixed': 'T-90',
  'tertiary-fixed-dim': 'T-80',
  'on-tertiary-fixed': 'T-10',
  'on-tertiary-fixed-variant': 'T-30',
  surface: 'N-5',
  'on-surface': 'N-90',
  'surface-variant': 'NV-30',
  'on-surface-variant': 'NV-80',
  'surface-dim': 'N-5',
  'surface-bright': 'N-30',
  'surface-container-lowest': 'N-5',
  'surface-container-low': 'N-10',
  'surface-container': 'N-15',
  'surface-container-high': 'N-20',
  'surface-container-highest': 'N-25',
  outline: 'NV-60',
  'outline-variant': 'NV-30',
  'inverse-surface': 'N-90',
  'inverse-on-surface': 'N-20',
  'inverse-primary': 'P-40',
  shadow: 'N-0',
  scrim: 'N-0',
  background: 'N-10',
  'on-background': 'N-90',
  success: 'G-90',
  'on-success': 'G-20',
  'success-container': 'G-30',
  'on-success-container': 'G-90',
  warning: 'W-90',
  'on-warning': 'W-20',
  'warning-container': 'W-30',
  'on-warning-container': 'W-95',
  info: 'I-90',
  'on-info': 'I-0',
  'info-container': 'I-50',
  'on-info-container': 'I-0',
};

const semanticGroupDefs: { title: string; tokenNames: string[] }[] = [
  {
    title: 'Primary',
    tokenNames: ['primary', 'on-primary', 'primary-container', 'on-primary-container'],
  },
  {
    title: 'Secondary',
    tokenNames: ['secondary', 'on-secondary', 'secondary-container', 'on-secondary-container'],
  },
  {
    title: 'Tertiary',
    tokenNames: ['tertiary', 'on-tertiary', 'tertiary-container', 'on-tertiary-container'],
  },
  {
    title: 'Error',
    tokenNames: ['error', 'on-error', 'error-container', 'on-error-container'],
  },
  {
    title: 'Surface',
    tokenNames: [
      'surface',
      'on-surface',
      'surface-variant',
      'on-surface-variant',
      'surface-dim',
      'surface-bright',
      'surface-container-lowest',
      'surface-container-low',
      'surface-container',
      'surface-container-high',
      'surface-container-highest',
    ],
  },
  {
    title: 'Outline',
    tokenNames: ['outline', 'outline-variant'],
  },
  {
    title: 'Inverse',
    tokenNames: ['inverse-surface', 'inverse-on-surface', 'inverse-primary'],
  },
  {
    title: 'Fixed',
    tokenNames: [
      'primary-fixed',
      'primary-fixed-dim',
      'on-primary-fixed',
      'on-primary-fixed-variant',
      'secondary-fixed',
      'secondary-fixed-dim',
      'on-secondary-fixed',
      'on-secondary-fixed-variant',
      'tertiary-fixed',
      'tertiary-fixed-dim',
      'on-tertiary-fixed',
      'on-tertiary-fixed-variant',
    ],
  },
  {
    title: 'Success',
    tokenNames: ['success', 'on-success', 'success-container', 'on-success-container'],
  },
  {
    title: 'Warning',
    tokenNames: ['warning', 'on-warning', 'warning-container', 'on-warning-container'],
  },
  {
    title: 'Info',
    tokenNames: ['info', 'on-info', 'info-container', 'on-info-container'],
  },
  {
    title: 'Misc',
    tokenNames: ['background', 'on-background', 'shadow', 'scrim'],
  },
];

// Determine a readable foreground for each token swatch
function fgForToken(tokenHex: string): string {
  return textColorFor(tokenHex);
}

const semanticGroups = computed<SemanticGroup[]>(() => {
  const colors = currentThemeColors.value;
  const refs = activeTheme.value === 'light' ? lightRefs : darkRefs;

  return semanticGroupDefs.map(g => ({
    title: g.title,
    tokens: g.tokenNames
      .filter(name => name in colors)
      .map(name => {
        const hex = colors[name] as string;
        return {
          name,
          bg: hex,
          fg: fgForToken(hex),
          hex,
          paletteRef: refs[name] ?? '',
        };
      }),
  }));
});

// ── Section 4: Accessible Pairings ──────────────────────────────
const accessPairs = [
  { bg: 'primary', fg: 'on-primary', label: 'Primary', contrast: 'AA 4.5:1' },
  {
    bg: 'primary-container',
    fg: 'on-primary-container',
    label: 'Primary Container',
    contrast: 'AAA 7:1',
  },
  { bg: 'secondary', fg: 'on-secondary', label: 'Secondary', contrast: 'AA 4.5:1' },
  {
    bg: 'secondary-container',
    fg: 'on-secondary-container',
    label: 'Secondary Container',
    contrast: 'AAA 7:1',
  },
  { bg: 'tertiary', fg: 'on-tertiary', label: 'Tertiary', contrast: 'AA 4.5:1' },
  {
    bg: 'tertiary-container',
    fg: 'on-tertiary-container',
    label: 'Tertiary Container',
    contrast: 'AAA 7:1',
  },
  { bg: 'error', fg: 'on-error', label: 'Error', contrast: 'AA 4.5:1' },
  {
    bg: 'error-container',
    fg: 'on-error-container',
    label: 'Error Container',
    contrast: 'AAA 7:1',
  },
  { bg: 'success', fg: 'on-success', label: 'Success', contrast: 'AA 4.5:1' },
  {
    bg: 'success-container',
    fg: 'on-success-container',
    label: 'Success Container',
    contrast: 'AAA 7:1',
  },
  { bg: 'warning', fg: 'on-warning', label: 'Warning', contrast: 'AA 4.5:1' },
  {
    bg: 'warning-container',
    fg: 'on-warning-container',
    label: 'Warning Container',
    contrast: 'AA 4.5:1',
  },
  { bg: 'info', fg: 'on-info', label: 'Info', contrast: 'AAA 7:1' },
  { bg: 'info-container', fg: 'on-info-container', label: 'Info Container', contrast: 'AAA 7:1' },
  {
    bg: 'inverse-surface',
    fg: 'inverse-on-surface',
    label: 'Inverse Surface',
    contrast: 'AAA 7:1',
  },
];

// ── Section 5: Surface Hierarchy ─────────────────────────────────
const surfaceLevels = [
  { token: 'surface-container-lowest', label: 'Lowest' },
  { token: 'surface-bright', label: 'Bright' },
  { token: 'surface-container-low', label: 'Low' },
  { token: 'surface-container', label: 'Default' },
  { token: 'surface-container-high', label: 'High' },
  { token: 'surface-container-highest', label: 'Highest' },
  { token: 'surface-dim', label: 'Dim' },
];

// ── Section 6: Status Colors Examples ────────────────────────────
const statusExamples = [
  {
    type: 'success' as const,
    title: 'Success',
    message: 'Operation completed successfully.',
    icon: 'check_circle',
  },
  { type: 'info' as const, title: 'Info', message: 'New updates are available.', icon: 'info' },
  {
    type: 'warning' as const,
    title: 'Warning',
    message: 'Disk space is running low.',
    icon: 'warning',
  },
  { type: 'error' as const, title: 'Error', message: 'Failed to save changes.', icon: 'error' },
];
</script>

<style scoped>
/* ── Tonal Palette Strip ─────────────────────────────────────── */
.palette-row {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  overflow: hidden;
  border-radius: 12px;
}

.palette-swatch {
  position: relative;
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 64px;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.palette-swatch:hover {
  z-index: 1;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 20%);
  transform: scale(1.08);
}

.swatch-tone {
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
}

.swatch-hex {
  margin-top: 4px;
  font-size: 9px;
  font-weight: 500;
  letter-spacing: 0.02em;
  opacity: 0.85;
}

/* ── Semantic Cards ──────────────────────────────────────────── */
.semantic-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 88px;
  padding: 16px;
  cursor: pointer;
  border: 1px solid rgb(0 0 0 / 6%);
  border-radius: 12px;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease;
}

.semantic-card:hover {
  box-shadow: 0 4px 16px rgb(0 0 0 / 12%);
  transform: translateY(-2px);
}

.semantic-label {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.semantic-hex {
  margin-top: 2px;
  font-family: monospace;
  font-size: 11px;
  font-weight: 500;
  opacity: 0.9;
}

.semantic-tone {
  margin-top: auto;
  font-size: 10px;
  font-weight: 600;
  text-align: right;
  opacity: 0.7;
}

/* ── Accessible Pairing Cards ────────────────────────────────── */
.pair-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-height: 110px;
  padding: 16px;
  border-radius: 12px;
  transition: transform 0.15s ease;
}

.pair-card:hover {
  transform: translateY(-2px);
}

.pair-label {
  font-size: 15px;
  font-weight: 700;
}

.pair-meta {
  margin-top: 2px;
}

.pair-tokens {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-top: auto;
}

.pair-tokens code {
  font-size: 10px;
  opacity: 0.8;
}

/* ── Surface Strip ───────────────────────────────────────────── */
.surface-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
  overflow: hidden;
  border-radius: 16px;
}

.surface-block {
  display: flex;
  flex: 1 1 0;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  min-height: 80px;
  padding: 12px 8px;
}

/* ── CSS Variable demos ──────────────────────────────────────── */
.css-var-demo {
  font-size: 13px;
  font-weight: 500;
}

.css-var-demo--primary {
  color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-primary), 0.08);
}

.css-var-demo--gradient {
  color: rgb(var(--v-theme-on-primary-container));
  background: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary-container)),
    rgb(var(--v-theme-tertiary-container))
  );
}

.css-var-demo--border {
  color: rgb(var(--v-theme-on-surface));
  border: 2px solid rgb(var(--v-theme-outline), 0.4);
}

/* ── Syntax Highlighting ─────────────────────────────────────── */
.code-block {
  margin: 0;
  font-family: 'Cascadia Code', 'Fira Code', 'JetBrains Mono', Consolas, monospace;
  font-size: 13px;
  line-height: 1.6;
  white-space: pre;
}

.code-block :deep(.hl-tag) {
  color: #157bc5;
}

.code-block :deep(.hl-attr) {
  color: #38c097;
}

.code-block :deep(.hl-value) {
  color: #e86a16;
}

.code-block :deep(.hl-text) {
  color: #9dadc1;
}

.code-block :deep(.hl-selector) {
  color: #157bc5;
}

.code-block :deep(.hl-prop) {
  color: #38c097;
}

.code-block :deep(.hl-css-val) {
  color: #e86a16;
}

.code-block :deep(.hl-comment) {
  font-style: italic;
  color: #73777f;
}
</style>
