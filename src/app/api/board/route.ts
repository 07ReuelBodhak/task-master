import { connectToDatabase } from "@/lib/db";
import Board from "@/model/Board";
import Task from "@/model/Tasks";
import { NextRequest, NextResponse } from "next/server";

// GET /api/board
export async function GET(req: NextRequest) {
  await connectToDatabase();

  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";
  const boards = await Board.find({ user_id: ip }).populate("tasks");
  console.log(boards);

  return NextResponse.json(boards);
}

// POST /api/board
export async function POST(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  const ip = req.headers.get("x-forwarded-for") || "127.0.0.1";

  const taskDocs = await Task.insertMany(body.tasks || []);
  const taskIds = taskDocs.map((task) => task._id);

  const newBoard = {
    title: body.title,
    short_detail: body.short_detail,
    user_id: ip,
    tasks: taskIds,
  };

  const board = await Board.create(newBoard);
  return NextResponse.json(board, { status: 201 });
}
