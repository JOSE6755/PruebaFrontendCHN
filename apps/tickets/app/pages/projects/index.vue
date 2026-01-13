<template>
  <div class="w-full min-h-screen bg-base-200 p-6">
    <div class="max-w-7xl mx-auto flex flex-col gap-6">
      <h1 class="text-2xl font-bold text-center md:text-left">Proyectos</h1>

      <div class="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <label class="text-sm font-medium"> Buscar proyecto </label>
        <BaseInput
          v-model="search"
          placeholder="Portal Web, API, Dashboard..."
          class="w-full sm:max-w-md"
        />
      </div>

      <div
        class="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      >
        <div
          v-for="project in filteredProjects"
          :key="project.id"
          class="card bg-base-100 shadow hover:shadow-lg transition"
        >
          <div class="card-body flex flex-col gap-4">
            <h2 class="card-title text-lg font-semibold">
              {{ project.project }}
            </h2>

            <div class="flex flex-col gap-1 text-sm">
              <div class="flex justify-between">
                <span class="text-error">Alta</span>
                <span class="font-medium">
                  {{ countPriority(project, "high") }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-warning">Media</span>
                <span class="font-medium">
                  {{ countPriority(project, "medium") }}
                </span>
              </div>
              <div class="flex justify-between">
                <span class="text-success">Baja</span>
                <span class="font-medium">
                  {{ countPriority(project, "low") }}
                </span>
              </div>
            </div>

            <div class="mt-auto flex items-center justify-between text-sm">
              <span class="opacity-70">
                Total: {{ project.tickets.length }}
              </span>

              <BaseButton
                class="btn-primary btn-sm"
                @click="viewProject(project.id)"
              >
                Ver tickets
              </BaseButton>
            </div>
          </div>
        </div>

        <p
          v-if="filteredProjects.length === 0"
          class="col-span-full text-center text-base-content opacity-70 mt-6"
        >
          No se encontraron proyectos con ese nombre.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProjectsStore } from "~/stores/projects";

definePageMeta({
  middleware: "auth",
});

const projectsStore = useProjectsStore();
const projects = computed(() => projectsStore.projects);

const search = ref("");

const removeAccents = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const filteredProjects = computed(() =>
  projects.value.filter((project) =>
    removeAccents(project.project.toLowerCase()).includes(
      removeAccents(search.value.toLowerCase())
    )
  )
);

function viewProject(id: number) {
  navigateTo(`/projects/${id}`);
}

const countPriority = (project: (typeof projects)[number], priority: string) =>
  project.tickets.filter((ticket) => ticket.priority === priority).length;
</script>
