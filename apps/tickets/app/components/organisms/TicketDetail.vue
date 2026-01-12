<script setup lang="ts">
import PriorityBadge from "../atoms/PriorityBadge.vue";
import StatusBadge from "../atoms/StatusBadge.vue";
import type { Ticket } from "interfaces/index";
import type NewTicketModal from "./NewTicketModal.vue";

defineProps<{ ticket: Ticket }>();

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
const ticketModal = ref<InstanceType<typeof NewTicketModal> | null>(null);
const emit = defineEmits(["update-status"]);

function openModal(ticket: Ticket | null) {
  if (!ticket) {
    ticketModal.value?.open();
    return;
  }
  ticketModal.value?.openEdit(ticket);
  return;
}
function updateTicketStatus(ticket: {
  id: number;
  status: "open" | "in_progress" | "closed";
}) {
  emit("update-status", { id: ticket.id, status: ticket.status });
}
</script>

<template>
  <div
    class="card bg-base-100 shadow-md border border-base-300 w-full max-w-2xl"
  >
    <div class="card-body gap-4">
      <!-- HEADER -->
      <div class="flex flex-col md:flex-row justify-between gap-3">
        <h2 class="card-title text-xl">
          {{ ticket.title }}
        </h2>

        <div class="flex gap-2">
          <PriorityBadge :priority="ticket.priority" />
          <StatusBadge :status="ticket.status" />
        </div>
      </div>

      <!-- DESCRIPTION -->
      <p class="text-base-content/80">
        {{ ticket.description }}
      </p>

      <!-- INFO GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        <div>
          <span class="font-semibold">Categoría:</span>
          {{ ticket.category }}
        </div>

        <div>
          <span class="font-semibold">Asignado a:</span>
          {{ ticket.assignedTo }}
        </div>

        <div>
          <span class="font-semibold">Creado:</span>
          {{ formatDate(ticket.createdAt) }}
        </div>
      </div>

      <!-- ACTIONS -->
      <div class="card-actions justify-end gap-2 mt-2">
        <BaseButton class="btn-outline btn-sm" @click="openModal(ticket)">
          Editar
        </BaseButton>
        <BaseButton class="btn-error btn-sm"> Eliminar </BaseButton>
      </div>
    </div>
    <NewTicketModal ref="ticketModal" @update-status="updateTicketStatus" />
  </div>
</template>
