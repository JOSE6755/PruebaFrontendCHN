<script lang="ts" setup>
interface Props {
  disabled?: boolean;
  label?: string;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  label: "Button",
  loading: false,
});

const emits = defineEmits(["click"]);
</script>

<template>
  <button
    class="btn"
    :disabled="props.disabled || props.loading"
    @click="emits('click')"
  >
    <template v-if="!props.loading">
      <slot>{{ props.label }}</slot>
    </template>
    <template v-else>
      <span class="loading loading-bars loading-xs"></span>
    </template>
  </button>
</template>
