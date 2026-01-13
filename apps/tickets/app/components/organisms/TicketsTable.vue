<template>
  <div class="w-full bg-base-100 rounded-lg shadow-md p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg md:text-xl font-bold text-center md:text-left">
        {{ project_name }}
      </h2>
      <BaseButton class="btn-primary" @click="showCreateTicketModal"
        >Nuevo Ticket</BaseButton
      >
    </div>

    <NewTicketModal ref="createTicketModal" @create="createTicket" />
    <DeleteTicketModal ref="deleteTicketModal" @confirm="confirmDeleteTicket" />

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
      <BaseInput v-model="titleFilter" placeholder="Buscar por título" />

      <select v-model="priorityFilter" class="select select-bordered w-full">
        <option value="">Todas las prioridades</option>
        <option value="high">Alta</option>
        <option value="medium">Media</option>
        <option value="low">Baja</option>
      </select>

      <select v-model="statusFilter" class="select select-bordered w-full">
        <option value="">Todos los estados</option>
        <option value="open">Abierto</option>
        <option value="in_progress">En progreso</option>
        <option value="closed">Cerrado</option>
      </select>

      <BaseInput v-model="dateFrom" type="date" />

      <BaseInput v-model="dateTo" type="date" />
    </div>

    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead class="hidden md:table-header-group">
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Prioridad</th>
            <th>Estado</th>
            <th>Asignado a</th>
            <th>Creado</th>
            <th class="text-center">Acciones</th>
          </tr>
        </thead>

        <tbody>
          <TicketRow
            v-for="ticket in filteredTickets"
            :key="ticket.id"
            :ticket="ticket"
            @view="onView"
            @edit="onEdit"
            @delete="onDelete"
          />
        </tbody>
      </table>
    </div>

    <p
      v-if="filteredTickets?.length === 0"
      class="text-center mt-4 text-base-content opacity-70"
    >
      No hay tickets que coincidan con los filtros.
    </p>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from "~/stores/projects";
import TicketRow from "../molecules/TicketRow.vue";
import NewTicketModal from "./NewTicketModal.vue";
import type { Ticket } from "interfaces";
import DeleteTicketModal from "./DeleteTicketModal.vue";
const props = defineProps<{
  project_name: string;
  project_id: number;
}>();
const route = useRoute();
const projectsStore = useProjectsStore();
const project = computed(() => {
  return projectsStore.getProjectById(props.project_id);
});
const tickets_list = computed(() => {
  return project.value?.tickets || [];
});

const createTicketModal = ref<InstanceType<typeof NewTicketModal> | null>(null);
const deleteTicketModal = ref<InstanceType<typeof DeleteTicketModal> | null>(
  null
);

const titleFilter = ref("");
const priorityFilter = ref("");
const statusFilter = ref("");
const dateFrom = ref("");
const dateTo = ref("");

const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredTickets = computed(() => {
  return tickets_list.value.filter((ticket) => {
    const matchesTitle = removeAccents(ticket.title.toLowerCase()).includes(
      removeAccents(titleFilter.value.toLowerCase())
    );

    const matchesPriority =
      !priorityFilter.value || ticket.priority === priorityFilter.value;

    const matchesStatus =
      !statusFilter.value || ticket.status === statusFilter.value;

    const ticketDate = new Date(ticket.createdAt).getTime();
    const from = dateFrom.value
      ? new Date(dateFrom.value).getTime()
      : -Infinity;
    const to = dateTo.value ? new Date(dateTo.value).getTime() : Infinity;

    return (
      matchesTitle &&
      matchesPriority &&
      matchesStatus &&
      ticketDate >= from &&
      ticketDate <= to
    );
  });
});

const onView = (ticket: Ticket) => {
  navigateTo({
    path: `${route.path}/ticket/${ticket.id}`,
  });
};

const onEdit = (ticket: Ticket) => {
  console.log("Editar ticket:", ticket);
};

const onDelete = (ticket: Ticket) => {
  deleteTicketModal.value?.open(ticket);
};

const confirmDeleteTicket = (ticketId: number) => {
  projectsStore.deleteTicket(props.project_id, ticketId);
};

const showCreateTicketModal = () => {
  createTicketModal.value?.open();
};

function createTicket(ticket: Ticket) {
  projectsStore.addTicket(props.project_id, ticket);
}
</script>
