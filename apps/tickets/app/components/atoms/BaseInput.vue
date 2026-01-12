<script lang="ts" setup>
interface Props {
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

withDefaults(defineProps<Props>(), {
  placeholder: "",
  type: "text",
  disabled: false,
});

const modelValue = defineModel<string | number>();
defineEmits(["input", "update:modelValue"]);
</script>

<template>
  <input
    v-model="modelValue"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    class="input"
  />
</template>
