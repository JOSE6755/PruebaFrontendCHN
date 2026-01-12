<template>
  <BaseModal ref="modalRef">
    <h3 class="font-bold text-lg mb-4 text-error">Eliminar ticket</h3>

    <p class="text-base-content mb-6">
      ¿Estás seguro de que deseas eliminar el ticket
      <span class="font-semibold">“{{ ticket?.title }}”</span>?
      <br />
      Esta acción no se puede deshacer.
    </p>

    <div class="modal-action">
      <BaseButton type="button" class="btn-ghost" @click="close">
        Cancelar
      </BaseButton>

      <BaseButton type="button" class="btn-error" @click="confirmDelete">
        Eliminar
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../molecules/BaseModal.vue";
import BaseButton from "../atoms/BaseButton.vue";

const modalRef = ref<InstanceType<typeof BaseModal> | null>(null);
const ticket = ref<any | null>(null);

const emit = defineEmits<{
  (e: "confirm", id: number): void;
}>();

// 👇 método explícito (NO colisiona con otros modales)
const open = (ticketData: any) => {
  ticket.value = ticketData;
  modalRef.value?.open();
};

const close = () => {
  modalRef.value?.close();
};

const confirmDelete = () => {
  if (!ticket.value) return;

  emit("confirm", ticket.value.id);
  close();
};

defineExpose({ open });
</script>
