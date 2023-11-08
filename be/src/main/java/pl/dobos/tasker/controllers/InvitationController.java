package pl.dobos.tasker.controllers;

import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dobos.tasker.models.dtos.Invitation;
import pl.dobos.tasker.models.dtos.InvitationResponseRequest;
import pl.dobos.tasker.services.InvitationService;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Validated
class InvitationController {

  private final InvitationService invitationService;

  @GetMapping("/all")
  public ResponseEntity<List<Invitation>> getAllNotifications() {
    return ResponseEntity.ok(invitationService.getAllNotifications());
  }

  @PostMapping("/respond")
  public ResponseEntity<Void> respondToInvitation(@RequestBody InvitationResponseRequest request) {
    invitationService.respondToInvitation(request);
    return ResponseEntity.ok().build();
  }
}
