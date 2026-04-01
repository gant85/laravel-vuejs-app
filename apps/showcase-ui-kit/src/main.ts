import '@fontsource-variable/open-sans';
import { createApp, h } from 'vue';
import { createVuetify } from 'vuetify';
import type { IconProps } from 'vuetify';
import 'vuetify/styles';
import '@reference-app-laravel-vue/ui-kit/overrides';
import { lightTheme, darkTheme, componentDefaults } from '@reference-app-laravel-vue/ui-kit';
import App from './App.vue';
import router from './router';

// Material Symbols Outlined custom icon set (Google Fonts Icons, weight controlled via CSS)
const materialSymbols = {
  component: (props: IconProps) =>
    h('span', { class: 'material-symbols-outlined' }, [props.icon as string]),
};

// Components auto-imported via vite-plugin-vuetify
// Theme & defaults from centralized ui-kit design system
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

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
