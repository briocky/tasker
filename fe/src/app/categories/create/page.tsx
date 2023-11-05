'use client';
import Box from '@mui/material/Box/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper/Paper';
import CategoryIcon from '@mui/icons-material/Category';
import Typography from '@mui/material/Typography/Typography';
import { GeneralInfo, MembersInfo, Step, TasksInfo } from '@/types/stepper/stepper-types';
import Stepper from '@/components/stepper/stepper';
import { Divider } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
import GeneralInfoStep from '@/components/general-info-step/generalInfoStep';
import TasksInfoStep from '@/components/tasks-info-step/tasksInfoStep';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MembersInfoStep from '@/components/members-info-step/membersInfoStep';
import { addCategory } from '@/services/category-service';
import { CategoryDto } from '@/types/category/category-types';
import { useRouter } from 'next/navigation';

const steps: Step[] = [
  {
    number: 1,
    name: 'General',
  },
  {
    number: 2,
    name: 'Tasks',
  },
  {
    number: 3,
    name: 'Members',
  },
];

const initialGeneralInfoData = {
  title: '',
  description: '',
  iconUrl: '',
};

const initialTasksInfoData = {
  tasks: [],
};

const initialMembersInfoData = {
  membersEmails: [],
  shared: false,
};

export default function CreateCategory() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [generalInfoData, setGeneralInfoData] = useState<GeneralInfo>(initialGeneralInfoData);
  const [tasksInfoData, setTasksInfoData] = useState<TasksInfo>(initialTasksInfoData);
  const [membersInfoData, setMembersInfoData] = useState<MembersInfo>(initialMembersInfoData);

  const router = useRouter();

  const displayStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          <GeneralInfoStep
            generalInfoData={generalInfoData}
            setGeneralInfoData={setGeneralInfoData}
            handleNextStep={handleNextStep}
          />
        );
      case 2:
        return (
          <TasksInfoStep
            tasksInfoData={tasksInfoData}
            setTasksInfoData={setTasksInfoData}
            handleNextStep={handleNextStep}
            handlePrevStep={handlePrevStep}
          />
        );
      case 3:
        return (
          <MembersInfoStep
            membersInfoData={membersInfoData}
            setMembersInfoData={setMembersInfoData}
            handlePrevStep={handlePrevStep}
          />
        );
      default:
        return null;
    }
  };

  const handleNextStep = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrevStep = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const categoryData: CategoryDto = {
      id: undefined,
      name: generalInfoData.title,
      description: generalInfoData.description,
      iconUrl: generalInfoData.iconUrl,
      tasks: tasksInfoData.tasks,
      membersEmails: membersInfoData.membersEmails,
      shared: membersInfoData.shared,
      ownerId: undefined,
    };

    addCategory(categoryData).then((response: CategoryDto) => {
      router.push('/categories/my-categories');
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paper elevation={3} sx={{ mt: 4, p: 4, minHeight: '150px' }}>
          <Box display={'flex'} gap={2} alignItems={'center'} justifyContent={'center'}>
            <CategoryIcon fontSize={'large'} />
            <Typography variant={'h5'}>New category</Typography>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stepper steps={steps} activeStep={activeStep} />
          </Box>
          <Box display={'flex'} justifyContent={'center'} pb={1}>
            <Divider sx={{ width: '90%' }} />
          </Box>
          <Box display={'flex'}>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
              {displayStep(activeStep)}
            </Box>
          </Box>
        </Paper>
      </LocalizationProvider>
    </Container>
  );
}
