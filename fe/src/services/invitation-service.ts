import { authAxios } from '@/services/axios/axios';
import { Invitation, InvitationStatus } from '@/types/invitation/invitation-types';

async function getInvitations() {
  const getAllEndpoint = 'api/notifications/all';
  return await authAxios.get<Invitation[]>(getAllEndpoint).then((response) => {
    return response.data;
  });
}

async function respondToInvitation(id: number, status: InvitationStatus) {
  const respondEndpoint = 'api/notifications/respond';

  const data = {
    id: id,
    status: status.toString(),
  };

  return await authAxios.post<null>(respondEndpoint, data).then((response) => {
    return response.data;
  });
}

export { getInvitations, respondToInvitation };
