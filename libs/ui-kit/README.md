# UI Kit

Shared Vue 3 + Vuetify component library for applications that want to reuse the Showcase visual system.

## Peer Dependencies

Consumers must install compatible versions of:

- `vue`
- `vuetify`
- `@mdi/font`
- `@fontsource-variable/open-sans`

## Standalone App Integration

For an app that imports `@reference-app-laravel-vue/ui-kit`, it can consume the library's SASS settings directly without duplicating tokens.

Example `vite.config.ts` in the consumer app:

```ts
import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

const localNodeModules = fileURLToPath(new URL('./node_modules', import.meta.url));
/* Add your monorepo workspace node_modules here if applicable */

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: {
        configFile: fileURLToPath(
          new URL(
            './node_modules/@reference-app-laravel-vue/ui-kit/src/styles/_index.scss',
            import.meta.url
          )
        ),
      },
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        loadPaths: [localNodeModules],
      },
      sass: {
        api: 'modern-compiler',
        loadPaths: [localNodeModules],
      },
    },
  },
});
```

Example application entry:

```ts
import '@mdi/font/css/materialdesignicons.css';
import '@fontsource-variable/open-sans';
import 'vuetify/styles';
import '@reference-app-laravel-vue/ui-kit/overrides';
```

## Notes

- The consumer app delegates its Vuetify SASS variables to `@reference-app-laravel-vue/ui-kit`.
- `@reference-app-laravel-vue/ui-kit/overrides` remains the stable shared CSS entry.
