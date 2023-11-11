import Paper from '@mui/material/Paper/Paper';
import { CategoryDto } from '@/types/category/category-types';
import Typography from '@mui/material/Typography/Typography';
import Task from '@/components/task/task';

export default function Category({ category }: { category: CategoryDto }) {
	return (
		<Paper
			elevation={2}
			sx={{
				minHeight: '300px',
				maxHeight: '300px',
				'&:hover': {
					cursor: 'pointer',
					transition: '0.2s',
					transform: 'scale(1.01)'
				},
				p: 2
			}}
		>
			<Typography textAlign={'center'} variant="h5" gutterBottom>
				{category.name}
			</Typography>
			<Typography variant="body1" sx={{ color: 'grey', fontSize: 13, fontStyle: 'italic' }} gutterBottom>
				{category.description}
			</Typography>
			{category.tasks?.filter(task => !task.done).map((task, index) => <Task key={task.id} task={task} />)}
		</Paper>
	);
}
