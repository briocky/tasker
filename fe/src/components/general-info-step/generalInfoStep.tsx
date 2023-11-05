import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box/Box';
import Button from '@mui/material/Button';
import * as React from 'react';
import { GeneralInfo } from '@/types/stepper/stepper-types';

export default function GeneralInfoStep({
  generalInfoData,
  setGeneralInfoData,
  handleNextStep,
}: {
  generalInfoData: GeneralInfo;
  setGeneralInfoData: any;
  handleNextStep: any;
}) {
  return (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="title"
        label="Title"
        name="title"
        autoComplete="title"
        autoFocus
        value={generalInfoData.title}
        onChange={(e) => setGeneralInfoData({ ...generalInfoData, title: e.target.value })}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="description"
        label="Description"
        id="description"
        autoComplete="description"
        value={generalInfoData.description}
        onChange={(e) => setGeneralInfoData({ ...generalInfoData, description: e.target.value })}
      />
      <TextField
        margin="normal"
        fullWidth
        name="icon-url"
        label="Icon Link"
        id="icon-url"
        autoComplete="icon-url"
        value={generalInfoData.iconUrl}
        onChange={(e) => setGeneralInfoData({ ...generalInfoData, iconUrl: e.target.value })}
      />
      <Box display={'flex'} justifyContent={'end'}>
        {/*<Button*/}
        {/*    type="submit"*/}
        {/*    variant="contained"*/}
        {/*    sx={{mt: 3, mb: 2}}*/}
        {/*    color={'primary'}*/}
        {/*>*/}
        {/*  Create*/}
        {/*</Button>*/}
        <Button variant="outlined" sx={{ mt: 3, mb: 2 }} color={'primary'} onClick={() => handleNextStep()}>
          Next
        </Button>
      </Box>
    </>
  );
}