import { palettes } from './palettes';
import type { ThemeDefinition } from 'vuetify';

export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    // ── Core Key Colors ──────────────────────────────────────────────
    primary: palettes.primary[80],
    'on-primary': palettes.primary[20],
    'primary-container': palettes.primary[30],
    'on-primary-container': palettes.primary[90],

    secondary: palettes.secondary[80],
    'on-secondary': palettes.secondary[20],
    'secondary-container': palettes.secondary[30],
    'on-secondary-container': palettes.secondary[90],

    tertiary: palettes.tertiary[80],
    'on-tertiary': palettes.tertiary[20],
    'tertiary-container': palettes.tertiary[30],
    'on-tertiary-container': palettes.tertiary[90],

    error: palettes.error[80],
    'on-error': palettes.error[20],
    'error-container': palettes.error[30],
    'on-error-container': palettes.error[90],

    // ── Neutral / Surface ────────────────────────────────────────────
    background: palettes.neutral[10],
    'on-background': palettes.neutral[90],

    surface: palettes.neutral[5],
    'on-surface': palettes.neutral[90],
    'surface-variant': palettes.neutralVariant[30],
    'on-surface-variant': palettes.neutralVariant[80],

    'surface-dim': palettes.neutral[5],
    'surface-bright': palettes.neutral[30],
    'surface-container-lowest': palettes.neutral[5],
    'surface-container-low': palettes.neutral[10],
    'surface-container': palettes.neutral[15],
    'surface-container-high': palettes.neutral[20],
    'surface-container-highest': palettes.neutral[25],

    // ── Outline ──────────────────────────────────────────────────────
    outline: palettes.neutralVariant[60],
    'outline-variant': palettes.neutralVariant[30],

    // ── Inverse ──────────────────────────────────────────────────────
    'inverse-surface': palettes.neutral[90],
    'inverse-on-surface': palettes.neutral[20],
    'inverse-primary': palettes.primary[40],

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
    success: palettes.success[90],
    'on-success': palettes.success[20],
    'success-container': palettes.success[30],
    'on-success-container': palettes.success[90],

    warning: palettes.warning[90],
    'on-warning': palettes.warning[20],
    'warning-container': palettes.warning[30],
    'on-warning-container': palettes.warning[95],

    info: palettes.info[90],
    'on-info': palettes.info[0],
    'info-container': palettes.info[50],
    'on-info-container': palettes.info[0],
  },
};
