import type { Document } from "mongoose";

import mongoose, { Schema } from "mongoose";

export interface ITask extends Document<string> {
  projectId: string;
  title: string;
  desciption?: string;
  status: "todo" | "in-progress" | "done";
  assignedTo: string[];
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema: Schema = new Schema<ITask>(
  {
    projectId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desciption: {
      type: String,
    },
    status: {
      type: String,
      enum: ["todo", "in-progress", "done"],
      default: "todo",
    },
    assignedTo: {
      type: [String],
      required: true,
      validate: {
        validator: (val: string[]) => Array.isArray(val) && val.length > 0,
        message: "At least one user must be assigned",
      },
    },

    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
    tags: {
      type: [String],
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<ITask>("Task", TaskSchema);
