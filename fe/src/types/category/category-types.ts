import {TaskDto} from "@/types/task/task-types";

type CategoryDto = {
  id: number;
  name: string;
  description: string;
  iconUrl: string;
  membersIds: number[];
  ownerId: number;
  tasks: TaskDto[];
  shared: boolean;
}

export type { CategoryDto }