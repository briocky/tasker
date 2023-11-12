package pl.dobos.tasker.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;
import pl.dobos.tasker.models.dtos.Comment;
import pl.dobos.tasker.models.entities.TaskComment;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    @Mapping(target = "taskId", source = "task.id")
    @Mapping(target = "authorEmail", source = "author.email")
    Comment getComment(TaskComment source);

    @Mapping(target = "task.id", source = "taskId")
    @Mapping(target = "author.email", source = "authorEmail")
    TaskComment getComment(Comment source);

    List<Comment> getCommentList(List<TaskComment> source);
}
