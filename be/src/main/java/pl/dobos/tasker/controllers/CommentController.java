package pl.dobos.tasker.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;
import pl.dobos.tasker.models.dtos.Comment;
import pl.dobos.tasker.services.CommentService;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Validated
class CommentController {

    private final CommentService commentService;

    @GetMapping("/{taskId}")
    public ResponseEntity<List<Comment>> getTaskComments(@PathVariable("taskId") Long taskId) {
        List<Comment> comments = commentService.getTaskComments(taskId);
        return ResponseEntity.ok(comments);
    }

    @PostMapping("/add")
    public ResponseEntity<Comment> addNewComment(@RequestBody Comment comment) {
        Comment savedComment = commentService.addNewComment(comment);
        return ResponseEntity.ok(savedComment);
    }
}
