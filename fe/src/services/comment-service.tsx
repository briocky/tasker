import { authAxios } from '@/services/axios/axios';
import { CommentDto } from '@/types/comment/comment-types';
import { TaskDto } from '@/types/task/task-types';

async function getTaskComments(taskId: number) {
	const getCommentsEndpoint = `api/comments/${taskId}`;
	return await authAxios.get<CommentDto[]>(getCommentsEndpoint).then(response => response.data);
}

async function addCommentToTask(comment: CommentDto) {
	const addCommentEndpoint = 'api/comments/add';
	return await authAxios.post<CommentDto>(addCommentEndpoint, comment).then(response => response.data);
}

export { getTaskComments, addCommentToTask };
