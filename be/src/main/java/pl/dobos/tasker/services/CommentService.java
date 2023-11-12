package pl.dobos.tasker.services;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dobos.tasker.mappers.CommentMapper;
import pl.dobos.tasker.models.dtos.Comment;
import pl.dobos.tasker.models.entities.Task;
import pl.dobos.tasker.models.entities.TaskComment;
import pl.dobos.tasker.models.entities.User;
import pl.dobos.tasker.repositories.TaskCommentRepository;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final TaskCommentRepository taskCommentRepository;
    private final CommentMapper commentMapper;
    private final CurrentUserService currentUserService;

    public List<Comment> getTaskComments(Long taskId) {
        var task = Task.builder().id(taskId).build();
        List<TaskComment> comments = taskCommentRepository.findAllByTask(task);
        return commentMapper.getCommentList(comments);
    }

    public Comment addNewComment(Comment comment) {
        User currentUser = currentUserService.getCurrentUserDetails();

        TaskComment mappedComment = commentMapper.getComment(comment);
        List<TaskComment> userComments = taskCommentRepository.findAllByAuthor(currentUser);
        userComments.add(mappedComment);
        mappedComment.setAuthor(currentUser);
        mappedComment.getAuthor().setComments(userComments);

        TaskComment savedComment = taskCommentRepository.save(mappedComment);

        return commentMapper.getComment(savedComment);
    }
}
