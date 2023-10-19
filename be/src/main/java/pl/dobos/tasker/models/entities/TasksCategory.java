package pl.dobos.tasker.models.entities;

import static lombok.AccessLevel.PRIVATE;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "tasks_categories")
@NoArgsConstructor
@Getter @Setter
@FieldDefaults(level = PRIVATE)
public class TasksCategory {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "tasks_categories_id_seq")
  @SequenceGenerator(name = "tasks_categories_id_seq", sequenceName = "tasks_categories_id_seq", allocationSize = 1)
  Long id;
  String name;
  String description;
  String iconUrl;
  @ManyToMany(mappedBy = "tasksCategories")
  List<User> members;
  @ManyToOne
  @JoinColumn(name = "owner_id")
  User owner;
  @OneToMany(mappedBy = "tasksCategory")
  List<Task> tasks;
}
