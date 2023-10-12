package pl.dobos.tasker.models.entities;

import static lombok.AccessLevel.PRIVATE;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "access_tokens")
@NoArgsConstructor
@Getter
@Setter
@Builder @AllArgsConstructor
@FieldDefaults(level = PRIVATE)
public class AccessToken {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "access_token_id_seq")
  @SequenceGenerator(name = "access_token_id_seq", sequenceName = "access_token_id_seq", allocationSize = 1)
  Long id;

  @NotNull
  String value;

  @NotNull
  @OneToOne
  @JoinColumn(name = "owner_id", referencedColumnName = "id")
  User owner;

  @NotNull
  LocalDateTime issueDate;

  @NotNull
  LocalDateTime expirationDate;
}
