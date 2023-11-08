package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.dobos.tasker.models.enums.InvitationStatus;

@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = PRIVATE)
public class InvitationResponseRequest {

  Long id;
  InvitationStatus status;
}
