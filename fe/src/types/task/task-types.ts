type TaskDto = {
  id: number | undefined;
  taskCategoryId: number | undefined;
  description: string;
  createdAt: Date;
  deadline: Date | undefined;
  done: boolean;
  priority: number;
};

export type { TaskDto };
