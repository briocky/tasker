import { TaskDto } from '@/types/task/task-types';

export default function Task({ task }: { task: TaskDto }) {
	return <div>- {task.description}</div>;
}
