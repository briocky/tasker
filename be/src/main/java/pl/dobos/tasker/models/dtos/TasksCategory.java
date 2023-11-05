package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter @Setter
@Builder
@FieldDefaults(level = PRIVATE)
public class TasksCategory {

  Long id;
  String name;
  String description;
  String iconUrl;
  List<String> membersEmails;
  Long ownerId;
  List<Task> tasks;
  boolean shared;
}
