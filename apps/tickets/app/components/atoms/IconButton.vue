<script lang="ts" setup>
import BaseIcon from "./BaseIcon.vue";

interface Props {
  disabled?: boolean;
  label: string;
  loading?: boolean;
  position?: "left" | "right";
  iconName: string;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: "Button",
  loading: false,
  position: "left",
  iconName: "",
});
</script>

<template>
  <button class="btn" :disabled="props.disabled || props.loading">
    <template v-if="!loading">
      <BaseIcon v-if="props.position === 'left'">{{ props.iconName }}</BaseIcon>
      {{ props.label }}
      <BaseIcon v-if="props.position === 'right'">{{
        props.iconName
      }}</BaseIcon>
    </template>
    <template v-else>
      <span class="loading loading-bars loading-xs"></span>
    </template>
  </button>
</template>
