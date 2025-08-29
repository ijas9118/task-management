import { Router } from "express";

import { TaskController } from "@/controllers/task.controller";
import { TaskRepository } from "@/repositories/task.repository";
import { TaskService } from "@/services/task.service";

const router = Router();
const taskRepository = new TaskRepository();
const taskService = new TaskService(taskRepository);
const taskController = new TaskController(taskService);

router.post("/", taskController.createTask);
router.get("/:id", taskController.getTask);
router.get("/project/:projectId", taskController.getTasksByProject);
router.put("/:id", taskController.updateTask);
router.delete("/:id", taskController.deleteTask);

export default router;
