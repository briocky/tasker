import { TaskDto } from '@/types/task/task-types';

type CategoryDto = {
  id: number | undefined;
  name: string;
  description: string;
  iconUrl: string;
  membersEmails: string[];
  ownerId: number | undefined;
  tasks: TaskDto[];
  shared: boolean;
};

export type { CategoryDto };
