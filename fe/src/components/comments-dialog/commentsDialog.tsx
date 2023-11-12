import { CommentDto } from '@/types/comment/comment-types';
import { IconButton, TextField } from '@mui/material';
import Box from '@mui/material/Box/Box';
import Dialog from '@mui/material/Dialog/Dialog';
import DialogTitle from '@mui/material/DialogTitle/DialogTitle';
import List from '@mui/material/List/List';
import ListItem from '@mui/material/ListItem/ListItem';
import Typography from '@mui/material/Typography/Typography';
import dayjs from 'dayjs';
import AddComment from '../add-comment/addComment';

export default function CommentsDialog({
	comments,
	open,
	taskId,
	handleClose,
	handleAddComment
}: {
	comments: CommentDto[];
	open: boolean;
	taskId: number;
	handleClose: () => void;
	handleAddComment: (comment: string, taskId: number) => void;
}) {
	const displayNoCommentsInfo = () => {
		if (comments.length === 0) {
			return (
				<Typography fontStyle={'italic'} sx={{ color: 'grey' }}>
					No comments
				</Typography>
			);
		}
	};

	return (
		<Dialog onClose={handleClose} open={open} PaperProps={{ sx: { px: 2, pb: 2 } }}>
			<DialogTitle>Comments</DialogTitle>
			<List sx={{ pt: 0, px: 2, pb: 2 }}>
				{displayNoCommentsInfo()}
				{comments.map(comment => (
					<ListItem
						disableGutters
						key={comment.id}
						sx={{
							display: 'flex',
							flexDirection: 'column',
							borderStyle: 'solid',
							borderRadius: '12px',
							borderWidth: '0.7px',
							p: 1,
							borderColor: 'rgba(82,83,84,0.68)',
							mb: 1
						}}
					>
						<Box width={'100%'} display={'flex'} flexDirection={'column'}>
							<Box display={'flex'} gap={1} alignItems="center">
								<Typography variant={'body1'} fontStyle={'italic'}>
									{comment.authorEmail}
								</Typography>
								<Typography variant="body2" sx={{ color: 'grey' }}>
									Added: {dayjs(comment.createdAt).format('DD.MM.YYYY')}
								</Typography>
							</Box>
							<Box>
								<Typography>{comment.text}</Typography>
							</Box>
						</Box>
					</ListItem>
				))}
			</List>
			<AddComment taskId={taskId} handleAddComment={handleAddComment} />
		</Dialog>
	);
}
