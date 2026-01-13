<template>
  <div class="navbar bg-base-100 shadow-md px-4">
    <div class="flex-1">
      <NuxtLink to="/" class="text-xl font-bold">
        Ticket<span class="text-primary">System</span>
      </NuxtLink>
    </div>

    <div class="hidden md:flex gap-2">
      <NuxtLink
        v-if="isAuthenticated"
        to="/projects"
        class="btn btn-ghost btn-sm"
      >
        Proyectos
      </NuxtLink>
      <NuxtLink to="/about" class="btn btn-ghost btn-sm"> About </NuxtLink>
      <NuxtLink
        v-if="isAuthenticated && authStore.hasRole('admin')"
        to="/dashboard"
        class="btn btn-primary btn-sm"
      >
        Dashboard
      </NuxtLink>
    </div>

    <div class="flex items-center gap-2">
      <BaseButton
        class="btn-ghost btn-circle"
        @click="toggleTheme"
        aria-label="Cambiar tema"
      >
        🌙
      </BaseButton>

      <BaseButton
        v-if="isAuthenticated"
        class="btn-error btn-sm"
        @click="logout"
      >
        Logout
      </BaseButton>

      <div class="dropdown dropdown-end md:hidden">
        <BaseButton class="btn btn-ghost btn-circle">☰</BaseButton>
        <ul
          class="menu menu-sm dropdown-content bg-base-100 rounded-box shadow mt-3 w-40"
        >
          <li>
            <NuxtLink v-if="isAuthenticated" to="/projects">Proyectos</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/about">About</NuxtLink>
          </li>
          <li>
            <NuxtLink
              v-if="isAuthenticated && authStore.hasRole('admin')"
              to="/dashboard"
              >Dashboard</NuxtLink
            >
          </li>
          <li v-if="isAuthenticated">
            <BaseButton @click="logout">Logout</BaseButton>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { userAuthStore } from "~/stores/users";

const router = useRouter();

const authStore = userAuthStore();

const isAuthenticated = computed(() => authStore.isAuthenticated);

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

const logout = () => {
  authStore.logout();
  router.push("/");
};
</script>
