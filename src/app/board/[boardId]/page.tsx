"use client";

import AddTaskButton from "@/components/AddButton";
import BoardHeader from "@/components/BoardHeader";
import Column from "@/components/Column";
import TaskForm from "@/components/TaskForm";
import { useBoardStore } from "@/lib/store/userBoardStore";
import React, { use, useState } from "react";
import type { TaskSchema } from "@/lib/constant";
import Loader from "@/components/Loader";

interface BoardPageProps {
  params: Promise<{ boardId: string | number }>;
}

const Board = ({ params }: BoardPageProps) => {
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
  const [editableTask, setEditableTask] = useState<TaskSchema | null>(null);

  const { boardId } = use(params);
  const boards = useBoardStore((state) => state.boards);

  const boardData = boards.find((board) => board._id === boardId);

  const handleAddTask = () => {
    setEditableTask(null);
    setShowTaskForm(true);
  };

  return (
    <>
      {!boardData ? (
        <Loader />
      ) : (
        <div className="w-full items-center gap-4 overflow-hidden p-3 h-screen flex flex-col">
          <TaskForm
            boardId={boardId}
            editableTask={editableTask}
            setShowTaskForm={setShowTaskForm}
            showTaskForm={showTaskForm}
          />

          <BoardHeader
            boardId={boardId as string}
            title={boardData.title}
            description={boardData.short_detail}
          />

          <div className="w-full gap-7 flex flex-col p-3 sm:w-[500px] md:w-[650px]">
            {boardData.tasks.map((item, index) => (
              <Column
                onClick={() => {
                  setEditableTask(item);
                  setShowTaskForm(true);
                }}
                key={index}
                task={item}
              />
            ))}
            <AddTaskButton title="Add New Task" onClick={handleAddTask} />
          </div>
        </div>
      )}
    </>
  );
};

export default Board;
