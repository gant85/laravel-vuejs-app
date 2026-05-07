// Ricordarsi di verificare la documentazione corretta, della versione utilizzata 3.11.8
// Sorgente: https://github.com/vuetifyjs/vuetify/tree/v3.11.8
export const componentDefaults = {
  VAppBar: {
    flat: true,
  },

  VBadge: {
    color: 'error',
    location: 'top end',
    offsetY: -4,
    offsetX: -4,
    dot: false,
  },

  VBtn: {
    variant: 'flat',
    color: 'primary',
  },

  VCard: {
    rounded: 'lg',
    variant: 'elevated',
    elevation: 1,
  },

  VDivider: {
    color: 'outline-variant',
    thickness: 1,
    opacity: 1,
  },

  VDateInput: {
    prependInnerIcon: 'calendar_month',
    prependIcon: '',
    variant: 'outlined',
    density: 'compact',
    persistentHint: true,
  },

  VChip: {
    variant: 'outlined',
    borderRadius: '16px',
    color: 'on-surface-variant',
    closeIcon: 'close',
    style: [
      {
        fontWeight: '400',
        lineHeight: '12px',
        paddingLeft: '8px',
        paddingRight: '8px',
      },
    ],
  },

  VTextField: {
    variant: 'outlined',
    density: 'compact',
    color: 'primary',
    persistentHint: true,
    persistentClear: true,
    persistentPlaceholder: true,
    clearIcon: 'clear',
  },

  VFieldInput: {
    density: 'compact',
  },

  VField: {
    density: 'compact',
    style: [{ borderRadius: '2px', fontSize: '14px' }],
  },

  VSelect: {
    variant: 'outlined',
    color: 'primary',
  },

  VTextarea: {
    variant: 'outlined',
    color: 'primary',
  },

  VCheckbox: {
    color: 'primary',
    baseColor: 'primary',
  },

  VRadio: {
    //color: 'primary',  // va settato nel VSelectionControl
    baseColor: 'on-surface-variant',
  },

  VSelectionControl: {
    color: 'primary',
  },

  VSwitch: {
    color: 'primary',
    inset: true,
  },

  VTabs: {
    color: 'primary',
  },

  VAlert: {
    rounded: 'lg',
    variant: 'tonal',
  },

  VDialog: {
    rounded: 'xl',
    VBtn: { variant: 'flat' },
  },

  VCardActions: {
    VBtn: { variant: 'flat' },
  },

  VNavigationDrawer: {
    rounded: 'e-xl',
  },

  VSnackbar: {
    rounded: 'md',
    location: 'top right',
    color: 'inverse-surface',
    VBtn: { variant: 'text' },
  },

  VProgressLinear: {
    color: 'primary',
    rounded: true,
    bgColor: 'primary-container',
    bgOpacity: '1',
    height: '8',
    roundedBar: true,
  },

  VProgressCircular: {
    color: 'primary',
    rounded: true,
    bgColor: 'primary-container',
    size: '40',
    width: '4',
  },

  VTooltip: {
    location: 'bottom',
    minWidth: '200px',
  },

  VAutocomplete: {
    color: 'primary',
    baseColor: 'on-surface-variant',
    persistentHint: true,
    density: 'compact',
    variant: 'outlined',
    autocomplete: 'off',
    menuIcon: 'arrow_drop_down',
    clearIcon: 'clear',
  },

  // --- COMPONENTE V-COMBOBOX ---
  VComboBox: {
    //density: 'compact', //not working
  },

  // --- COMPONENTE V-LIST (CONTENITORE LISTA) ---
  VList: {
    density: 'comfortable',
    rounded: 'sm',
    maxHeight: 280,
    color: 'primary',
  },

  // --- COMPONENTE V-LIST-ITEM (ELEMENTI DELLA LISTA) ---
  VListItem: {
    ripple: false,
    baseColor: 'on-surface',
  },

  VExpansionPanels: {
    elevation: 0,
    content: 'fit',
    bgColor: 'surface-container-lowest',
  },

  VExpansionPanel: {
    elevation: 0,
    bgColor: 'surface',
    content: 'fit',
    style: [
      {
        borderColor: 'surface-container-lowest',
        borderWidth: '1px',
        borderStyle: 'solid',
      },
    ],
  },

  VExpansionPanelTitle: {
    bgColor: 'outline-variant',
    collapseIcon: 'expand_less',
    expandIcon: 'expand_more',
    style: [
      {
        paddingTop: '6px',
        paddingBottom: '6px',
        paddingLeft: '12px',
        paddingRight: '9px',
        gap: '4px',
      },
    ],
  },
};
