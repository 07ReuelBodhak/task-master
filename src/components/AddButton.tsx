import React, { FC } from "react";
import Image from "next/image";

interface AddButtonSchema {
  title: string;
  onClick: () => void;
}

const AddTaskButton: FC<AddButtonSchema> = ({ title, onClick }) => {
  return (
    <button
      onClick={() => onClick()}
      className="flex cursor-pointer w-full gap-3 bg-orange-100 items-center h-16 rounded-lg shadow-md p-2"
    >
      <div className="flex justify-center rounded-md items-center w-10 h-10 bg-orange-300">
        <Image src="/add_task.svg" alt="" width={20} height={20} />
      </div>
      <h1 className="text-lg font-semibold">{title}</h1>
    </button>
  );
};

export default AddTaskButton;
