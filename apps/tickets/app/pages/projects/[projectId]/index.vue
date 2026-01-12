<template>
  <div class="min-h-screen bg-base-200">
    <div class="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 class="text-2xl font-bold">
            {{ project?.project || "Proyecto no encontrado" }}
          </h1>
          <p class="text-sm text-base-content/70">
            Gestión de tickets del proyecto
          </p>
        </div>

        <NuxtLink to="/projects" class="btn btn-outline btn-sm">
          ← Volver
        </NuxtLink>
      </div>

      <TicketsTable
        v-if="project"
        :project_name="project.project"
        :project_id="project.id"
      />

      <div v-else class="alert alert-warning shadow">
        <span> El proyecto solicitado no existe o fue eliminado. </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from "~/stores/projects";
import TicketsTable from "../../../components/organisms/TicketsTable.vue";
definePageMeta({
  middleware: "auth",
});
const projectsStore = useProjectsStore();
const projects = computed(() => projectsStore.projects);
const route = useRoute();
const id = Number(route.params["projectId"]);

const project = computed(() => projects.value.find((p) => p.id === id));
</script>
