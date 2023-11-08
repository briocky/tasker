package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = PRIVATE)
public class Invitation {

  Long id;
  String senderEmail;
  Boolean accepted;
  TasksCategory tasksCategory;
  String title;
  String text;
}
