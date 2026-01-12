import { defineStore } from "pinia";
import type { Ticket } from "interfaces";
import { projects } from "utils/FakeTickets";
export const useProjectsStore = defineStore("projects", {
  state: () => ({
    projects: [...projects],
  }),

  getters: {
    getProjectById: (state) => (id: number) =>
      state.projects.find((p) => p.id === id),

    getTicketById: (state) => (projectId: number, ticketId: number) =>
      state.projects
        .find((p) => p.id === projectId)
        ?.tickets.find((t) => t.id === ticketId),
  },

  actions: {
    updateTicketStatus(
      projectId: number,
      ticketId: number,
      status: Ticket["status"]
    ) {
      const ticket = this.getTicketById(projectId, ticketId);
      if (ticket) ticket.status = status;
    },

    addTicket(projectId: number, ticket: Ticket) {
      const project = this.getProjectById(projectId);
      project?.tickets.push(ticket);
    },
    deleteTicket(projectId: number, ticketId: number) {
      const project = this.getProjectById(projectId);
      if (!project) return;
      project.tickets = project?.tickets.filter((val) => val.id !== ticketId);
    },
  },
});
