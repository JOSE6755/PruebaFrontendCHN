export interface Ticket {
  id: number;
  title: string;
  description: string;
  category: "bug" | "task" | "feature";
  priority: "low" | "medium" | "high";
  status: "open" | "in_progress" | "closed";
  assignedTo: string;
  createdAt: string;
  comments: any[];
}
export interface TicketRow {
  id: number;
  title: string;
  priority: "high" | "medium" | "low";
  status: "open" | "in_progress" | "closed";
  assignedTo: string;
  createdAt: string;
}
