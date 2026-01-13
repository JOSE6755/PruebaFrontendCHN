import { userAuthStore } from "~/stores/users";
import type { UserRole } from "interfaces";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = userAuthStore();
  authStore.loadUserFromStorage();
  if (!authStore.isAuthenticated) {
    console.log("hola amicos desde middleware");
    return navigateTo("/");
  }

  const requiredRoles = to.meta.roles as UserRole[] | undefined;

  if (requiredRoles && requiredRoles.length > 0) {
    const hasPermission = requiredRoles.some((role) => authStore.hasRole(role));

    if (!hasPermission) {
      return navigateTo("/projects");
    }
  }
});
