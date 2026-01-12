<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useProjectsStore } from "~/stores/projects"; // ajusta según tu store

const router = useRouter();
const projectsStore = useProjectsStore();
const projects = computed(() => projectsStore.projects);

// Registrar Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Flatten todos los tickets
const tickets = computed(() => projects.value.flatMap((p) => p.tickets));

// Agrupar tickets por fecha y estado
const groupedData = computed(() => {
  const data: Record<string, Record<string, number>> = {}; // {fecha: {estado: cantidad}}
  tickets.value.forEach((ticket) => {
    const date = new Date(ticket.createdAt).toLocaleDateString("es-ES");
    if (!data[date]) data[date] = { open: 0, in_progress: 0, closed: 0 };
    if (!data[date][ticket.status]) data[date][ticket.status] = 0;
    data[date][ticket.status]++;
  });
  return data;
});

// Labels de fechas ordenadas
const labels = Object.keys(groupedData.value).sort(
  (a, b) => new Date(a).getTime() - new Date(b).getTime()
);

// Datos para Chart.js
const chartData = computed(() => ({
  labels,
  datasets: [
    {
      label: "Abiertos",
      backgroundColor: "#f87171", // rojo
      data: labels.map((d) => groupedData.value[d]?.open || 0),
    },
    {
      label: "En progreso",
      backgroundColor: "#facc15", // amarillo
      data: labels.map((d) => groupedData.value[d]?.in_progress || 0),
    },
    {
      label: "Cerrados",
      backgroundColor: "#34d399", // verde
      data: labels.map((d) => groupedData.value[d]?.closed || 0),
    },
  ],
}));

// Opciones responsivas y apiladas
const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
    title: { display: true, text: "Tickets por estado y fecha" },
  },
  scales: {
    x: { stacked: true },
    y: { stacked: true, beginAtZero: true },
  },
};

// Función para volver a /projects
const goBack = () => {
  router.push("/projects");
};
</script>

<template>
  <div class="w-full max-w-6xl mx-auto p-4 sm:p-6 flex flex-col gap-4">
    <!-- HEADER -->
    <header class="flex flex-col items-center gap-2">
      <h1 class="text-2xl sm:text-3xl font-bold text-base-content text-center">
        Tickets Dashboard
      </h1>
      <p class="text-sm sm:text-base text-base-content opacity-70 text-center">
        Visualización de tickets por estado y fecha
      </p>
    </header>

    <!-- BOTÓN VOLVER -->
    <div class="self-start">
      <button @click="goBack" class="btn btn-ghost btn-sm">
        ← Volver a Proyectos
      </button>
    </div>

    <!-- CONTENEDOR DEL GRÁFICO -->
    <div class="bg-base-100 rounded-xl shadow-lg p-4 sm:p-6 overflow-x-auto">
      <h2
        class="text-xl sm:text-2xl font-bold text-base-content mb-4 text-center"
      >
        Tickets por estado y fecha
      </h2>
      <Bar
        :data="chartData"
        :options="chartOptions"
        class="w-full min-h-[300px] sm:min-h-[400px]"
      />
    </div>
  </div>
</template>
