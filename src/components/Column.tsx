import React from "react";
import type { TaskSchema } from "@/lib/constant";
import Image from "next/image";

interface ColumnProps {
  task: TaskSchema;
  onClick: () => void;
}

const statusBgColorMap: Record<TaskSchema["status"], string> = {
  progress: "bg-yellow-200",
  completed: "bg-green-200",
  failed: "bg-red-200",
  pending: "bg-gray-300",
};

const statusIconColorMap: Record<TaskSchema["status"], string> = {
  progress: "bg-yellow-400",
  completed: "bg-green-400",
  failed: "bg-red-400",
  pending: "bg-gray-400",
};

const Column: React.FC<ColumnProps> = ({ task, onClick }) => {
  const bgColor = statusBgColorMap[task.status] || "bg-gray-400";
  const statusIcon = `/${task.status}.svg`; // optional if you use it
  const iconBgColor = statusIconColorMap[task.status];

  return (
    <div
      onClick={onClick}
      className={`flex cursor-pointer min-h-16 w-full ${bgColor} items-center justify-between rounded-lg shadow-md p-2`}
    >
      {/* Left Icon */}
      <div className="w-10 h-10 bg-white rounded-md flex items-center justify-center">
        <Image src={`${task.icon}`} alt={task.icon} width={30} height={30} />
      </div>

      {/* Content */}
      <div className="flex flex-col justify-center pl-3 w-[80%]">
        <h1 className="text-lg font-medium truncate">{task.title}</h1>
        {task.description && (
          <p className="text-sm text-left opacity-70 text-center whitespace-pre-line">
            {task.description}
          </p>
        )}
      </div>

      {/* Right Icon (status) */}
      {task.status !== "pending" && (
        <div
          className={`w-10 h-10 ${iconBgColor} rounded-md flex items-center justify-center`}
        >
          <Image src={statusIcon} alt={task.status} width={20} height={20} />
        </div>
      )}
    </div>
  );
};

export default Column;
