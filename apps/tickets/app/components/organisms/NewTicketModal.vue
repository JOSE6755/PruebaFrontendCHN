<template>
  <BaseModal ref="baseModalRef">
    <h3 class="font-bold text-lg mb-6">
      {{ isEdit ? "Editar estado del ticket" : "Nuevo Ticket" }}
    </h3>

    <form class="space-y-4" @submit.prevent="submit">
      <FormField
        v-model="fields.title.value"
        label="Título"
        placeholder="Título del ticket"
        :error="fields.title.error"
        :disabled="isEdit"
      />

      <div class="w-full flex flex-col gap-2 p-2">
        <label class="label">
          <span class="label-text">Descripción</span>
        </label>
        <textarea
          v-model="fields.description.value"
          class="textarea textarea-bordered w-full"
          placeholder="Descripción del ticket"
          :disabled="isEdit"
        />
        <span v-if="fields.description.error" class="text-error text-sm">
          {{ fields.description.error }}
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="w-full flex flex-col gap-2 p-2">
          <label class="label">
            <span class="label-text">Prioridad</span>
          </label>
          <select
            v-model="fields.priority.value"
            class="select select-bordered w-full"
            :disabled="isEdit"
          >
            <option disabled value="">Seleccionar prioridad</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
          <span v-if="fields.priority.error" class="text-error text-sm">
            {{ fields.priority.error }}
          </span>
        </div>

        <div class="w-full flex flex-col gap-2 p-2">
          <label class="label">
            <span class="label-text">Estado</span>
          </label>
          <select
            v-model="fields.status.value"
            class="select select-bordered w-full"
          >
            <option value="">Seleccionar estado</option>
            <option value="open">Abierto</option>
            <option value="in_progress">En progreso</option>
            <option value="closed">Cerrado</option>
          </select>
          <span v-if="fields.status.error" class="text-error text-sm">
            {{ fields.status.error }}
          </span>
        </div>
      </div>

      <FormField
        v-model="fields.assignedTo.value"
        label="Asignado a"
        placeholder="Nombre del responsable"
        :error="fields.assignedTo.error"
        :disabled="isEdit"
      />

      <!-- Acciones -->
      <div class="modal-action">
        <BaseButton type="button" class="btn-ghost" @click="close">
          Cancelar
        </BaseButton>
        <BaseButton type="submit" class="btn-primary">
          {{ isEdit ? "Guardar cambios" : "Crear Ticket" }}
        </BaseButton>
      </div>
    </form>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "../molecules/BaseModal.vue";
import FormField from "../molecules/FormField.vue";
import BaseButton from "../atoms/BaseButton.vue";
import { ticketSchema } from "utils";
import type { Ticket } from "interfaces";

const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const isEdit = ref(false);
const editingId = ref<number | null>(null);

const emit = defineEmits<{
  (e: "create", ticket: Ticket): void;
  (e: "update-status", payload: { id: number; status: string }): void;
}>();

const fields = reactive({
  title: { value: "", error: "" },
  description: { value: "", error: "" },
  priority: { value: "", error: "" },
  status: { value: "", error: "" },
  assignedTo: { value: "", error: "" },
});

const open = () => {
  isEdit.value = false;
  baseModalRef.value?.open();
};

const openEdit = (ticket: Ticket) => {
  isEdit.value = true;
  editingId.value = ticket.id;

  fields.title.value = ticket.title;
  fields.description.value = ticket.description;
  fields.priority.value = ticket.priority;
  fields.status.value = ticket.status;
  fields.assignedTo.value = ticket.assignedTo;

  baseModalRef.value?.open();
};

const close = () => {
  baseModalRef.value?.close();
};

const validate = async () => {
  if (isEdit.value) return true;

  // limpiar errores
  Object.values(fields).forEach((f) => (f.error = ""));

  try {
    await ticketSchema.validate(
      {
        title: fields.title.value,
        description: fields.description.value,
        priority: fields.priority.value,
        status: fields.status.value,
        assignedTo: fields.assignedTo.value,
      },
      { abortEarly: false }
    );
    return true;
  } catch (err: any) {
    err.inner.forEach((e: any) => {
      if (e.path && fields[e.path as keyof typeof fields]) {
        fields[e.path as keyof typeof fields].error = e.message;
      }
    });
    return false;
  }
};

const submit = async () => {
  if (!(await validate())) return;

  const payload = {
    title: fields.title.value,
    description: fields.description.value,
    priority: fields.priority.value,
    status: fields.status.value,
    assignedTo: fields.assignedTo.value,
  };

  if (isEdit.value && editingId.value !== null) {
    emit("update-status", {
      id: editingId.value,
      status: payload.status,
    });
  } else {
    emit("create", {
      id: Date.now(),
      category: "task",
      createdAt: new Date().toISOString(),
      ...payload,
    });
  }

  Object.values(fields).forEach((f) => (f.value = ""));
  close();
};

defineExpose({ open, openEdit });
</script>
