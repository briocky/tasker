package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.servlet.http.Cookie;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@Getter
@Setter
@Builder @AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class RegisterResponse {

  String token;

  @JsonIgnore
  Cookie refreshTokenCookie;

  @JsonIgnore
  Long userId;
}
