"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { TaskSchema } from "@/lib/constant";
import { useBoardStore } from "@/lib/store/userBoardStore";

interface TaskFormProps {
  showTaskForm: boolean;
  setShowTaskForm: React.Dispatch<React.SetStateAction<boolean>>;
  editableTask?: TaskSchema | null;
  boardId: string | number;
}

interface IconOption {
  name: string;
  path: string;
}

interface TaskStatusSchema {
  title: string;
  status: string;
}

const iconOptions: IconOption[] = [
  { name: "coffee", path: "/icons/coffee.svg" },
  { name: "gym", path: "/icons/gym.svg" },
  { name: "books", path: "/icons/books.svg" },
  { name: "music", path: "/icons/music.svg" },
  { name: "work", path: "/icons/work.svg" },
  { name: "travel", path: "/icons/travel.svg" },
];

const taskStatus: TaskStatusSchema[] = [
  {
    title: "In Progress",
    status: "progress",
  },
  {
    title: "Completed",
    status: "completed",
  },
  {
    title: "Won't do",
    status: "failed",
  },
];

const TaskForm: React.FC<TaskFormProps> = ({
  showTaskForm = false,
  setShowTaskForm,
  editableTask,
  boardId,
}) => {
  const { addTaskToBoard, deleteTaskFromBoard, updateTaskInBoard } =
    useBoardStore();

  const [formData, setFormData] = useState<TaskSchema>(
    editableTask || {
      title: "",
      description: "",
      icon: "",
      status: "pending",
    }
  );

  useEffect(() => {
    if (editableTask) {
      console.log(editableTask);
      setFormData(editableTask);
    } else {
      setFormData({
        title: "",
        description: "",
        icon: "Coffee",
        status: "pending",
      });
    }
  }, [editableTask]);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editableTask) {
      const res = await fetch(`/api/task/${editableTask._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const updatedTask = await res.json();
        updateTaskInBoard(boardId as string, updatedTask); // Zustand update
        alert("Task updated successfully");
      } else {
        alert("Failed to update task");
      }
    } else {
      const res = await fetch("/api/task", {
        method: "POST",
        body: JSON.stringify({ ...formData, boardId }),
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        const result = await res.json();

        addTaskToBoard(boardId as string, {
          ...formData,
          _id: result.task._id,
        });
        alert("task added successfully");
      } else {
        alert("failed to add task");
      }
    }

    setShowTaskForm(false);
  };

  const handleDeleteTask = async () => {
    if (!editableTask || !editableTask._id) return;
    const confirmDelete = confirm("Are you sure you want to delete the task");
    if (!confirmDelete) return;

    const res = await fetch(`/api/task/${editableTask._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      deleteTaskFromBoard(boardId as string, editableTask._id);
      alert("Task deleted");
      setShowTaskForm(false);
    } else {
      alert("Failed to delete task");
    }
  };

  const handleClose = () => setShowTaskForm(false);

  const selectStatusColorAndIcon = (status: string) => {
    switch (status) {
      case "progress":
        return {
          color: "bg-yellow-400",
          icon: "/progress.svg",
        };
      case "failed":
        return {
          color: "bg-red-400",
          icon: "/failed.svg",
        };
      case "completed":
        return {
          color: "bg-green-400",
          icon: "/completed.svg",
        };
      default:
        return {
          color: "bg-gray-400",
          icon: "none.svg",
        };
    }
  };

  return (
    <>
      {showTaskForm && (
        <div className="absolute transition-all duration-200 ease inset-0 bg-black opacity-10" />
      )}
      <div
        className={`
    fixed z-10 sm:bottom-auto sm:right-0 h-[92%] p-4 flex flex-col gap-4 rounded-xl bg-white shadow-lg w-full sm:w-[600px] md:w-[700px] transition-transform duration-300 ease-in-out
    ${showTaskForm ? "-translate-x-0 sm:-translate-x-3" : " translate-x-full"}
  `}
      >
        {/* Top section */}
        <div className="w-full flex justify-between">
          <h1 className="text-xl font-medium">Task Details</h1>
          <button
            onClick={handleClose}
            className="w-9 cursor-pointer h-9 border-2 flex justify-center items-center rounded-lg border-gray-400"
          >
            <Image
              src="/close_ring_duotone-1.svg"
              alt="close btn"
              width={20}
              height={20}
            />
          </button>
        </div>
        {/* Form */}
        <form
          onSubmit={handleFormSubmit}
          className="w-full flex-col gap-3 flex pt-2 h-full"
        >
          {/* Task Title */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">
              Task Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter short task title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full text-md border-2 border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400"
            />
          </div>
          {/* Task description */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">
              Description
            </label>
            <textarea
              rows={5}
              placeholder="Enter detailed task description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full text-md border-2 border-gray-400 rounded-md px-3 py-2 focus:outline-none focus:border-blue-400 resize-none"
            />
          </div>
          {/* Icon */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-500">Icon</label>
            <div className="flex gap-3 overflow-x-auto">
              {iconOptions.map((icon) => (
                <button
                  type="button"
                  key={icon.name}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, icon: icon.path }))
                  }
                  className={`border-1 bg-gray-300 w-9 h-9 p-2 rounded-md flex flex-col items-center justify-center hover:border-blue-300 ${
                    formData.icon === icon.path
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={icon.path}
                    alt={icon.name}
                    width={32}
                    height={32}
                  />
                </button>
              ))}
            </div>
            {/* Status */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-500">
                Status
              </label>
              <div className="grid grid-cols-2 gap-2">
                {taskStatus.map((status) => {
                  const { color, icon } = selectStatusColorAndIcon(
                    status.status
                  );
                  const isSelected = formData.status === status.status;

                  return (
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          status: status.status as TaskSchema["status"],
                        })
                      }
                      key={status.status}
                      className="border-2 cursor-pointer flex items-center justify-between gap-3 p-2 h-11 rounded-xl border-gray-300"
                    >
                      <div className="flex gap-3">
                        <div
                          className={`w-6 h-6 flex items-center justify-center rounded-md ${color}`}
                        >
                          <Image
                            src={icon}
                            alt={`${status.title} icon`}
                            width={14}
                            height={14}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {status.title}
                        </span>
                      </div>
                      {isSelected && (
                        <Image
                          className="bg-blue-300 rounded-full"
                          src="/completed.svg"
                          alt="selected"
                          width={20}
                          height={10}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
            {editableTask ? (
              <div className="flex w-full gap-2 mt-3">
                <button className="flex-1 cursor-pointer justify-center items-center shadow-md text-white rounded-xl h-11 bg-blue-500">
                  <h1 className="text-md font-medium">Update Task</h1>
                </button>
                <button
                  type="button"
                  onClick={handleDeleteTask}
                  className="flex-1 cursor-pointer justify-center items-center shadow-md text-white rounded-xl h-11 bg-yellow-400"
                >
                  <h1 className="text-md font-medium">Delete Task</h1>
                </button>
              </div>
            ) : (
              <button className="flex w-full cursor-pointer justify-center items-center shadow-md text-white rounded-xl mt-3 h-11 bg-red-400">
                <h1 className="text-xl font-medium">Add Task</h1>
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskForm;
