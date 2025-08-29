import mongoose from "mongoose";

import type { CreateTaskDTO } from "@/dtos/create-task.dto";
import type { UpdateTaskDTO } from "@/dtos/update-task.dto";
import type { ITask } from "@/models/task.model";

import taskModel from "@/models/task.model";

import type { ITaskRepository } from "./task.repository.interface";

export class TaskRepository implements ITaskRepository {
  async create(data: CreateTaskDTO): Promise<ITask> {
    const task = await taskModel.create(data);
    return task;
  }

  async findById(id: string): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await taskModel.findById(id);
  }

  async findAllByProject(projectId: string): Promise<ITask[]> {
    return await taskModel.find({ projectId });
  }

  async update(id: string, data: UpdateTaskDTO): Promise<ITask | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return null;
    }
    return await taskModel.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return false;
    }
    const res = await taskModel.findByIdAndDelete(id);
    return res !== null;
  }
}
