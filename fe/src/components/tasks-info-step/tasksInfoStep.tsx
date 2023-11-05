'use client';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box/Box';
import * as React from 'react';
import { useState } from 'react';
import { TasksInfo } from '@/types/stepper/stepper-types';
import TextField from '@mui/material/TextField/TextField';
import AddIcon from '@mui/icons-material/Add';
import {
  Dialog,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker/StaticDatePicker';
import { Dayjs } from 'dayjs';
import TaskDetails from '@/components/tasks-info-step/task-details/taskDetails';

export default function TasksInfoStep({
  tasksInfoData,
  setTasksInfoData,
  handleNextStep,
  handlePrevStep,
}: {
  tasksInfoData: TasksInfo;
  setTasksInfoData: any;
  handleNextStep: any;
  handlePrevStep: any;
}) {
  const [calendarOpened, setCalendarOpened] = useState<boolean>(false);
  const [description, setDescription] = useState<string>('');
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [priority, setPriority] = useState<number>(1);
  const [tasksCount, setTasksCount] = useState<number>(0);

  const openDatePicker = () => setCalendarOpened(!calendarOpened);

  const handleClose = () => setCalendarOpened(false);

  const handlePriorityChange = (e: SelectChangeEvent<number>) => setPriority(Number(e.target.value));

  const handleAddTask = () => {
    setTasksInfoData({
      ...tasksInfoData,
      tasks: [
        ...tasksInfoData.tasks,
        {
          id: tasksCount,
          description: description,
          priority: priority,
          deadline: dueDate?.toDate(),
          done: false,
          createdAt: new Date(),
        },
      ],
    });
    setTasksCount(tasksCount + 1);
    setDueDate(null);
    setDescription('');
    setPriority(1);
  };

  const renderDatePickerDialog = () => (
    <Dialog onClose={handleClose} open={calendarOpened}>
      <DialogTitle>Set due date</DialogTitle>
      <StaticDatePicker
        onClose={handleClose}
        onChange={setDueDate}
        onAccept={handleClose}
        disablePast={true}
        defaultValue={dueDate}
      />
    </Dialog>
  );

  const renderPriorityPicker = () => (
    <FormControl size={'small'}>
      <InputLabel id="priority">priority</InputLabel>
      <Select labelId="priority" id="priority" value={priority} label="Priority" onChange={handlePriorityChange}>
        <MenuItem value={1}>Low</MenuItem>
        <MenuItem value={2}>Minor</MenuItem>
        <MenuItem value={3}>Medium</MenuItem>
        <MenuItem value={4}>High</MenuItem>
        <MenuItem value={5}>Critical</MenuItem>
      </Select>
    </FormControl>
  );

  return (
    <>
      <Box display={'flex'} flexDirection={'column'} gap={1}>
        {tasksInfoData.tasks.map((task) => (
          <TaskDetails key={task.id} task={task} />
        ))}
      </Box>
      <Box display={'flex'} alignItems={'center'} gap={2}>
        <TextField
          margin="normal"
          fullWidth
          name="task-description"
          label="Task description"
          id="task-description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          autoComplete="task-description"
        />
        <IconButton color={'primary'} sx={{ borderStyle: 'solid', borderWidth: '1px' }} onClick={handleAddTask}>
          <AddIcon />
        </IconButton>
      </Box>
      <Box display={'flex'} gap={2}>
        <Button
          color={'gray'}
          sx={{ textTransform: 'none' }}
          startIcon={<CalendarMonthIcon />}
          onClick={() => openDatePicker()}
        >
          {!dueDate ? 'Set due date' : 'Due: ' + dueDate.format('DD.MM.YYYY')}
        </Button>
        {renderPriorityPicker()}
        {renderDatePickerDialog()}
      </Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Button variant="outlined" sx={{ mt: 3, mb: 2 }} color={'primary'} onClick={() => handlePrevStep()}>
          Back
        </Button>
        <Button variant="outlined" sx={{ mt: 3, mb: 2 }} color={'primary'} onClick={() => handleNextStep()}>
          Next
        </Button>
      </Box>
    </>
  );
}
