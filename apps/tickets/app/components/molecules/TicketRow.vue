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

    <!-- ACCIONES -->
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

interface Ticket {
  id: number;
  title: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "closed";
  assignedTo: string;
  createdAt: string;
}

defineProps<{ ticket: Ticket }>();

// defineEmits<{
//   (e: "view", ticket: Ticket): void;
//   (e: "edit", ticket: Ticket): void;
//   (e: "delete", ticket: Ticket): void;
// }>();

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
</script>
