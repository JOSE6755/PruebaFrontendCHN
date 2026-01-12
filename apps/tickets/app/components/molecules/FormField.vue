<script lang="ts" setup>
interface Props {
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  error?: string;
  help?: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: "",
  type: "text",
  disabled: false,
});

const modelValue = defineModel<string | number>();
</script>

<template>
  <div class="w-full flex flex-col gap-2 p-2 justify-center">
    <label v-if="label">
      <span>{{ label }}</span>
    </label>

    <BaseInput
      v-model="modelValue"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="error ? 'input-error' : ''"
    />

    <label v-if="error" class="label">
      <span class="text-error">{{ error }}</span>
    </label>

    <p v-if="help" class="text-sm mt-1">{{ help }}</p>
  </div>
</template>
