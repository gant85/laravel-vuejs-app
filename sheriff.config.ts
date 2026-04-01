import { sameTag, SheriffConfig } from '@softarc/sheriff-core';

export const config: SheriffConfig = {
  version: 1,
  entryFile: './apps/showcase/resources/js/app.ts',
  tagging: {
    // Libraries
    'libs/<libName>/src': ['lib:<libName>'],
    'libs/<libName>/src/<subPath>': ['lib:<libName>', 'subPath:<subPath>'],

    // Applications
    'apps/<appName>/src': ['app:<appName>'],
    'apps/<appName>/src/<subPath>': ['app:<appName>', 'subPath:<subPath>'],

    // Showcase app special paths (Laravel + Inertia)
    'apps/showcase/resources/js': ['app:showcase', 'type:frontend'],
    'apps/showcase/resources/js/<subPath>': ['app:showcase', 'type:frontend', 'subPath:<subPath>'],
  },

  enableBarrelLess: true,

  depRules: {
    // Root is a virtual module containing files not part of any module
    root: ['noTag'],
    noTag: 'noTag',

    // === Library Dependency Rules ===

    // ui-kit lib: no dependencies on other libs
    'lib:ui-kit': ['noTag'],

    // === Application Dependency Rules ===

    // All apps can depend on all libs and noTag (root files)
    'app:*': ['lib:*', 'noTag'],

    // Frontend code can use all libs
    'type:frontend': ['lib:*', 'noTag'],

    // === Prevent circular dependencies ===
    // Libraries cannot depend on applications
    'lib:*': ({ from, to }) => {
      // Block any lib from importing from apps
      if (to.tags.some((tag: string) => tag.startsWith('app:'))) {
        return false;
      }
      return true;
    },
  },

  // Exclude patterns from Sheriff analysis
  excludePatterns: [
    'node_modules/**',
    'dist/**',
    'build/**',
    'vendor/**',
    'storage/**',
    'public/**',
    'bootstrap/**',
    '**/*.test.ts',
    '**/*.spec.ts',
    '**/*.d.ts',
    '**/*.config.ts',
    '**/*.config.js',
  ],
};
