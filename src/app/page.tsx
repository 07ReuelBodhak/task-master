"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AddTaskButton from "@/components/AddButton";
import { useBoardStore } from "@/lib/store/userBoardStore";
import BoardForm from "@/components/BoardForm";

const Home = () => {
  const [showBoardForm, setShowBoardForm] = useState(false);

  const { boards, setBoards } = useBoardStore();
  const router = useRouter();

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const boardRes = await fetch("/api/board", { method: "GET" });
        const boards = await boardRes.json();
        setBoards([]);
        setBoards(boards);
      } catch (error) {
        console.error("Failed to fetch boards:", error);
      }
    };

    fetchBoard();
  }, []);

  const handleRedirect = (id: string | number) => {
    router.push(`/board/${id}`);
  };

  const handleAddBoards = () => {
    setShowBoardForm(true);
  };

  return (
    <main className="w-full items-center gap-4 justify-center h-screen flex flex-col">
      <BoardForm showForm={showBoardForm} setShowForm={setShowBoardForm} />
      <h1 className="text-2xl font-semibold">Task Master</h1>
      <div className="w-full gap-7 flex flex-col p-3 sm:w-[500px] md:w-[650px]">
        {boards.map((item, index) => (
          <div
            key={index}
            onClick={() => handleRedirect(item._id ?? index)}
            className="w-full hover:border-blue-300 transition-all duration-120 ease cursor-pointer p-2 flex h-17 rounded-lg border-2 shadow-md border-gray-300"
          >
            <div className="flex flex-col">
              <h1 className="text-lg font-medium text-left truncate">
                {item.title}
              </h1>
              <p className="text-sm opacity-70  truncate">
                {item.short_detail}
              </p>
            </div>
          </div>
        ))}
        <AddTaskButton onClick={handleAddBoards} title="Add New Board" />
      </div>
    </main>
  );
};

export default Home;
