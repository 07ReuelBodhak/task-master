import { connectToDatabase } from "@/lib/db";
import Task from "@/model/Tasks";
import Board from "@/model/Board";
import { NextRequest, NextResponse } from "next/server";

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) => {
  const { taskId } = await params;

  await connectToDatabase();
  const task = await Task.findByIdAndDelete(taskId);
  if (!task) {
    return NextResponse.json({ message: "Task not found" });
  }
  await Board.updateMany({ tasks: taskId }, { $pull: { tasks: taskId } });
  return NextResponse.json({ message: "Task deleted successfully" });
};

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ taskId: string }> }
) => {
  const { taskId } = await params;
  const body = await req.json();
  await connectToDatabase();

  const updatedTask = await Task.findByIdAndUpdate(taskId, body, {
    new: true,
    runValidators: true,
  });
  if (!updatedTask) {
    return NextResponse.json({ message: "Task not found" }, { status: 404 });
  }
  return NextResponse.json(updatedTask, { status: 200 });
};
