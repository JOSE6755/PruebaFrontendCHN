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
