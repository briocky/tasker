package pl.dobos.tasker.models.entities;

import static lombok.AccessLevel.PRIVATE;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Positive;
import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@Getter
@Setter
@FieldDefaults(level = PRIVATE)
@Builder
@AllArgsConstructor
public class Task {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "task_id_seq")
  @SequenceGenerator(name = "task_id_seq", sequenceName = "task_id_seq", allocationSize = 1)
  Long id;
  @ManyToOne
  @JoinColumn(name = "tasks_category_id")
  TasksCategory tasksCategory;
  String description;
  LocalDateTime createdAt;
  LocalDateTime deadline;
  boolean done;
  @Positive
  int priority;
  @OneToMany(mappedBy = "task", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
  @Builder.Default
  List<TaskComment> comments = new ArrayList<>();
}
