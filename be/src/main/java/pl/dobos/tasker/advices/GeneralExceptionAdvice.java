package pl.dobos.tasker.advices;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import pl.dobos.tasker.exceptions.AuthException;
import pl.dobos.tasker.exceptions.TasksCategoryNotFoundException;

@RestControllerAdvice
@Slf4j
public class GeneralExceptionAdvice {

  @ExceptionHandler(AuthException.class)
  @ResponseStatus(HttpStatus.BAD_REQUEST)
  public String handleAuthException(AuthException e) {
    log.error("Auth exception: {}", e.getMessage());
    return e.getMessage();
  }

  @ExceptionHandler(TasksCategoryNotFoundException.class)
  @ResponseStatus(HttpStatus.NOT_FOUND)
  public String handleTasksCategoryNotFoundException(TasksCategoryNotFoundException e) {
    log.error("Tasks category not found exception: {}", e.getMessage());
    return e.getMessage();
  }
}
