package pl.dobos.tasker.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dobos.tasker.models.entities.Invitation;
import pl.dobos.tasker.models.entities.User;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {

  List<Invitation> findAllByReceiver(User receiver);
}
