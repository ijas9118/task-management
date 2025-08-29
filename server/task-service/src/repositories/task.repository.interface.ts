import type { CreateTaskDTO } from "@/dtos/create-task.dto";
import type { UpdateTaskDTO } from "@/dtos/update-task.dto";
import type { ITask } from "@/models/task.model";

export interface ITaskRepository {
  create: (data: CreateTaskDTO) => Promise<ITask>;
  findById: (id: string) => Promise<ITask | null>;
  findAllByProject: (projectId: string) => Promise<ITask[]>;
  update: (id: string, data: UpdateTaskDTO) => Promise<ITask | null>;
  delete: (id: string) => Promise<boolean>;
}
