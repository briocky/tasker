import { TaskDto } from '@/types/task/task-types';
import Paper from '@mui/material/Paper/Paper';
import Box from '@mui/material/Box/Box';
import Typography from '@mui/material/Typography/Typography';
import dayjs from 'dayjs';
import IconButton from '@mui/material/IconButton/IconButton';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';

const priorityConverter = (priority: number) => {
  switch (priority) {
    case 1:
      return 'Low';
    case 2:
      return 'Minor';
    case 3:
      return 'Medium';
    case 4:
      return 'High';
    case 5:
      return 'Critical';
    default:
      return 'Unknown priority';
  }
};

export default function TaskDetails({ task }: { task: TaskDto }) {
  return (
    <Paper sx={{ p: 2, display: 'flex', justifyContent: 'space-between' }} elevation={1}>
      <Box>
        <Typography variant={'body1'}>{task.description}</Typography>
        <Box display={'flex'} gap={1}>
          <Typography color={'grey'} sx={{ display: task.deadline ? 'block' : 'none' }} variant={'body2'}>
            {'Due: ' + dayjs(task.deadline).format('DD.MM.YYYY')}
          </Typography>
          <Typography color={'grey'} variant={'body2'}>
            {'Priority: ' + priorityConverter(task.priority)}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Tooltip title="Delete">
          <IconButton color={'error'}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>
    </Paper>
  );
}
