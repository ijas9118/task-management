export interface CreateTaskDTO {
  projectId: string;
  title: string;
  description?: string;
  status?: "todo" | "in-progress" | "done";
  assignedTo: string[];
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  tags?: string[];
}
