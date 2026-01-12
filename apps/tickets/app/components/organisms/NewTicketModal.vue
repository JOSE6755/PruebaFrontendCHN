<template>
  <BaseModal ref="baseModalRef">
    <h3 class="font-bold text-lg mb-6">
      {{ isEdit ? "Editar estado del ticket" : "Nuevo Ticket" }}
    </h3>

    <form class="space-y-4" @submit.prevent="submit">
      <!-- Título -->
      <FormField
        v-model="form.title"
        label="Título"
        placeholder="Título del ticket"
        :error="errors.title"
        :disabled="isEdit"
      />

      <!-- Descripción -->
      <div class="w-full flex flex-col gap-2 p-2">
        <label class="label">
          <span class="label-text">Descripción</span>
        </label>
        <textarea
          v-model="form.description"
          class="textarea textarea-bordered w-full"
          placeholder="Descripción del ticket"
          :disabled="isEdit"
        />
      </div>

      <!-- Prioridad + Estado -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="w-full flex flex-col gap-2 p-2">
          <label class="label">
            <span class="label-text">Prioridad</span>
          </label>
          <select
            v-model="form.priority"
            class="select select-bordered w-full"
            :disabled="isEdit"
          >
            <option disabled value="">Seleccionar prioridad</option>
            <option value="high">Alta</option>
            <option value="medium">Media</option>
            <option value="low">Baja</option>
          </select>
        </div>

        <div class="w-full flex flex-col gap-2 p-2">
          <label class="label">
            <span class="label-text">Estado</span>
          </label>
          <select v-model="form.status" class="select select-bordered w-full">
            <option value="open">Abierto</option>
            <option value="in_progress">En progreso</option>
            <option value="closed">Cerrado</option>
          </select>
        </div>
      </div>

      <!-- Asignado -->
      <FormField
        v-model="form.assignedTo"
        label="Asignado a"
        placeholder="Nombre del responsable"
        :error="errors.assignedTo"
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

const baseModalRef = ref<InstanceType<typeof BaseModal> | null>(null);

const isEdit = ref(false);
const editingId = ref<number | null>(null);

const emit = defineEmits<{
  (e: "create", ticket: any): void;
  (e: "update-status", payload: { id: number; status: string }): void;
}>();

const form = reactive({
  title: "",
  description: "",
  priority: "",
  status: "",
  assignedTo: "",
});

const errors = reactive({
  title: "",
  assignedTo: "",
});

const open = () => {
  isEdit.value = false;
  baseModalRef.value?.open();
};

const openEdit = (ticket: any) => {
  isEdit.value = true;
  editingId.value = ticket.id;
  Object.assign(form, ticket);
  baseModalRef.value?.open();
};

const close = () => {
  baseModalRef.value?.close();
};

const validate = () => {
  if (isEdit.value) return true;

  errors.title = "";
  errors.assignedTo = "";

  let valid = true;

  if (!form.title) {
    errors.title = "El título es obligatorio";
    valid = false;
  }

  if (!form.assignedTo) {
    errors.assignedTo = "Debe asignarse a alguien";
    valid = false;
  }

  return valid;
};

const submit = () => {
  if (!validate()) return;

  if (isEdit.value && editingId.value !== null) {
    emit("update-status", {
      id: editingId.value,
      status: form.status,
    });
  } else {
    emit("create", {
      id: Date.now(),
      category: "task",
      createdAt: new Date().toISOString(),
      ...form,
    });
  }

  Object.assign(form, {
    title: "",
    description: "",
    priority: "",
    status: "",
    assignedTo: "",
  });

  close();
};

defineExpose({ open, openEdit });
</script>
