import mongoose, { Schema, Document } from "mongoose";

export interface TaskDocument extends Document {
  title: string;
  description?: string;
  status: "progress" | "failed" | "completed" | "pending";
  icon: string;
}

export const TaskSchema = new Schema<TaskDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["progress", "failed", "completed", "pending"],
      default: "pending",
    },
    icon: { type: String, default: "coffee" },
  },
  { _id: true }
);

export const Task =
  mongoose.models.Task || mongoose.model<TaskDocument>("Task", TaskSchema);

export default Task;
