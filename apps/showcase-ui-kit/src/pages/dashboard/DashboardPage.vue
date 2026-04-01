<template>
  <v-container class="py-8">
    <v-row v-if="cards.length">
      <v-col
        v-for="(card, index) in filteredCards"
        :key="index"
        cols="12"
        sm="6"
        md="4"
        lg="3">
        <v-card
          :to="card.link"
          class="h-100"
          hover
          elevation="2">
          <v-img
            :src="card.imageUrl"
            :alt="card.title"
            height="200"
            cover
            class="bg-white" />
          <v-card-title>{{ card.title }} </v-card-title>
          <v-card-text class="text-medium-emphasis rxr-text-body">
            {{ card.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col class="text-center">
        <v-img
          src="/assets/illustrations/no-results.svg"
          alt="No results found"
          max-width="300"
          class="mx-auto mb-4" />
        <p class="text-h6 text-medium-emphasis">No results found</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

interface Card {
  title: string;
  description: string;
  link: string;
  imageUrl?: string;
  keys?: string[];
}

const searchQuery = ref('');

const cards = ref<Card[]>([
  {
    title: 'Badges',
    description:
      "Badges are non-interactive, visual indicators used to capture the user's attention and denote numeric values.",
    link: '/components/badges-demo',
  },
  {
    title: 'Bottom Sheet',
    description:
      'Mobile bottom sheets allow users to complete a series of simple steps within a larger task.',
    link: '/components/bottom-sheet',
  },
  {
    title: 'Buttons',
    description:
      'Buttons communicate the action that will occur when the user interacts with them.',
    link: '/components/buttons-demo',
  },
  {
    title: 'Cards',
    description:
      'Cards are a convenient means of displaying content composed of different elements.',
    link: '/components/cards-demo',
  },
  {
    title: 'Datepickers',
    description: 'Datepickers allow users to select a date or range of dates.',
    link: '/components/datepickers-demo',
  },
  {
    title: 'Dialogs',
    description: 'Dialogs inform users about a task and can contain critical information.',
    link: '/components/dialogs-demo',
  },
  {
    title: 'Dividers',
    description: 'Dividers group content in lists and other containers.',
    link: '/components/dividers-demo',
  },
  {
    title: 'Drop-downs',
    description: 'Drop-downs display a list of choices on temporary surfaces.',
    link: '/components/drop-downs-demo',
  },
  {
    title: 'Elevations',
    description: 'Elevation demonstrates how components use shadows to create depth.',
    link: '/components/elevations-demo',
  },
  {
    title: 'Expansion Panels',
    description: 'Expansion panels provide an expandable details-summary view.',
    link: '/components/expansion-panels-demo',
  },
  {
    title: 'Colors',
    description:
      'Material Design 3 tonal color system — palettes, semantic roles, accessible pairings, and usage examples.',
    link: '/brand/colors-demo',
  },
  {
    title: 'Icons',
    description: 'Icons are visual symbols used to represent ideas, objects, or actions.',
    link: '/brand/icons-demo',
  },
  {
    title: 'Typography',
    description:
      'AH Design System type scale — Display, Headline, Title, Label, Body with Regular, Light, SemiBold and Bold weights.',
    link: '/brand/typography-demo',
  },
  {
    title: 'Labels',
    description: 'Labels are text identifiers for form fields and other UI elements.',
    link: '/components/labels-demo',
  },
  {
    title: 'Menus',
    description: 'Menus display a list of choices on temporary surfaces.',
    link: '/components/menus-demo',
  },
  {
    title: 'Message Bar',
    description:
      'Message bars provide brief messages about app processes at the bottom of the screen.',
    link: '/components/message-bar-demo',
  },
  {
    title: 'Notifications XS',
    description: 'Small notification cards for compact displays.',
    link: '/global-components/notifications-xs-demo',
  },
  {
    title: 'Page Header',
    description: 'Global page header component for consistent navigation.',
    link: '/global-components/page-header-demo',
  },
  {
    title: 'Panels',
    description: 'Panels are containers for grouping related content.',
    link: '/components/panels-demo',
  },
  {
    title: 'Progress Indicators',
    description:
      'Progress indicators express an unspecified wait time or display the length of a process.',
    link: '/components/progress-indicators-demo',
  },
  {
    title: 'Selection Controls',
    description: 'Selection controls allow users to select options.',
    link: '/components/selection-controls-demo',
  },
  {
    title: 'Switches',
    description:
      'Switches toggle a single setting on or off. Supports optional label and required indicator.',
    link: '/components/switches-demo',
  },
  {
    title: 'Tabs',
    description: 'Tabs organize content across different screens and views.',
    link: '/components/tabs-demo',
  },
  {
    title: 'Text Fields',
    description: 'Text fields let users enter and edit text.',
    link: '/components/text-fields-demo',
  },
  {
    title: 'Tooltips',
    description:
      'Tooltips display brief, informational text when a user hovers over or focuses on a UI element. Plain and rich variants.',
    link: '/components/tooltips-demo',
  },
]);

const filteredCards = computed(() => {
  if (!searchQuery.value) return cards.value;
  const query = searchQuery.value.toLowerCase();
  return cards.value.filter(
    card =>
      card.title.toLowerCase().includes(query) ||
      card.description.toLowerCase().includes(query) ||
      card.keys?.some(key => key.toLowerCase().includes(query))
  );
});
</script>
