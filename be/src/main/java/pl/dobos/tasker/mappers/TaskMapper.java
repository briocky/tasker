package pl.dobos.tasker.mappers;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.dobos.tasker.models.dtos.Task;

@Mapper(componentModel = "spring")
public interface TaskMapper {

  @Mapping(target = "taskCategoryId", source = "tasksCategory.id")
  Task getTask(pl.dobos.tasker.models.entities.Task source);

  List<Task> getTaskList(List<pl.dobos.tasker.models.entities.Task> source);

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "tasksCategory", source = "id")
  pl.dobos.tasker.models.entities.Task getTask(Task source);

  default pl.dobos.tasker.models.entities.TasksCategory getTasksCategory(Long id) {
    return pl.dobos.tasker.models.entities.TasksCategory.builder().id(id).build();
  }
}
