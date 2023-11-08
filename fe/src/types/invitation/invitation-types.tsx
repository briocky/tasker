import { CategoryDto } from '@/types/category/category-types';

type Invitation = {
  id: number;
  senderEmail: string;
  accepted: boolean;
  tasksCategory: CategoryDto;
  title: string;
  text: string;
};

enum InvitationStatus {
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export { InvitationStatus };
export type { Invitation };
