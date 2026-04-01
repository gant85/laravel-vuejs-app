# UI Kit

Shared Vue 3 + Vuetify component library for applications that want to reuse the Showcase visual system.

## Peer Dependencies

Consumers must install compatible versions of:

- `vue`
- `vuetify`
- `@mdi/font`
- `@fontsource-variable/open-sans`

## Standalone App Integration

For an app that lives outside this monorepo and imports `@reference-app-laravel-vue/ui-kit`, keep the Vuetify `configFile` inside the consumer app.

Example `src/styles/settings.scss` in the consumer app:

```scss
$button-border-radius: 2px;
$card-border-radius: 1px;
$body-font-family: 'Open Sans Variable', sans-serif;

@use '../../node_modules/vuetify/_settings' with (
  $body-font-family: $body-font-family,
  $button-border-radius: $button-border-radius,
  $card-border-radius: $card-border-radius
);
```

Example `vite.config.ts`:

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
  ],
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

- The consumer app should own the Vuetify Sass settings file.
- `@reference-app-laravel-vue/ui-kit/overrides` remains the stable shared CSS entry.
- Design tokens used by Showcase can be copied from the template app or documented centrally as needed.
