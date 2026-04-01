/**
 * UI Kit — Theme Entrypoint
 *
 * Re-exports all theme-related modules for convenient consumption:
 *
 * ```ts
 * import { lightTheme, darkTheme, componentDefaults, palettes } from '@reference-app-laravel-vue/ui-kit/theme';
 * ```
 */

export { palettes } from './palettes';
export type { PaletteName } from './palettes';

export { lightTheme } from './light';
export { darkTheme } from './dark';

export { componentDefaults } from './defaults';

export { typeClass } from './typography';
export type { TypeScaleRole, TypeScaleSize, TypeScaleWeight } from './typography';
