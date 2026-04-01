import { palettes } from './palettes';
import type { ThemeDefinition } from 'vuetify';

export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // ── Core Key Colors ──────────────────────────────────────────────
    primary: palettes.primary[40],
    'on-primary': palettes.primary[100],
    'primary-container': palettes.primary[95],
    'on-primary-container': palettes.primary[30],

    secondary: palettes.secondary[40],
    'on-secondary': palettes.secondary[100],
    'secondary-container': palettes.secondary[95],
    'on-secondary-container': palettes.secondary[30],

    tertiary: palettes.tertiary[40],
    'on-tertiary': palettes.tertiary[100],
    'tertiary-container': palettes.tertiary[95],
    'on-tertiary-container': palettes.tertiary[30],

    error: palettes.error[40],
    'on-error': palettes.error[100],
    'error-container': palettes.error[95],
    'on-error-container': palettes.error[30],

    // ── Neutral / Surface ────────────────────────────────────────────
    background: palettes.neutral[98],
    'on-background': palettes.neutral[10],

    surface: palettes.neutral[99],
    'on-surface': palettes.neutral[10],
    'surface-variant': palettes.neutralVariant[90],
    'on-surface-variant': palettes.neutralVariant[30],

    'surface-dim': palettes.neutral[87],
    'surface-bright': palettes.neutral[98],
    'surface-container-lowest': palettes.neutral[100],
    'surface-container-low': palettes.neutral[96],
    'surface-container': palettes.neutral[94],
    'surface-container-high': palettes.neutral[92],
    'surface-container-highest': palettes.neutral[90],

    // ── Outline ──────────────────────────────────────────────────────
    outline: palettes.neutralVariant[50],
    'outline-variant': palettes.neutralVariant[80],

    // ── Inverse ──────────────────────────────────────────────────────
    'inverse-surface': palettes.neutral[20],
    'inverse-on-surface': palettes.neutral[95],
    'inverse-primary': palettes.primary[80],

    // ── Shadow / Scrim ───────────────────────────────────────────────
    shadow: palettes.neutral[0],
    scrim: palettes.neutral[0],

    // ── Fixed Colors ─────────────────────────────────────────────────
    'primary-fixed': palettes.primary[90],
    'primary-fixed-dim': palettes.primary[80],
    'on-primary-fixed': palettes.primary[10],
    'on-primary-fixed-variant': palettes.primary[30],

    'secondary-fixed': palettes.secondary[90],
    'secondary-fixed-dim': palettes.secondary[80],
    'on-secondary-fixed': palettes.secondary[10],
    'on-secondary-fixed-variant': palettes.secondary[30],

    'tertiary-fixed': palettes.tertiary[90],
    'tertiary-fixed-dim': palettes.tertiary[80],
    'on-tertiary-fixed': palettes.tertiary[10],
    'on-tertiary-fixed-variant': palettes.tertiary[30],

    // ── Extended Semantic Colors ─────────────────────────────────────
    success: palettes.success[20],
    'on-success': palettes.success[100],
    'success-container': palettes.success[95],
    'on-success-container': palettes.success[10],

    warning: palettes.warning[30],
    'on-warning': palettes.warning[100],
    'warning-container': palettes.warning[95],
    'on-warning-container': palettes.warning[20],

    info: palettes.info[50],
    'on-info': palettes.info[0],
    'info-container': palettes.info[90],
    'on-info-container': palettes.info[0],
  },
};
