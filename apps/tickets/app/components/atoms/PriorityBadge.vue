<template>
  <span
    :class="{
      'text-red-500 font-semibold': priority === 'high',
      'text-yellow-500 font-semibold': priority === 'medium',
      'text-green-500 font-semibold': priority === 'low',
    }"
  >
    {{ priority }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ priority: "high" | "medium" | "low" }>();
</script>
