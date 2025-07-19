import { connectToDatabase } from "@/lib/db";
import Tasks from "@/model/Tasks";
import Board from "@/model/Board";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  const task = new Tasks(body);
  await task.save();

  if (body.boardId) {
    await Board.findByIdAndUpdate(body.boardId, {
      $push: { tasks: task._id },
    });
  }

  return NextResponse.json({ message: "task added successfully", task });
}
