import './bootstrap';

import '@fontsource-variable/open-sans';
import { createApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import '@reference-app-laravel-vue/ui-kit/overrides';
import {
  lightTheme,
  darkTheme,
  componentDefaults,
  palettes,
} from '@reference-app-laravel-vue/ui-kit';
import { initOpenTelemetry } from './telemetry';
import type { IconProps } from 'vuetify';

// Initialize OpenTelemetry tracing
initOpenTelemetry();

const appName = import.meta.env.VITE_APP_NAME || 'Showcase Application';

// Material Symbols Outlined custom icon set (Google Fonts Icons, weight controlled via CSS)
const materialSymbols = {
  component: (props: IconProps) =>
    h('span', { class: 'material-symbols-outlined' }, [props.icon as string]),
};

// Vuetify configuration with Material Design 3
// Theme & defaults from centralized ui-kit design system
// Components auto-imported via vite-plugin-vuetify
const vuetify = createVuetify({
  icons: {
    defaultSet: 'materialSymbols',
    sets: { materialSymbols },
  },
  theme: {
    defaultTheme: 'light',
    themes: {
      light: lightTheme,
      dark: darkTheme,
    },
  },
  defaults: componentDefaults,
});

createInertiaApp({
  title: title => `${title} - ${appName}`,
  resolve: name =>
    resolvePageComponent(
      `./Pages/${name}.vue`,
      import.meta.glob<DefineComponent>('./Pages/**/*.vue')
    ),
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .use(vuetify)
      .mount(el);
  },
  progress: {
    color: palettes.primary[40],
  },
});
