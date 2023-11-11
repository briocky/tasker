import { TaskDto } from "@/types/task/task-types";
import { authAxios } from '@/services/axios/axios';

async function addNewTaskToCategory(task: TaskDto) {
    const addTaskEndpoint = "api/tasks/add";
    return await authAxios.post<TaskDto>(addTaskEndpoint, task)
        .then((response) => response.data);
}

async function completeTask(taskId: number) {
    const completTaskEndpoint = `api/tasks/complete/${taskId}`
    return await authAxios.post<void>(completTaskEndpoint)
        .then((response) => response.data);    
}

export {addNewTaskToCategory, completeTask}