import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../pages/dashboard/DashboardPage.vue'),
    },
    // Brand
    {
      path: '/brand/colors-demo',
      name: 'ColorsDemo',
      component: () => import('../pages/brand/colors/ColorsDemo.vue'),
    },
    {
      path: '/brand/icons-demo',
      name: 'IconsDemo',
      component: () => import('../pages/brand/iconography/IconsDemo.vue'),
    },
    {
      path: '/brand/typography-demo',
      name: 'TypographyDemo',
      component: () => import('../pages/brand/typography/TypographyDemo.vue'),
    },
    // Global Components
    {
      path: '/global-components/page-header-demo',
      name: 'PageHeaderDemo',
      component: () => import('../pages/global-components/page-header/PageHeaderDemo.vue'),
    },
    {
      path: '/global-components/notifications-xs-demo',
      name: 'NotificationsXsDemo',
      component: () =>
        import('../pages/global-components/notifications-xs/NotificationsXsDemo.vue'),
    },
    // Components
    {
      path: '/components/badges-demo',
      name: 'BadgesDemo',
      component: () => import('../pages/components/badges/BadgesDemo.vue'),
    },
    {
      path: '/components/buttons-demo',
      name: 'ButtonsDemo',
      component: () => import('../pages/components/buttons/ButtonsDemo.vue'),
    },
    {
      path: '/components/cards-demo',
      name: 'CardsDemo',
      component: () => import('../pages/components/cards/CardsDemo.vue'),
    },
    {
      path: '/components/datepickers-demo',
      name: 'DatepickersDemo',
      component: () => import('../pages/components/datepickers/DatepickersDemo.vue'),
    },
    {
      path: '/components/dialogs-demo',
      name: 'DialogsDemo',
      component: () => import('../pages/components/dialogs/DialogsDemo.vue'),
    },
    {
      path: '/components/dividers-demo',
      name: 'DividersDemo',
      component: () => import('../pages/components/dividers/DividersDemo.vue'),
    },
    {
      path: '/components/elevations-demo',
      name: 'ElevationsDemo',
      component: () => import('../pages/components/elevations/ElevationsDemo.vue'),
    },
    {
      path: '/components/expansion-panels-demo',
      name: 'ExpansionPanelsDemo',
      component: () => import('../pages/components/expansion-panels/ExpansionPanelsDemo.vue'),
    },
    {
      path: '/components/input-chips-demo',
      name: 'InputChipsDemo',
      component: () => import('../pages/components/input-chips/InputChipsDemo.vue'),
    },
    {
      path: '/components/labels-demo',
      name: 'LabelsDemo',
      component: () => import('../pages/components/labels/LabelsDemo.vue'),
    },
    {
      path: '/components/labels-demo',
      name: 'LabelsDemo',
      component: () => import('../pages/components/labels/LabelsDemo.vue'),
    },
    {
      path: '/components/snackbars-demo',
      name: 'SnackbarsDemo',
      component: () => import('../pages/components/snackbars/SnackbarsDemo.vue'),
    },
    {
      path: '/components/panels-demo',
      name: 'PanelsDemo',
      component: () => import('../pages/components/panels/PanelsDemo.vue'),
    },
    {
      path: '/components/progress-indicators-demo',
      name: 'ProgressIndicatorsDemo',
      component: () => import('../pages/components/progress-indicators/ProgressIndicatorsDemo.vue'),
    },
    {
      path: '/components/radio-buttons-demo',
      name: 'RadioButtonsDemo',
      component: () => import('../pages/components/radio-buttons/RadioButtonsDemo.vue'),
    },
    {
      path: '/components/check-boxes-demo',
      name: 'CheckBoxesDemo',
      component: () => import('../pages/components/check-boxes/CheckBoxesDemo.vue'),
    },
    {
      path: '/components/switches-demo',
      name: 'SwitchesDemo',
      component: () => import('../pages/components/switches/SwitchesDemo.vue'),
    },
    {
      path: '/components/tabs-demo',
      name: 'TabsDemo',
      component: () => import('../pages/components/tabs/TabsDemo.vue'),
    },
    {
      path: '/components/text-fields-demo',
      name: 'TextFieldsDemo',
      component: () => import('../pages/components/text-fields/TextFieldsDemo.vue'),
    },
    {
      path: '/components/tooltips-demo',
      name: 'TooltipsDemo',
      component: () => import('../pages/components/tooltips/TooltipsDemo.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/dashboard',
    },
  ],
});

export default router;
