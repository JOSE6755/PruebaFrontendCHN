<template>
  <span
    class="badge badge-xs sm:badge-sm"
    :class="{
      'badge-error': status === 'open',
      'badge-warning': status === 'in_progress',
      'badge-success': status === 'closed',
    }"
  >
    {{ status }}
  </span>
</template>

<script setup lang="ts">
defineProps<{ status: "open" | "in_progress" | "closed" }>();
</script>
