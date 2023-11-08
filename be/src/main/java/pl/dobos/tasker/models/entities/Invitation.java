package pl.dobos.tasker.models.entities;

import static lombok.AccessLevel.PRIVATE;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Table(name = "invitations")
@NoArgsConstructor
@Getter @Setter
@FieldDefaults(level = PRIVATE)
@Builder
@AllArgsConstructor
public class Invitation {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "invitations_id_seq")
  @SequenceGenerator(name = "invitations_id_seq", sequenceName = "invitations_id_seq", allocationSize = 1)
  Long id;
  @ManyToOne
  User sender;
  @ManyToOne
  User receiver;
  @ManyToOne
  TasksCategory tasksCategory;
  Boolean accepted;
  String title;
  String text;
}
