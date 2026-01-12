<template>
  <div
    v-if="visible"
    :class="[
      'alert shadow-lg rounded-lg p-4 flex items-center gap-3',
      alertTypeClass,
    ]"
    role="alert"
  >
    <slot>
      {{ message }}
    </slot>
    <button
      type="button"
      class="ml-auto btn btn-ghost btn-sm"
      @click="closeAlert"
      aria-label="Cerrar alerta"
    >
      ✕
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
interface Props {
  type?: "success" | "warning" | "error" | "info";
  message?: string;
  duration?: number;
}
const props = withDefaults(defineProps<Props>(), {
  type: "info",
  duration: 5000,
  message: "",
});

const visible = ref(true);

const alertTypeClass = computed(() => {
  switch (props.type) {
    case "success":
      return "alert-success";
    case "error":
      return "alert-error";
    case "warning":
      return "alert-warning";
    case "info":
    default:
      return "alert-info";
  }
});

const closeAlert = () => {
  visible.value = false;
};

if (props.duration > 0) {
  setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
</script>
