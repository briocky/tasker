import Dialog from '@mui/material/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import { Invitation, InvitationStatus } from '@/types/invitation/invitation-types';
import Typography from '@mui/material/Typography/Typography';
import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';

export default function InvitationDialog({
  invitations,
  open,
  handleClose,
  handleInvitationResponse,
}: {
  invitations: Invitation[];
  open: boolean;
  handleClose: () => void;
  handleInvitationResponse: (id: number, status: InvitationStatus) => void;
}) {
  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Invitations</DialogTitle>
      <List sx={{ pt: 0, px: 2, pb: 2 }}>
        {invitations.map((invitation) => (
          <ListItem
            disableGutters
            key={invitation.id}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              borderStyle: 'solid',
              borderRadius: '12px',
              p: 1,
              borderColor: 'rgba(82,83,84,0.68)',
              mb: 1,
            }}
          >
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
              <Typography variant={'h6'}>{invitation.title}</Typography>
              <Box>
                <IconButton
                  onClick={() => handleInvitationResponse(invitation.id, InvitationStatus.ACCEPTED)}
                  color={'success'}
                >
                  <CheckIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleInvitationResponse(invitation.id, InvitationStatus.REJECTED)}
                  color={'error'}
                >
                  <ClearIcon />
                </IconButton>
              </Box>
            </Box>
            <Typography variant={'body2'}>{invitation.text}</Typography>
          </ListItem>
        ))}
      </List>
    </Dialog>
  );
}
