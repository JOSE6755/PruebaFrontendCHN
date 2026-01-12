<script setup lang="ts">
interface Props {
  type?:
    | "loading-spinner"
    | "loading-dots"
    | "loading-ring"
    | "loading-ball"
    | "loading-bars";
  size?:
    | "loading-xs"
    | "loading-sm"
    | "loading-md"
    | "loading-lg"
    | "loading-xl";
  color?: "text-primary" | "text-secondary" | "text-success" | "text-warning";
}
withDefaults(defineProps<Props>(), {
  type: "loading-spinner",
  size: "loading-sm",
  color: "text-primary",
});
</script>

<template>
  <span class="loading" :class="[type, size, color]"></span>
</template>
