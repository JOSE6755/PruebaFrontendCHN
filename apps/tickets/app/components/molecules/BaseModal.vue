<template>
  <dialog ref="modalRef" class="modal">
    <div class="modal-box w-full max-w-2xl">
      <slot />
    </div>
  </dialog>
</template>

<script setup lang="ts">
const modalRef = ref<HTMLDialogElement | null>(null);

const open = () => {
  modalRef.value?.showModal();
};

const close = () => {
  modalRef.value?.close();
};

defineExpose({ open, close });
</script>
