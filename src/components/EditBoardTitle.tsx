"use client";
import React, { useState } from "react";
import { useBoardStore } from "@/lib/store/userBoardStore";
import { useRouter } from "next/navigation";

interface EditBoardTitleProps {
  boardId: string;
  initialTitle: string;
  initialDescription: string;
  onCancel: () => void;
}

const EditBoardTitle: React.FC<EditBoardTitleProps> = ({
  boardId,
  initialTitle,
  initialDescription,
  onCancel,
}) => {
  const router = useRouter();
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

  const updateBoard = useBoardStore((state) => state.updateBoard);
  const deleteBoard = useBoardStore((state) => state.deleteBoard);

  const handleUpdate = async () => {
    try {
      const res = await fetch(`/api/board/${boardId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          short_detail: description,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update board");
      }
      updateBoard(boardId, title, description);
      alert("Board updated successfully");
    } catch (err) {
      console.error(err);
      alert("Unable to update board data");
    } finally {
      onCancel();
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/board/${boardId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete board");
      }
      deleteBoard(boardId);
      alert("Board deleted successfully");
      router.push("/");
    } catch (err) {
      console.error(err);
      alert("Unable to delete board");
    } finally {
      onCancel();
    }
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl w-11/12 max-w-md shadow-lg flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-center">Edit Board</h2>
        <input
          type="text"
          className="border rounded p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Board Title"
        />
        <textarea
          className="border rounded p-2 w-full resize-none"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Board Description"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoardTitle;
