interface BoardSchema {
  _id?: string;
  title: string;
  short_detail: string;
  tasks: TaskSchema[];
}

interface TaskSchema {
  _id?: string;
  title: string;
  description: string;
  status: "progress" | "failed" | "completed" | "pending";
  icon: string;
}

const data: BoardSchema[] = [
  {
    title: "My Task Board",
    short_detail: "Time to keep organized",
    tasks: [
      {
        title: "Task in Progress",
        description: "",
        status: "progress",
        icon: "Clock",
      },
      {
        title: "Task Completed",
        description: "",
        status: "completed",
        icon: "Gym",
      },
      {
        title: "Task Won't Do",
        description: "",
        status: "failed",
        icon: "Coffee",
      },
    ],
  },
];

export { data };
export type { TaskSchema };
