package pl.dobos.tasker.services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dobos.tasker.models.entities.Invitation;
import pl.dobos.tasker.models.entities.TasksCategory;
import pl.dobos.tasker.models.entities.User;
import pl.dobos.tasker.repositories.InvitationRepository;

@Service
@RequiredArgsConstructor
public class InvitationService {

  private final InvitationRepository invitationRepository;

  public void sendCategoryInvitation(User receiver, TasksCategory category, User sender) {
    Invitation invitation = Invitation.builder()
        .receiver(receiver)
        .tasksCategory(category)
        .sender(sender)
        .accepted(false)
        .title("Invitation to category")
        .text(String.format(
            "You have received an invitation to category: %s from: %s",
            category.getName(), sender.getEmail()))
        .build();

    invitationRepository.save(invitation);
  }
}
