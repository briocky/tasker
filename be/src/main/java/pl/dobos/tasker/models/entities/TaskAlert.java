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
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import pl.dobos.tasker.models.enums.AlertType;

@Entity
@Table(name = "task_alerts")
@NoArgsConstructor
@Getter @Setter
@FieldDefaults(level = PRIVATE)
public class TaskAlert {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_alerts_id_seq")
  @SequenceGenerator(name = "task_alerts_id_seq", sequenceName = "task_alerts_id_seq", allocationSize = 1)
  Long id;
  LocalDateTime triggerDate;
  LocalDateTime createdAt;
  @Enumerated(EnumType.STRING)
  AlertType type;
}
