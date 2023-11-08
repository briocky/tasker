package pl.dobos.tasker.services;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dobos.tasker.exceptions.InvitationNotFoundException;
import pl.dobos.tasker.mappers.InvitationMapper;
import pl.dobos.tasker.models.dtos.InvitationResponseRequest;
import pl.dobos.tasker.models.entities.Invitation;
import pl.dobos.tasker.models.entities.TasksCategory;
import pl.dobos.tasker.models.entities.User;
import pl.dobos.tasker.models.enums.InvitationStatus;
import pl.dobos.tasker.repositories.InvitationRepository;
import pl.dobos.tasker.repositories.TasksCategoryRepository;
import pl.dobos.tasker.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class InvitationService {

  private final InvitationRepository invitationRepository;
  private final CurrentUserService currentUserService;
  private final InvitationMapper invitationMapper;
  private final TasksCategoryRepository tasksCategoryRepository;
  private final UserRepository userRepository;

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

  public List<pl.dobos.tasker.models.dtos.Invitation> getAllNotifications() {
    User currentUser = currentUserService.getCurrentUserDetails();
    List<Invitation> invitations = invitationRepository.findAllByReceiver(currentUser);
    return invitationMapper.getInvitationList(invitations);
  }

  public void respondToInvitation(InvitationResponseRequest request) {
    Invitation invitation = invitationRepository.findById(request.getId())
        .orElseThrow(() -> new InvitationNotFoundException(
            String.format("Invitation %d not found", request.getId())));

    if (request.getStatus() == InvitationStatus.ACCEPTED) {
      User receiver = invitation.getReceiver();

      TasksCategory tasksCategory = invitation.getTasksCategory();
      tasksCategory.getMembers().add(receiver);

      receiver.getTasksCategories().add(tasksCategory);

      userRepository.save(receiver);
      tasksCategoryRepository.save(tasksCategory);
    }
    invitationRepository.deleteById(request.getId());
  }
}
