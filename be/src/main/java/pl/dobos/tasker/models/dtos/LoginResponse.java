package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.servlet.http.Cookie;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Builder @Getter @Setter
@FieldDefaults(level = PRIVATE)
public class LoginResponse {

  String token;

  @JsonIgnore
  Cookie refreshTokenCookie;
}
