import type { CreateTaskDTO } from "@/dtos/create-task.dto";
import type { UpdateTaskDTO } from "@/dtos/update-task.dto";
import type { ITask } from "@/models/task.model";

export interface ITaskService {
  createTask: (data: CreateTaskDTO) => Promise<ITask>;
  getTask: (id: string) => Promise<ITask | null>;
  getTasksByProject: (projectId: string) => Promise<ITask[]>;
  updateTask: (id: string, data: UpdateTaskDTO) => Promise<ITask | null>;
  deleteTask: (id: string) => Promise<boolean>;
}
