package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@FieldDefaults(level = PRIVATE)
public class Comment {

    Long id;
    String text;
    LocalDateTime createdAt;
    String authorEmail;
    Long taskId;
}
