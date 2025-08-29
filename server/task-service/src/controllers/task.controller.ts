import type { Request, Response } from "express";

import { StatusCodes } from "http-status-codes";

import type { CreateTaskDTO } from "@/dtos/create-task.dto";
import type { UpdateTaskDTO } from "@/dtos/update-task.dto";
import type { ITaskService } from "@/services/task.service.interface";

import { asynHandler } from "@/utils/async-handler";

export class TaskController {
  constructor(private taskService: ITaskService) { }

  createTask = asynHandler(async (req: Request, res: Response) => {
    const data: CreateTaskDTO = req.body;
    const task = await this.taskService.createTask(data);
    res.status(StatusCodes.CREATED).json({ message: "Task Created", task });
  });

  getTask = asynHandler(async (req: Request, res: Response) => {
    const task = await this.taskService.getTask(req.params.id);
    if (!task)
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Task not found" });
    res.status(StatusCodes.OK).json({ message: "Task fetched", task });
  });

  getTasksByProject = asynHandler(async (req: Request, res: Response) => {
    const tasks = await this.taskService.getTasksByProject(req.params.projectId);
    res.status(StatusCodes.OK).json({ message: "Tasks fetchedd", tasks });
  });

  updateTask = asynHandler(async (req: Request, res: Response) => {
    const data: UpdateTaskDTO = req.body;
    const task = await this.taskService.updateTask(req.params.id, data);
    if (!task)
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Task not found" });
    res.json({ message: "Task updated", task });
  });

  deleteTask = asynHandler(async (req: Request, res: Response) => {
    const success = await this.taskService.deleteTask(req.params.id);
    if (!success)
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Task not found" });
    res.status(StatusCodes.OK).json({ message: "Task deleted" });
  });
}
