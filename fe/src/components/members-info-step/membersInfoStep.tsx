'use client';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box/Box';
import * as React from 'react';
import { MembersInfo } from '@/types/stepper/stepper-types';
import Typography from '@mui/material/Typography/Typography';
import TextField from '@mui/material/TextField/TextField';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import Paper from '@mui/material/Paper/Paper';

export default function MembersInfoStep({
  membersInfoData,
  setMembersInfoData,
  handlePrevStep,
}: {
  membersInfoData: MembersInfo;
  setMembersInfoData: any;
  handlePrevStep: any;
}) {
  const [memberEmail, setMemberEmail] = useState<string>('');

  const handleAddMember = () => {
    setMembersInfoData({
      ...membersInfoData,
      membersEmails: [...membersInfoData.membersEmails, memberEmail],
      shared: true,
    });
    setMemberEmail('');
  };

  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        sx={{ display: membersInfoData.membersEmails.length === 0 ? 'none' : 'block' }}
        gap={1}
      >
        <Typography variant="h6">Invitations will be sent to:</Typography>
        <Typography gutterBottom variant={'body2'} color={'grey'}>
          (Now this is <strong>shared</strong> category)
        </Typography>
        {membersInfoData.membersEmails.map((email) => (
          <Paper
            key={email}
            sx={{ p: 1, px: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Typography variant={'body1'}>
              <strong>Member:</strong> {email}
            </Typography>
            <Tooltip title="Delete">
              <IconButton color={'error'}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        ))}
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <TextField
          margin="normal"
          fullWidth
          name="member"
          label="Member's id"
          id="member"
          value={memberEmail}
          onChange={(e) => setMemberEmail(e.target.value)}
          autoComplete="member"
        />
        <IconButton color={'primary'} sx={{ borderStyle: 'solid', borderWidth: '1px' }} onClick={handleAddMember}>
          <AddIcon />
        </IconButton>
      </Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Button variant="outlined" sx={{ mt: 3, mb: 2 }} color={'primary'} onClick={() => handlePrevStep()}>
          Back
        </Button>
        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }} color={'primary'}>
          Create
        </Button>
      </Box>
    </>
  );
}
