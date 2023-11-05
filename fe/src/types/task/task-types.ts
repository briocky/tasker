type TaskDto = {
  id: number;
  description: string;
  createdAt: Date;
  deadline: Date | undefined;
  done: boolean;
  priority: number;
};

export type { TaskDto };
