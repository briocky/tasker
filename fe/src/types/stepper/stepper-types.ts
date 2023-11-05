import { TaskDto } from '@/types/task/task-types';

type Step = {
  number: number;
  name: string;
};

type GeneralInfo = {
  title: string;
  description: string;
  iconUrl: string;
};

type TasksInfo = {
  tasks: TaskDto[];
};

type MembersInfo = {
  membersEmails: string[];
  shared: boolean;
};

export type { Step, GeneralInfo, TasksInfo, MembersInfo };
