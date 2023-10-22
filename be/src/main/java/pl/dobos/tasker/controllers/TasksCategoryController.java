package pl.dobos.tasker.controllers;

import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
import java.net.URI;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import pl.dobos.tasker.models.dtos.TasksCategory;
import pl.dobos.tasker.services.TasksCategoryService;

@RestController
@RequestMapping("/api/tasks-category")
@RequiredArgsConstructor
@Validated
public class TasksCategoryController {

  private final TasksCategoryService tasksCategoryService;

  @GetMapping("/{id}")
  public ResponseEntity<TasksCategory> getTasksCategory(@PathVariable Long id) {
    return ResponseEntity.ok(tasksCategoryService.getTasksCategory(id));
  }

  @GetMapping("/shared/{id}")
  public ResponseEntity<TasksCategory> getSharedTasksCategory(@PathVariable Long id) {
    return ResponseEntity.ok(tasksCategoryService.getSharedTasksCategory(id));
  }

  @GetMapping(value = "/all", params = { "page", "size" })
  public ResponseEntity<List<TasksCategory>> getAllTasksCategories(
      @RequestParam("page") @PositiveOrZero int page,
      @RequestParam("size") @Positive int size) {
    return ResponseEntity.ok(tasksCategoryService.getAllTasksCategories(PageRequest.of(page, size)));
  }

  @GetMapping(value = "/shared/all", params = { "page", "size" })
  public ResponseEntity<List<TasksCategory>> getAllSharedTasksCategories(
      @RequestParam("page") @PositiveOrZero int page,
      @RequestParam("size") @Positive int size) {
    return ResponseEntity.ok(tasksCategoryService.getAllSharedTasksCategories(PageRequest.of(page, size)));
  }

  @PostMapping("/new-category")
  public ResponseEntity<TasksCategory> createTasksCategory(
      @RequestBody TasksCategory tasksCategory) {
    TasksCategory createdTasksCategory = tasksCategoryService.createTasksCategory(tasksCategory);
    return ResponseEntity
        .created(URI.create("/api/tasks-category/" + tasksCategory.getId()))
        .body(createdTasksCategory);
  }

  @PutMapping("/update-category/{id}")
  public ResponseEntity<TasksCategory> updateTasksCategory(
      @PathVariable Long id,
      @RequestBody TasksCategory tasksCategory) {
    return ResponseEntity.ok(tasksCategoryService.updateTasksCategory(id, tasksCategory));
  }

  @DeleteMapping("/delete-category/{id}")
  public ResponseEntity<Void> deleteTasksCategory(@PathVariable Long id) {
    tasksCategoryService.deleteTasksCategory(id);
    return ResponseEntity.noContent().build();
  }
}
