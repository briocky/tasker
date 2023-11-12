import { CommentDto } from "../comment/comment-types";

type TaskDto = {
  id: number | undefined;
  taskCategoryId: number | undefined;
  description: string;
  createdAt: Date;
  deadline: Date | undefined;
  done: boolean;
  priority: number;
  comments: CommentDto[] | undefined
};

export type { TaskDto };
