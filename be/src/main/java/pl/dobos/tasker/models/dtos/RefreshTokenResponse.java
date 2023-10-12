package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Builder
@Getter
@Setter
@FieldDefaults(level = PRIVATE)
public class RefreshTokenResponse {

  String token;
}
