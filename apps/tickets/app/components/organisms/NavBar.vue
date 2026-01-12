<template>
  <div class="navbar bg-base-100 shadow-md px-4">
    <!-- LEFT -->
    <div class="flex-1">
      <NuxtLink to="/" class="text-xl font-bold">
        Ticket<span class="text-primary">System</span>
      </NuxtLink>
    </div>

    <!-- DESKTOP MENU -->
    <div class="hidden md:flex gap-2">
      <NuxtLink to="/" class="btn btn-ghost btn-sm"> Proyectos </NuxtLink>
      <NuxtLink to="/about" class="btn btn-ghost btn-sm"> About </NuxtLink>
      <!-- BOTÓN DASHBOARD -->
      <NuxtLink to="/dashboard" class="btn btn-primary btn-sm">
        Dashboard
      </NuxtLink>
    </div>

    <!-- RIGHT -->
    <div class="flex items-center gap-2">
      <!-- Theme toggle -->
      <BaseButton
        class="btn-ghost btn-circle"
        @click="toggleTheme"
        aria-label="Cambiar tema"
      >
        🌙
      </BaseButton>

      <!-- Mobile menu -->
      <div class="dropdown dropdown-end md:hidden">
        <button class="btn btn-ghost btn-circle">☰</button>
        <ul
          class="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-40"
        >
          <li>
            <NuxtLink to="/">Proyectos</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/dashboard">Dashboard</NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const theme = ref("forest");
const toggleTheme = () => {
  const html = document.documentElement;
  const current = localStorage.getItem("theme");
  if (current === null) localStorage.setItem("theme", theme.value);
  theme.value = current === "forest" ? "autumn" : "forest";
  html.setAttribute("data-theme", theme.value);
  localStorage.setItem("theme", theme.value);
};

onMounted(() => {
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === null) localStorage.setItem("theme", "forest");
  document.documentElement.setAttribute(
    "data-theme",
    localStorage.getItem("theme") || "forest"
  );
});
</script>
