package pl.dobos.tasker.services;

import java.util.Optional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import pl.dobos.tasker.exceptions.EmptySecurityContextException;
import pl.dobos.tasker.models.entities.User;

@Service
public class CurrentUserService {

  public Long getCurrentUserId() {
    return getCurrentUserDetails().getId();
  }

  public User getCurrentUserDetails() {
    return getCurrentUserFromSecurityContext()
        .orElseThrow(() -> new EmptySecurityContextException("No user logged in"));
  }

  private Optional<User> getCurrentUserFromSecurityContext() {
    return Optional
        .ofNullable(SecurityContextHolder.getContext().getAuthentication())
        .map(authentication -> (User) authentication.getPrincipal());
  }
}
