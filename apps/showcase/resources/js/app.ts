import './bootstrap';

import '@fontsource-variable/open-sans';
import { createApp, h, DefineComponent } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import '@reference-app-laravel-vue/ui-kit/overrides';
import {
  lightTheme,
  darkTheme,
  componentDefaults,
  palettes,
} from '@reference-app-laravel-vue/ui-kit';
import type { IconProps } from 'vuetify';

function scheduleTelemetryInit() {
  const telemetryEnabled =
    import.meta.env.PROD || import.meta.env.VITE_TELEMETRY_ENABLED === 'true';

  if (!telemetryEnabled) {
    return;
  }

  const init = async () => {
    const { initOpenTelemetry } = await import('./telemetry');
    initOpenTelemetry();
  };

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => {
      void init();
    });

    return;
  }

  setTimeout(() => {
    void init();
  }, 0);
}

// Defer telemetry bootstrap to avoid slowing down initial app rendering.
scheduleTelemetryInit();

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
    aliases: {
      // Vuetify internal icon aliases — mapped to Material Symbols names
      close: 'close',
      cancel: 'cancel',
      clear: 'close',
      delete: 'close',
      success: 'check_circle',
      info: 'info',
      warning: 'warning',
      error: 'error',
      prev: 'chevron_left',
      next: 'chevron_right',
      checkboxOn: 'check_box',
      checkboxOff: 'check_box_outline_blank',
      checkboxIndeterminate: 'indeterminate_check_box',
      delimiter: 'circle',
      sortAsc: 'arrow_upward',
      sortDesc: 'arrow_downward',
      expand: 'expand_more',
      menu: 'menu',
      subgroup: 'arrow_drop_down',
      dropdown: 'arrow_drop_down',
      radioOn: 'radio_button_checked',
      radioOff: 'radio_button_unchecked',
      edit: 'edit',
      ratingEmpty: 'star_border',
      ratingFull: 'star',
      ratingHalf: 'star_half',
      loading: 'progress_activity',
      first: 'first_page',
      last: 'last_page',
      unfold: 'unfold_more',
      file: 'attach_file',
      plus: 'add',
      minus: 'remove',
      calendar: 'calendar_today',
      collapse: 'keyboard_arrow_up',
      complete: 'check_circle',
      eyeDropper: 'colorize',
    },
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
