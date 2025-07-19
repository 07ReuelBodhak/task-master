"use client";
import React, { useState } from "react";
import Image from "next/image";
import EditBoardTitle from "./EditBoardTitle";

interface BoardHeaderSchema {
  boardId: string;
  title: string;
  description: string;
}

const BoardHeader: React.FC<BoardHeaderSchema> = ({
  title,
  description,
  boardId,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [boardTitle] = useState(title);
  const [boardDescription] = useState(description);

  return (
    <div className="flex mt-7 gap-4 w-full justify-center items-center flex-col">
      <div className="flex justify-between items-center gap-3 sm:gap-4 md:gap-5">
        <Image
          className="sm:w-14 md:w-17"
          src="/Logo.svg"
          alt="Logo"
          width={50}
          height={50}
        />
        <h1 className="text-3xl w-[80%] line-clamp-1 md:text-7xl sm:text-6xl">
          {boardTitle}
        </h1>
        <Image
          onClick={() => setIsEditing(true)}
          className="sm:w-8 cursor-pointer hover:bg-blue-300 transition-all ease-out duration-120 rounded-full md:w-9"
          src="/Edit_duotone.svg"
          alt="edit"
          width={30}
          height={30}
        />
      </div>
      <div className="mt-2 sm:text-lg w-full font-medium sm:w-[500px] md:w-[650px]">
        <p className="line-clamp-1 w-50">{boardDescription}</p>
      </div>
      {isEditing && (
        <EditBoardTitle
          initialTitle={boardTitle}
          initialDescription={boardDescription}
          boardId={boardId}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  );
};

export default BoardHeader;
