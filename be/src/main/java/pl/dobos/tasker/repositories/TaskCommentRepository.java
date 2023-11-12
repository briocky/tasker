package pl.dobos.tasker.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import pl.dobos.tasker.models.entities.Task;
import pl.dobos.tasker.models.entities.TaskComment;
import pl.dobos.tasker.models.entities.User;

@Repository
public interface TaskCommentRepository extends JpaRepository<TaskComment, Long> {

    List<TaskComment> findAllByTask(Task task);

    List<TaskComment> findAllByAuthor(User author);
}
