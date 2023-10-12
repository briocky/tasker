package pl.dobos.tasker.models.dtos;

import static lombok.AccessLevel.PRIVATE;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = PRIVATE)
public class User {

  @NotNull
  String firstName;
  @NotNull
  String lastName;
  int age;
  String imageUrl;
  @NotNull
  String email;
  @NotNull
  String password;
  @NotNull
  String confirmPassword;
}
