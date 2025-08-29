export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: "todo" | "in-progress" | "done";
  assignedTo?: string[];
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  tags?: string[];
}
