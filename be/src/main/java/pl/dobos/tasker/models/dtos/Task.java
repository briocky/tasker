package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import java.time.LocalDateTime;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.dobos.tasker.models.entities.TasksCategory;

@Getter @Setter
@Builder
@FieldDefaults(level = PRIVATE)
public class Task {

  TasksCategory tasksCategory;
  String description;
  LocalDateTime createdAt;
  LocalDateTime deadline;
  boolean done;
  int priority;
}
