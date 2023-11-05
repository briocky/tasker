package pl.dobos.tasker.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.dobos.tasker.models.entities.Invitation;

@Repository
public interface InvitationRepository extends JpaRepository<Invitation, Long> {

}
