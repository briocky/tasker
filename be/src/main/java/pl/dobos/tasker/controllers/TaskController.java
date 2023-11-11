package pl.dobos.tasker.controllers;

import lombok.RequiredArgsConstructor;
import pl.dobos.tasker.models.dtos.Task;
import pl.dobos.tasker.services.TaskService;

import java.net.URI;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Validated
class TaskController {

    private final TaskService taskService;

    @PostMapping("/add")
    public ResponseEntity<Task> addNewTaskToCategory(@RequestBody Task task) {
        Task savedTask = taskService.addNewTaskToCategory(task);
        return ResponseEntity.created(URI.create("/api/tasks/" + savedTask.getId())).body(savedTask);
    }

    @PostMapping("/complete/{id}")
    public ResponseEntity<Void> completeTask(@PathVariable("id") Long taskId) {
        taskService.completeTask(taskId);
        return ResponseEntity.noContent().build();
    }
}