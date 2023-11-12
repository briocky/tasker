'use client';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import AddIcon from '@mui/icons-material/Add';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Button from '@mui/material/Button/Button';
import { useState } from 'react';
import { Dayjs } from 'dayjs';
import { TaskDto } from '@/types/task/task-types';
import FormControl from '@mui/material/FormControl/FormControl';
import InputLabel from '@mui/material/InputLabel/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select/Select';
import MenuItem from '@mui/material/MenuItem/MenuItem';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import Dialog from '@mui/material/Dialog/Dialog';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker/StaticDatePicker';

export default function AddTask({ handleAddTask, sending }: { handleAddTask: (task: TaskDto) => void; sending: boolean }) {
	const [calendarOpened, setCalendarOpened] = useState<boolean>(false);
	const [description, setDescription] = useState<string>('');
	const [dueDate, setDueDate] = useState<Dayjs | null>(null);
	const [priority, setPriority] = useState<number>(1);

	const openDatePicker = () => setCalendarOpened(!calendarOpened);

	const handleClose = () => setCalendarOpened(false);

	const handlePriorityChange = (e: SelectChangeEvent<number>) => setPriority(Number(e.target.value));

	const handleAddTaskWrapper = () => {
		let task: TaskDto = {
			id: undefined,
			taskCategoryId: undefined,
			done: false,
			createdAt: new Date(),
			description: description,
			deadline: dueDate?.toDate(),
			priority: priority,
			comments: undefined
		};
		handleAddTask(task);
	};

	const renderDatePickerDialog = () => (
		<Dialog onClose={handleClose} open={calendarOpened}>
			<DialogTitle>Set due date</DialogTitle>
			<StaticDatePicker onClose={handleClose} onChange={setDueDate} onAccept={handleClose} disablePast={true} defaultValue={dueDate} />
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
			<Box display={'flex'} alignItems={'center'} gap={2}>
				<TextField
					margin="normal"
					fullWidth
					name="task-description"
					label="Add task"
					id="task-description"
					value={description}
					onChange={e => setDescription(e.target.value)}
					autoComplete="task-description"
				/>
				<IconButton color={'primary'} sx={{ borderStyle: 'solid', borderWidth: '1px' }} onClick={handleAddTaskWrapper}>
					<AddIcon />
				</IconButton>
			</Box>
			<Box display={'flex'} gap={2}>
				<Button
					color={'gray'}
					sx={{ textTransform: 'none' }}
					startIcon={<CalendarMonthIcon />}
					onClick={() => openDatePicker()}
					disabled={sending}
				>
					{!dueDate ? 'Set due date' : 'Due: ' + dueDate.format('DD.MM.YYYY')}
				</Button>
				{renderPriorityPicker()}
				{renderDatePickerDialog()}
			</Box>
		</>
	);
}
