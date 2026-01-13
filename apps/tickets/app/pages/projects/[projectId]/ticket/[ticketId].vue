<template>
  <div
    class="min-h-screen flex flex-col items-center justify-start p-4 gap-6 w-full max-w-4xl mx-auto"
  >
    <NuxtLink :to="`/projects/${projectId}`" class="btn btn-outline btn-sm">
      ← Volver
    </NuxtLink>

    <TicketDetail
      :ticket="ticket"
      @update-status="updateTicketStatus"
      @delete="deleteTicket"
      class="w-full"
    />

    <div
      class="w-full bg-base-200 p-4 rounded-lg shadow-md flex flex-col gap-4"
    >
      <h3 class="text-lg font-semibold">Comentarios</h3>

      <div
        v-if="ticket?.comments?.length"
        class="flex flex-col gap-3 max-h-96 overflow-y-auto"
      >
        <div
          v-for="(comment, index) in ticket.comments"
          :key="index"
          class="p-3 bg-base-100 rounded-lg border border-base-300"
        >
          <div class="flex justify-between items-center mb-1">
            <span class="font-semibold text-sm sm:text-base">{{
              comment.author
            }}</span>
            <span class="text-xs text-base-content/50">{{
              formatDate(comment.createdAt)
            }}</span>
          </div>
          <p class="text-sm sm:text-base">{{ comment.text }}</p>
        </div>
      </div>

      <p v-else class="text-sm text-base-content/60">
        No hay comentarios todavía.
      </p>

      <div class="flex flex-col sm:flex-row gap-2 mt-2 w-full">
        <input
          v-model="newComment"
          type="text"
          placeholder="Escribe un comentario..."
          class="input input-bordered flex-1 min-h-[2.5rem]"
          @keyup.enter="handleAddComment"
        />
        <BaseButton
          class="btn btn-primary w-full sm:w-auto min-h-[2.5rem]"
          @click="handleAddComment"
        >
          Agregar
        </BaseButton>
        <BaseButton
          class="btn btn-primary w-full sm:w-auto min-h-[2.5rem]"
          @click="generateComment"
        >
          Generar comentario
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TicketDetail from "~/components/organisms/TicketDetail.vue";
import { useProjectsStore } from "~/stores/projects";
import { ref, computed } from "vue";
import { fetchRandomItem } from "utils";
definePageMeta({
  middleware: "auth",
});
const authStore = userAuthStore();
const projectsStore = useProjectsStore();
const projects = computed(() => projectsStore.projects);

const route = useRoute();
const projectId = Number(route.params["projectId"]);
const ticketId: number = Number(route.params["ticketId"]);
const project = computed(() =>
  projects.value.find((val) => val.id === projectId)
);
const ticket = computed(() =>
  project.value?.tickets.find((val) => val.id === ticketId)
);

const newComment = ref("");

function updateTicketStatus(payload: {
  id: number;
  status: "open" | "in_progress" | "closed";
}) {
  if (!ticket.value) return;
  projectsStore.updateTicketStatus(projectId, payload.id, payload.status);
}

function handleAddComment() {
  if (!newComment.value.trim() || !ticket.value) return;

  const comment = {
    author: authStore.fullName,
    text: newComment.value.trim(),
    createdAt: new Date().toISOString(),
  };

  if (!ticket.value.comments) ticket.value.comments = [];
  ticket.value.comments.push(comment);

  newComment.value = "";

  setTimeout(() => {
    const container = document.querySelector(".max-h-96");
    if (container) container.scrollTop = container.scrollHeight;
  }, 50);
}
async function generateComment() {
  if (!ticket.value) return;

  const textComment: string = await fetchRandomItem();
  const comment = {
    author: authStore.fullName,
    text: textComment,
    createdAt: new Date().toISOString(),
  };
  if (!ticket.value.comments) ticket.value.comments = [];
  ticket.value.comments.push(comment);
  setTimeout(() => {
    const container = document.querySelector(".max-h-96");
    if (container) container.scrollTop = container.scrollHeight;
  }, 50);
}

const deleteTicket = (ticketId: number) => {
  projectsStore.deleteTicket(projectId, ticketId);
  navigateTo(`/projects/${projectId}`);
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("es-ES", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>
