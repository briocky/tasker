package pl.dobos.tasker.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import pl.dobos.tasker.models.entities.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

  @Mapping(target = "id", ignore = true)
  @Mapping(target = "roles", ignore = true)
  @Mapping(target = "enabled", constant = "true")
  @Mapping(target = "accessToken", ignore = true)
  @Mapping(target = "refreshToken", ignore = true)
  @Mapping(target = "authorities", ignore = true)
  @Mapping(target = "tasksCategories", ignore = true)
  @Mapping(target = "invitations", ignore = true)
  @Mapping(target = "comments", ignore = true)
  User getUser(pl.dobos.tasker.models.dtos.User source);

  @Mapping(target = "confirmPassword", ignore = true)
  pl.dobos.tasker.models.dtos.User getUser(User source);
}
