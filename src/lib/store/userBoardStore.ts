import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Task {
  _id?: string;
  title: string;
  description: string;
  status: "progress" | "failed" | "completed" | "pending";
  icon: string;
}

interface Board {
  user_id: string;
  _id?: string;
  title: string;
  short_detail: string;
  tasks: Task[];
}

interface BoardStore {
  boards: Board[];
  setBoards: (boards: Board[]) => void;
  addBoard: (board: Board) => void;
  addTaskToBoard: (boardId: string, task: Task) => void;
  deleteTaskFromBoard: (boardId: string, taskId: string) => void;
  updateTaskInBoard: (boardId: string, updatedTask: Task) => void;
  updateBoard: (boardId: string, title: string, description: string) => void;
  deleteBoard: (boardId: string) => void;
}

// export const useBoardStore = create<BoardStore>((set) => ({
//   boards: [],
//   setBoards: (boards) => set({ boards }),
//   addBoard: (board) => set((state) => ({ boards: [...state.boards, board] })),
// }));

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],
      setBoards: (boards) => set({ boards }),
      addBoard: (board) =>
        set((state) => ({ boards: [...state.boards, board] })),
      addTaskToBoard: (boardId, task) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board._id === boardId
              ? { ...board, tasks: [...board.tasks, task] }
              : board
          ),
        })),
      deleteTaskFromBoard: (boardId, taskId) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board._id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.filter((task) => task._id !== taskId),
                }
              : board
          ),
        })),
      updateTaskInBoard: (boardId, updatedTask) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board._id === boardId
              ? {
                  ...board,
                  tasks: board.tasks.map((task) =>
                    task._id === updatedTask._id ? updatedTask : task
                  ),
                }
              : board
          ),
        })),
      updateBoard: (boardId, title, description) =>
        set((state) => ({
          boards: state.boards.map((board) =>
            board._id === boardId
              ? { ...board, title, short_detail: description }
              : board
          ),
        })),
      deleteBoard: (boardId) =>
        set((state) => ({
          boards: state.boards.filter((board) => board._id !== boardId),
        })),
    }),

    {
      name: "task-board-storage",
    }
  )
);
