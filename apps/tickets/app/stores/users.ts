import { defineStore } from "pinia";
import type { User, UserRole } from "interfaces";
import { users } from "utils/FakeUsers";

export const userAuthStore = defineStore("auth", {
  state: () => ({
    user: null as User | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,

    fullName: (state) =>
      state.user ? `${state.user.firstName} ${state.user.lastName}` : "",

    email: (state) => state.user?.email ?? "",

    hasRole:
      (state) =>
      (role: UserRole): boolean =>
        state.user?.roles.includes(role) ?? false,
  },

  actions: {
    login(email: string, password: string): boolean {
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (!foundUser) return false;

      this.user = foundUser;
      return true;
    },

    logout() {
      this.user = null;
    },
  },
});
