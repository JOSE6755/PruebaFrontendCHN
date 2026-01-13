<template>
  <div class="min-h-screen bg-base-200 flex flex-col">
    <NavBar />

    <main class="flex-1">
      <slot />
    </main>

    <footer class="text-center text-sm text-base-content/60 py-4">
      © {{ new Date().getFullYear() }} TicketSystem
    </footer>
  </div>
</template>

<script setup lang="ts">
import NavBar from "~/components/organisms/NavBar.vue";
</script>
