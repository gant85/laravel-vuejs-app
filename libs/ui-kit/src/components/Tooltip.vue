<template>
  <!-- Plain tooltip: teleported to body to escape overflow:hidden containers -->
  <span
    v-if="type === 'plain'"
    ref="activatorRef"
    class="ui-tooltip-wrapper"
    v-bind="$attrs"
    @mouseenter="onPlainEnter"
    @mouseleave="showPlain = false">
    <slot
      name="activator"
      :props="{}" />
    <Teleport to="body">
      <span
        v-if="showPlain"
        class="ui-tooltip-plain"
        role="tooltip"
        :style="plainStyle">
        <slot>{{ text }}</slot>
      </span>
    </Teleport>
  </span>

  <!-- Rich tooltip: v-menu so user can interact with content -->
  <v-menu
    v-else
    open-on-hover
    :close-on-content-click="false"
    :open-delay="300"
    :close-delay="200"
    content-class="ui-tooltip--rich-content"
    v-bind="$attrs">
    <template #activator="{ props: activatorProps }">
      <slot
        name="activator"
        :props="activatorProps" />
    </template>
    <div class="ui-tooltip-rich">
      <div class="ui-tooltip-rich__content">
        <div
          v-if="showSubhead && title"
          class="ui-tooltip-rich__title">
          {{ title }}
        </div>
        <div class="ui-tooltip-rich__supporting">
          <slot>{{ text }}</slot>
        </div>
      </div>
      <div
        v-if="showActions"
        class="ui-tooltip-rich__actions">
        <slot name="actions" />
      </div>
    </div>
  </v-menu>
</template>

<script setup lang="ts">
import { reactive, ref, type CSSProperties } from 'vue';

export type TooltipType = 'plain' | 'rich';

defineOptions({ name: 'UiTooltip', inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    type?: TooltipType;
    text?: string;
    title?: string;
    showSubhead?: boolean;
    showActions?: boolean;
    maxWidth?: number;
  }>(),
  {
    type: 'plain',
    text: undefined,
    title: undefined,
    showSubhead: true,
    showActions: false,
    maxWidth: undefined,
  }
);

const showPlain = ref(false);
const activatorRef = ref<HTMLElement>();
const plainStyle = reactive<CSSProperties>({});

function onPlainEnter() {
  if (activatorRef.value) {
    const rect = activatorRef.value.getBoundingClientRect();
    plainStyle.position = 'fixed';
    plainStyle.top = `${rect.bottom + 8}px`;
    plainStyle.left = `${rect.left + rect.width / 2}px`;
    plainStyle.transform = 'translateX(-50%)';
    plainStyle.maxWidth = props.maxWidth ? `${props.maxWidth}px` : undefined;
  }
  showPlain.value = true;
}
</script>

<style scoped>
.ui-tooltip-wrapper {
  display: inline-flex;
}
</style>
