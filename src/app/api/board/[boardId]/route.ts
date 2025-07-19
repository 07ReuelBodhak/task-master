import { connectToDatabase } from "@/lib/db";
import Board from "@/model/Board";
import Task from "@/model/Tasks";
import { type NextRequest, NextResponse } from "next/server";

export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) => {
  const { boardId } = await params;
  const body = await req.json();

  await connectToDatabase();

  const updatedBoard = await Board.findByIdAndUpdate(
    boardId,
    {
      $set: body,
    },
    { new: true, runValidators: true }
  );

  if (!updatedBoard) {
    return NextResponse.json("Board not found", { status: 401 });
  }

  return NextResponse.json(updatedBoard, { status: 200 });
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ boardId: string }> }
) => {
  const { boardId } = await params;

  await connectToDatabase();

  const board = await Board.findById(boardId);

  if (!board) {
    return NextResponse.json({ error: "Board not found" }, { status: 404 });
  }

  await Task.deleteMany({ _id: { $in: board.tasks } });
  await Board.findByIdAndDelete(boardId);

  return NextResponse.json(
    { message: "Board and associated tasks deleted successfully" },
    { status: 200 }
  );
};
