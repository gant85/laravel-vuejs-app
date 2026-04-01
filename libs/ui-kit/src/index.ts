// Export UI components
export { default as Badge } from './components/Badge.vue';
export { default as Button } from './components/Button.vue';
export { default as Divider } from './components/Divider.vue';
export { default as Label } from './components/Label.vue';
export { default as Switch } from './components/Switch.vue';
export { default as MessageBar } from './components/MessageBar.vue';
export { default as Panel } from './components/Panel.vue';
export { default as NotificationCard } from './components/NotificationCard.vue';
export { default as ProgressIndicatorLinear } from './components/ProgressIndicatorLinear.vue';
export { default as ProgressIndicatorCircular } from './components/ProgressIndicatorCircular.vue';
export { default as Tooltip } from './components/Tooltip.vue';
export { default as DatePicker } from './components/DatePicker.vue';

// Export types and enums
export type { BadgeSize } from './components/Badge.vue';
export type { DividerIndent } from './components/Divider.vue';
export type { LabelSize, LabelAppearance, LabelColor } from './components/Label.vue';
export type { TooltipType } from './components/Tooltip.vue';
export type { MessageBarType, NotificationCardType } from './types';
export { MessageBarTypeEnum, NotificationCardTypeEnum } from './types';

// Export theme (palettes, light/dark themes, component defaults, typography)
export { palettes, lightTheme, darkTheme, componentDefaults, typeClass } from './theme';
export type { PaletteName, TypeScaleRole, TypeScaleSize, TypeScaleWeight } from './theme';

export const UI_KIT_VERSION = '1.0.0';
