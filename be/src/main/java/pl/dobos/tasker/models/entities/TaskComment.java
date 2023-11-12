package pl.dobos.tasker.models.entities;

import static lombok.AccessLevel.PRIVATE;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "task_comments")
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = PRIVATE)
public class TaskComment {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_comments_id_seq")
  @SequenceGenerator(name = "task_comments_id_seq", sequenceName = "task_comments_id_seq", allocationSize = 1)
  Long id;
  String text;
  LocalDateTime createdAt;
  @ManyToOne
  @JoinColumn(name = "task_id")
  Task task;
  @ManyToOne
  @JoinColumn(name = "author_id")
  User author;
}
