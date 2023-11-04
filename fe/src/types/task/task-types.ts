
type TaskDto = {
  id: number;
  description: string;
  createdAt: Date;
  deadline: Date;
  done: boolean;
  priority: number;
}

export type { TaskDto }