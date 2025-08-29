import type { CreateTaskDTO } from "@/dtos/create-task.dto";
import type { UpdateTaskDTO } from "@/dtos/update-task.dto";
import type { ITask } from "@/models/task.model";
import type { ITaskRepository } from "@/repositories/task.repository.interface";

import type { ITaskService } from "./task.service.interface";

export class TaskService implements ITaskService {
  constructor(private taskRepository: ITaskRepository) { }

  async createTask(data: CreateTaskDTO): Promise<ITask> {
    return this.taskRepository.create(data);
  }

  async getTask(id: string): Promise<ITask | null> {
    return this.taskRepository.findById(id);
  }

  async getTasksByProject(projectId: string): Promise<ITask[]> {
    return this.taskRepository.findAllByProject(projectId);
  }

  async updateTask(id: string, data: UpdateTaskDTO): Promise<ITask | null> {
    return this.taskRepository.update(id, data);
  }

  async deleteTask(id: string): Promise<boolean> {
    return this.taskRepository.delete(id);
  }
}
