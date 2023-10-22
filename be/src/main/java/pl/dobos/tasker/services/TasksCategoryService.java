package pl.dobos.tasker.services;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import pl.dobos.tasker.exceptions.TasksCategoryNotFoundException;
import pl.dobos.tasker.mappers.TasksCategoryMapper;
import pl.dobos.tasker.models.dtos.TasksCategory;
import pl.dobos.tasker.models.entities.User;
import pl.dobos.tasker.repositories.TasksCategoryRepository;

@Service
@RequiredArgsConstructor
public class TasksCategoryService {

  private static final String TASKS_CATEGORY_NOT_FOUND_MESSAGE = "No category with id: %d found";
  private static final String UNAUTHORIZED_ACCESS_MESSAGE = "Unauthorized access to the category with id: %d";
  private static final String ID_CANNOT_BE_NULL_MESSAGE = "Id cannot be null";

  private final TasksCategoryRepository tasksCategoryRepository;
  private final CurrentUserService currentUserService;
  private final TasksCategoryMapper tasksCategoryMapper;

  public TasksCategory getTasksCategory(Long id) {
    if (id == null) {
      throw new IllegalArgumentException(ID_CANNOT_BE_NULL_MESSAGE);
    }

    pl.dobos.tasker.models.entities.TasksCategory fetchedCategory =
        tasksCategoryRepository.findById(id).orElseThrow(() ->
            new TasksCategoryNotFoundException(
                String.format(TASKS_CATEGORY_NOT_FOUND_MESSAGE, id)));

    User owner = fetchedCategory.getOwner();
    if (owner != null) {
      final Long loggedInUserId = currentUserService.getCurrentUserId();

      if (loggedInUserId.equals(owner.getId())) {
        return tasksCategoryMapper.getTasksCategory(fetchedCategory);
      } else {
        throw new TasksCategoryNotFoundException(
            String.format(UNAUTHORIZED_ACCESS_MESSAGE, fetchedCategory.getId()));
      }
    } else {
      throw new IllegalStateException("Category with id: " + id + " has no owner");
    }
  }

  public TasksCategory getSharedTasksCategory(Long id) {
    if (id == null) {
      throw new IllegalArgumentException(ID_CANNOT_BE_NULL_MESSAGE);
    }

    pl.dobos.tasker.models.entities.TasksCategory fetchedCategory =
        tasksCategoryRepository.findById(id).orElseThrow(() ->
            new TasksCategoryNotFoundException(
                String.format(TASKS_CATEGORY_NOT_FOUND_MESSAGE, id)));

    final Long loggedInUserId = currentUserService.getCurrentUserId();
    if (loggedInUserId.equals(fetchedCategory.getOwner().getId())) {
      return tasksCategoryMapper.getTasksCategory(fetchedCategory);
    } else if (fetchedCategory.isShared()) {
      return getTasksCategoryIfUserIsMember(fetchedCategory, loggedInUserId);
    } else {
      throw new TasksCategoryNotFoundException("Category with id: " + id + " is not shared");
    }
  }

  public List<TasksCategory> getAllTasksCategories(Pageable pageRequest) {
    final boolean shared = false;
    return getAllTasksCategories(pageRequest, shared);
  }

  public List<TasksCategory> getAllSharedTasksCategories(Pageable pageRequest) {
    final boolean shared = true;
    return getAllTasksCategories(pageRequest, shared);
  }

  public TasksCategory createTasksCategory(TasksCategory tasksCategory) {
    if (tasksCategory == null) {
      throw new IllegalArgumentException("Tasks category cannot be null");
    }

    User currentUser = currentUserService.getCurrentUserDetails();
    pl.dobos.tasker.models.entities.TasksCategory newTaskCategory =
        tasksCategoryMapper.getTasksCategory(tasksCategory);
    newTaskCategory.setOwner(currentUser);
    pl.dobos.tasker.models.entities.TasksCategory savedTasksCategory =
        tasksCategoryRepository.save(newTaskCategory);
    return tasksCategoryMapper.getTasksCategory(savedTasksCategory);
  }

  public TasksCategory updateTasksCategory(Long id, TasksCategory tasksCategory) {
    if (id == null || tasksCategory == null) {
      throw new IllegalArgumentException("Id & tasks category data cannot be null");
    }

    pl.dobos.tasker.models.entities.TasksCategory dbCategory =
        tasksCategoryRepository.findById(id).orElseThrow(() ->
            new TasksCategoryNotFoundException(
                String.format(TASKS_CATEGORY_NOT_FOUND_MESSAGE, id)));

    if (!dbCategory.getOwner().getId().equals(currentUserService.getCurrentUserId())) {
      throw new TasksCategoryNotFoundException(
          String.format(UNAUTHORIZED_ACCESS_MESSAGE, dbCategory.getId()));
    }

    pl.dobos.tasker.models.entities.TasksCategory mapped = tasksCategoryMapper.getTasksCategory(
        tasksCategory);

    pl.dobos.tasker.models.entities.TasksCategory updatedCategory = dbCategory.toBuilder()
        .tasks(mapped.getTasks())
        .name(mapped.getName())
        .iconUrl(mapped.getIconUrl())
        .members(mapped.getMembers())
        .shared(mapped.isShared())
        .description(mapped.getDescription())
        .build();

    updatedCategory = tasksCategoryRepository.save(updatedCategory);

    return tasksCategoryMapper.getTasksCategory(updatedCategory);
  }

  public void deleteTasksCategory(Long id) {
    if (id == null) {
      throw new IllegalArgumentException(ID_CANNOT_BE_NULL_MESSAGE);
    }

    pl.dobos.tasker.models.entities.TasksCategory fetchedCategory =
        tasksCategoryRepository.findById(id).orElseThrow(() ->
            new TasksCategoryNotFoundException(
                String.format(TASKS_CATEGORY_NOT_FOUND_MESSAGE, id)));

    final Long loggedInUserId = currentUserService.getCurrentUserId();
    if (loggedInUserId.equals(fetchedCategory.getOwner().getId())) {
      tasksCategoryRepository.delete(fetchedCategory);
    } else {
      throw new TasksCategoryNotFoundException(
          String.format(UNAUTHORIZED_ACCESS_MESSAGE, fetchedCategory.getId()));
    }
  }

  private TasksCategory getTasksCategoryIfUserIsMember(
      pl.dobos.tasker.models.entities.TasksCategory fetchedCategory,
      Long loggedInUserId) {
    List<Long> membersIds = fetchedCategory.getMembers().stream().map(User::getId).toList();
    if (membersIds.contains(loggedInUserId)) {
      return tasksCategoryMapper.getTasksCategory(fetchedCategory);
    } else {
      throw new TasksCategoryNotFoundException(
          String.format(UNAUTHORIZED_ACCESS_MESSAGE, fetchedCategory.getId()));
    }
  }

  private List<TasksCategory> getAllTasksCategories(Pageable pageRequest, boolean shared) {
    if (pageRequest == null) {
      throw new IllegalArgumentException("Page request cannot be null");
    }

    final User loggedInUser = currentUserService.getCurrentUserDetails();
    Page<pl.dobos.tasker.models.entities.TasksCategory> tasksCategories =
        tasksCategoryRepository.findAllByOwnerAndShared(loggedInUser, shared, pageRequest);
    return tasksCategories.map(tasksCategoryMapper::getTasksCategory).toList();
  }
}