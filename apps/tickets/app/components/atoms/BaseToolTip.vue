<script setup lang="ts">
interface Props {
  tip: string;
}

defineProps<Props>();
</script>

<template>
  <div class="tooltip" :data-tip="tip">
    <slot />
  </div>
</template>
