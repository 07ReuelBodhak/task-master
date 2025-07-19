import React, { useState } from "react";
import { useBoardStore } from "@/lib/store/userBoardStore";

interface BoardFormProps {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
}

const BoardForm: React.FC<BoardFormProps> = ({ showForm, setShowForm }) => {
  const [title] = useState("My Task Board");
  const [description] = useState("Task to be organized");

  const addBoard = useBoardStore((state) => state.addBoard);

  const handleAddBoard = async () => {
    try {
      const res = await fetch("/api/board", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          short_detail: description,
          tasks: [],
        }),
      });
      if (!res.ok) throw new Error("Failed to create board");

      const board = await res.json();
      addBoard({
        ...board,
        tasks: [],
      });
    } catch (err) {
      console.error("Error adding board:", err);
      alert("Something went wrong!");
    } finally {
      setShowForm(false);
    }
  };

  if (!showForm) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-20 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md flex flex-col gap-4">
        <h2 className="text-2xl font-semibold text-center">Create New Board</h2>

        <input
          type="text"
          placeholder="Board Title"
          className="border px-4 py-2 rounded-md w-full focus:outline-none focus:border-blue-400"
        />

        <textarea
          placeholder="Short Description"
          rows={4}
          className="border px-4 py-2 rounded-md w-full resize-none focus:outline-none focus:border-blue-400"
        />

        <div className="flex gap-4 mt-2">
          <button
            className="w-full py-2 rounded-md bg-gray-300 text-black font-medium"
            onClick={() => setShowForm(false)}
          >
            Cancel
          </button>
          <button
            onClick={handleAddBoard}
            className="w-full py-2 rounded-md bg-blue-500 text-white font-medium"
          >
            Add Board
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardForm;
