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
import pl.dobos.tasker.models.enums.AttachmentType;

@Entity
@Table(name = "comment_attachments")
@NoArgsConstructor
@Getter @Setter
@FieldDefaults(level = PRIVATE)
public class CommentAttachment {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comment_attachments_id_seq")
  @SequenceGenerator(name = "comment_attachments_id_seq", sequenceName = "comment_attachments_id_seq", allocationSize = 1)
  Long id;
  String data;
  LocalDateTime uploadAt;
  @Enumerated(EnumType.STRING)
  AttachmentType type;
}
