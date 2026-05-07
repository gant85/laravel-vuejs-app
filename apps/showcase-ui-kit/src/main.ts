import '@fontsource-variable/open-sans';
import { createApp, h } from 'vue';
import { createVuetify } from 'vuetify';
import type { IconProps } from 'vuetify';
import 'vuetify/styles';
import '@reference-app-laravel-vue/ui-kit/overrides';
import { lightTheme, darkTheme, componentDefaults } from '@reference-app-laravel-vue/ui-kit';
import App from './App.vue';
import router from './router';
import { VDateInput } from 'vuetify/labs/VDateInput';
import { vMaska } from 'maska/vue';

// Material Symbols Outlined custom icon set (Google Fonts Icons, weight controlled via CSS)
const materialSymbols = {
  component: (props: IconProps) => {
    const iconValue = props.icon as any;
    const rawName = typeof iconValue === 'string' ? iconValue : '';

    const isFilled = rawName.endsWith('-filled');
    const iconName = isFilled ? rawName.replace('-filled', '') : rawName;

    return h(
      'span',
      {
        class: 'material-symbols-outlined',
        style: {
          fontVariationSettings: isFilled
            ? "'FILL' 1, 'wght' 300, 'GRAD' 0, 'opsz' 24"
            : "'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24",
        },
      },
      iconName
    );
  },
};

// Components auto-imported via vite-plugin-vuetify
// Theme & defaults from centralized ui-kit design system
const vuetify = createVuetify({
  components: {
    VDateInput,
  },
  directives: {
    maska: vMaska,
  },
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
      checkboxOn: 'check_box-filled',
      checkboxOff: 'check_box_outline_blank',
      checkboxIndeterminate: 'indeterminate_check_box-filled',
      delimiter: 'circle',
      sortAsc: 'arrow_upward',
      sortDesc: 'arrow_downward',
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
      complete: 'check_circle',
      eyeDropper: 'colorize',
      search: 'search',
      expand: 'expand_more', // alias per lo chevron down
      collapse: 'expand_less', // alias per lo chevron up
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

const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');
