package pl.dobos.tasker.services;

import java.util.Optional;

import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import pl.dobos.tasker.exceptions.TaskNotFoundException;
import pl.dobos.tasker.mappers.TaskMapper;
import pl.dobos.tasker.models.dtos.Task;
import pl.dobos.tasker.repositories.TaskRepository;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public Task getTaskById(Long taskId) {
        if (taskId == null || taskId < 0) {
            throw new IllegalArgumentException("TaskId cannot be null and must be positive!");
        }

        var taskById = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(
                        String.format("Task cannot be found!")));

        return taskMapper.getTask(taskById);
    }

    public Task addNewTaskToCategory(Task newTask) {
        var saved = taskRepository.save(taskMapper.getTask(newTask));
        return taskMapper.getTask(saved);
    }

    public void completeTask(Long taskId) {
        var taskById = taskRepository.findById(taskId)
                .orElseThrow(() -> new TaskNotFoundException(
                        String.format("Task id=%d cannot be found!", taskId)));
        taskById.setDone(true);
        taskRepository.save(taskById);
    }
}
