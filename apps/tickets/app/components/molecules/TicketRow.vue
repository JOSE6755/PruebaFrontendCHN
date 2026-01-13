<template>
  <tr
    class="block md:table-row border md:border-0 rounded-lg md:rounded-none mb-4 md:mb-0 p-4 md:p-0 bg-base-200 md:bg-transparent"
  >
    <td class="block md:table-cell font-bold md:font-normal">
      <span class="md:hidden">ID:</span> {{ ticket.id }}
    </td>

    <td class="block md:table-cell">
      <span class="md:hidden font-semibold">Título:</span>
      {{ ticket.title }}
    </td>

    <td class="block md:table-cell">
      <span class="md:hidden font-semibold">Prioridad:</span>
      <PriorityBadge :priority="ticket.priority" />
    </td>

    <td class="block md:table-cell">
      <span class="md:hidden font-semibold">Estado:</span>
      <StatusBadge :status="ticket.status" />
    </td>

    <td class="block md:table-cell">
      <span class="md:hidden font-semibold">Asignado:</span>
      {{ ticket.assignedTo }}
    </td>

    <td class="block md:table-cell">
      <span class="md:hidden font-semibold">Creado:</span>
      {{ formatDate(ticket.createdAt) }}
    </td>

    <td class="block md:table-cell mt-3 md:mt-0">
      <div class="flex gap-2 justify-end md:justify-center">
        <BaseButton class="btn btn-xs btn-info" @click="$emit('view', ticket)">
          Ver
        </BaseButton>
        <!-- <BaseButton
          class="btn btn-xs btn-warning"
          @click="$emit('edit', ticket)"
        >
          Editar
        </BaseButton> -->
        <BaseButton
          class="btn btn-xs btn-error"
          v-if="authStore.hasRole('admin')"
          @click="$emit('delete', ticket)"
        >
          Borrar
        </BaseButton>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import PriorityBadge from "../atoms/PriorityBadge.vue";
import StatusBadge from "../atoms/StatusBadge.vue";
import { userAuthStore } from "#imports";
import type { TicketRow } from "interfaces";
const authStore = userAuthStore();

defineProps<{ ticket: TicketRow }>();

// defineEmits<{
//   (e: "view", ticket: TicketRow): void;
//   (e: "edit", ticket: TicketRow): void;
//   (e: "delete", ticket: TicketRow): void;
// }>();

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
</script>
