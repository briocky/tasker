package pl.dobos.tasker.models.entities;

import static lombok.AccessLevel.PRIVATE;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.dobos.tasker.models.enums.ERole;

@Entity
@Table(name = "roles")
@NoArgsConstructor
@Getter @Setter
@FieldDefaults(level = PRIVATE)
public class Role {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "role_id_seq")
  @SequenceGenerator(name = "role_id_seq", sequenceName = "role_id_seq", allocationSize = 1)
  Long id;

  @Enumerated(EnumType.STRING)
  @NotNull
  ERole name;
}
