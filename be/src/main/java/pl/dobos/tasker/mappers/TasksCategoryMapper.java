package pl.dobos.tasker.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.dobos.tasker.models.dtos.TasksCategory;

@Mapper(componentModel = "spring", uses = {TaskMapper.class, UserMapper.class})
public interface TasksCategoryMapper {

  @Mapping(target = "ownerId", source = "owner.id")
  @Mapping(target = "membersIds", expression = "java(source.getMembers().stream().map(pl.dobos.tasker.models.entities.User::getId).collect(java.util.stream.Collectors.toList()))")
  TasksCategory getTasksCategory(pl.dobos.tasker.models.entities.TasksCategory source);

  @Mapping(target = "owner", ignore = true)
  @Mapping(target = "members", ignore = true)
  pl.dobos.tasker.models.entities.TasksCategory getTasksCategory(TasksCategory source);
}
