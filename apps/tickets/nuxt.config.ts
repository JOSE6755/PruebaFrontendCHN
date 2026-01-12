// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  css: ["./app/tailwind.css"],
  components: [
    { path: "~/components/atoms", global: true },
    { path: "~/components/molecules", global: true },
    { path: "~/components/organisms", global: true },
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
