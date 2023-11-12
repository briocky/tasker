'use client';
import Box from '@mui/material/Box/Box';
import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import AddIcon from '@mui/icons-material/Add';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useState } from 'react';

export default function AddComment({
	handleAddComment,
	taskId
}: {
	taskId: number;
	handleAddComment: (comment: string, taskId: number) => void;
}) {
	const [comment, setComment] = useState<string>('');

	const handleAddCommentWrapper = () => {
		setComment('');
		handleAddComment(comment, taskId);
	};

	return (
		<Box display="flex">
			<TextField size="small" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add comment" sx={{ mr: 1 }} />
			<IconButton color="primary" size="small" onClick={() => handleAddCommentWrapper()}>
				<AddIcon />
			</IconButton>
			<IconButton size="small">
				<AttachFileIcon />
			</IconButton>
		</Box>
	);
}
