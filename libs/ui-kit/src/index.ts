// Export UI components
export { default as Button } from './components/Button.vue';
export { default as Switch } from './components/Switch.vue';
export { default as Panel } from './components/Panel.vue';
export { default as NotificationCard } from './components/NotificationCard.vue';
export { default as DatePicker } from './components/DatePicker.vue';

// Export types and enums
export type { NotificationCardType } from './types';
export { NotificationCardTypeEnum } from './types';

// Export theme (palettes, light/dark themes, component defaults, typography)
export { palettes, lightTheme, darkTheme, componentDefaults, typeClass } from './theme';
export type { PaletteName, TypeScaleRole, TypeScaleSize, TypeScaleWeight } from './theme';

export const UI_KIT_VERSION = '1.0.0';
