'use client';
import Container from '@mui/material/Container';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import { useEffect, useState } from 'react';
import { Box, ListItemText, Paper, Typography, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Loading from '@/components/loading/loading';
import { CategoryDto } from '@/types/category/category-types';
import { getCategory } from '@/services/category-service';
import TextField from '@mui/material/TextField/TextField';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import EditIcon from '@mui/icons-material/Edit';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AddTask from '@/components/add-task/addTask';
import { TaskDto } from '@/types/task/task-types';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import dayjs from 'dayjs';
import { addNewTaskToCategory, completeTask } from '@/services/task-service';
import CommentsDialog from '@/components/comments-dialog/commentsDialog';
import { addCommentToTask, getTaskComments } from '@/services/comment-service';
import { CommentDto } from '@/types/comment/comment-types';

export default function CategoryDetails({
	params
}: {
	params: {
		id: number;
	};
}) {
	const [category, setCategory] = useState<CategoryDto | null>(null);
	const [sending, setSending] = useState<boolean>(false);
	const [commentsShown, setCommentsShown] = useState<boolean>(false);
	const [commentShownTaskId, setCommentShownTaskId] = useState<number | null>(null);

	useEffect(() => {
		getCategory(params.id).then(category => setCategory(category));
	}, []);

	const handleTaskComplete = (taskId: number | undefined) => {
		if (!taskId) {
			return;
		}
		completeTask(taskId).then(response => {
			if (!category) return;
			const updatedTasksCategory = {
				...category,
				tasks: [...category.tasks.filter(task => task.id !== taskId)]
			};
			setCategory(updatedTasksCategory);
		});
	};

	const handleTaskDelete = (taskId: number | undefined) => {
		// setCategories((prevCategories) =>
		//   prevCategories.map((category) => ({
		//     ...category,
		//     tasks: category.tasks.filter((task) => task.id !== taskId),
		//   }))
		// );
	};

	const handleShowComments = (taskId: number | undefined) => {
		if (!taskId || !category) return;

		getTaskComments(taskId).then(comments => {
			const taskToUpdate = category.tasks.find(task => task.id === taskId);
			if (!taskToUpdate) return;
			taskToUpdate.comments = comments;
			const updatedCategory = {
				...category,
				tasks: [...category.tasks]
			};
			setCategory(updatedCategory);
		});
		setCommentsShown(true);
		setCommentShownTaskId(taskId);
	};

	const handleCloseComments = () => {
		setCommentsShown(false);
		setCommentShownTaskId(null);
	};

	const handleCategoryEdit = () => {
		// Dodaj kod obsługujący edycję kategorii
	};

	const handleCategoryDelete = () => {};

	const handleAddTask = (task: TaskDto) => {
		if (!category) return;
		task.taskCategoryId = category.id;
		setSending(true);
		addNewTaskToCategory(task).then(savedTask => {
			const updatedCategory: CategoryDto = {
				...category,
				tasks: [...category.tasks, savedTask]
			};
			setCategory(updatedCategory);
		});
		setSending(false);
	};

	const handleAddComment = (comment: string, taskId: number) => {
		if (!category) return;

		const commentData: CommentDto = {
			taskId: taskId,
			text: comment,
			createdAt: new Date()
		};

		const taskToUpdate = category.tasks.find(task => task.id === taskId);
		if (!taskToUpdate) return;

		addCommentToTask(commentData).then(comment => {
			if (!taskToUpdate.comments) taskToUpdate.comments = [];

			taskToUpdate.comments.push(comment);

			const updatedCategory: CategoryDto = {
				...category,
				tasks: [...category.tasks]
			};

			setCategory(updatedCategory);
		});
	};

	if (!category) {
		return <Loading title={'Loading tasks category details'} />;
	}

	return (
		<Container component="main" maxWidth="sm">
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<Box sx={{ mt: 4 }}>
					<Typography mb={2} sx={{ textDecoration: 'underline' }}>
						Category Details
					</Typography>
					<Box display="flex" justifyContent="space-between">
						<Typography textAlign={'center'} variant={'h4'}>
							{category.name}
						</Typography>
						<Box>
							<IconButton color="info" onClick={handleCategoryEdit}>
								<EditIcon />
							</IconButton>
							<IconButton color="error" onClick={handleCategoryDelete}>
								<DeleteIcon />
							</IconButton>
						</Box>
					</Box>
					<Box>
						<Typography sx={{ color: 'grey', fontSize: 13, fontStyle: 'italic' }}>{category.description}</Typography>
					</Box>
					<Box sx={{ backgroundColor: 'black', height: '1px', mt: 1, mb: 2 }} />
					{category.tasks.length === 0 && (
						<Typography variant="body1" sx={{ color: 'grey' }}>
							Task list is empty - add some!
						</Typography>
					)}
					{category.tasks
						.filter(task => !task.done)
						.map(task => (
							<Paper key={task.id} sx={{ p: 1, mb: 1 }}>
								<Box display="flex" justifyContent="space-between" alignItems="center">
									<Box display="flex" alignItems="center" onClick={() => handleTaskComplete(task.id)}>
										<IconButton color={'primary'} onClick={() => handleTaskComplete(task.id)}>
											<RadioButtonUncheckedIcon />
										</IconButton>
										<Typography sx={{ fontSize: 16 }}>{task.description}</Typography>
									</Box>
									<Box>
										<IconButton size="small" color="primary" onClick={() => handleShowComments(task.id)}>
											<InsertCommentIcon sx={{ fontSize: 18 }} />
										</IconButton>
										{commentsShown && commentShownTaskId === task.id && task.comments && task.id && (
											<CommentsDialog
												taskId={task.id}
												handleAddComment={handleAddComment}
												comments={task.comments}
												handleClose={handleCloseComments}
												open={commentsShown}
											/>
										)}
										<IconButton size="small" color="info">
											<EditIcon sx={{ fontSize: 18 }} />
										</IconButton>
										<IconButton size="small" color="error">
											<DeleteIcon sx={{ fontSize: 18 }} />
										</IconButton>
									</Box>
								</Box>
								{task.deadline && (
									<Typography sx={{ color: 'grey' }} textAlign={'end'}>
										Due to: {dayjs(task.deadline).format('DD.MM.YYYY')}
									</Typography>
								)}
							</Paper>
						))}
					<AddTask sending={sending} handleAddTask={handleAddTask} />
				</Box>
			</LocalizationProvider>
		</Container>
	);
}
