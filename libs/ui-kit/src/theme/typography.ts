/**
 * Typography — TypeScript Helpers
 *
 * ALL design token values (font-family, font-weights, type scale) live in
 * libs/ui-kit/src/styles/_typography.scss — the single source of truth.
 *
 * This file provides ONLY:
 *   - Types for compile-time safety
 *   - typeClass() to generate CSS class names in Vue templates
 */

export type TypeScaleRole = 'display' | 'headline' | 'title' | 'label' | 'body';
export type TypeScaleSize = 'large' | 'medium' | 'small' | 'extraSmall';
export type TypeScaleWeight = 'regular' | 'light' | 'semibold' | 'bold';

// Must stay in sync with $weight-variants in _typography.scss
const WEIGHT_SUFFIX: Record<TypeScaleWeight, string> = {
  regular: '',
  light: '-lt',
  semibold: '-sb',
  bold: '-bd',
};

/**
 * Returns the CSS class name for a type scale + weight combination.
 *
 * @example
 * typeClass('body', 'medium')              // 'text-body-medium'
 * typeClass('body', 'medium', 'bold')      // 'text-body-medium-bd'
 * typeClass('label', 'extraSmall', 'light') // 'text-label-extra-small-lt'
 */
export function typeClass(
  role: TypeScaleRole,
  size: TypeScaleSize,
  weight: TypeScaleWeight = 'regular'
): string {
  const sizeSegment = size === 'extraSmall' ? 'extra-small' : size;
  return `text-${role}-${sizeSegment}${WEIGHT_SUFFIX[weight]}`;
}
