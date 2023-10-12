package pl.dobos.tasker.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.dobos.tasker.models.entities.AccessToken;
import pl.dobos.tasker.models.entities.User;

@Repository
public interface AccessTokenRepository extends CrudRepository<AccessToken, Long> {

  Optional<AccessToken> findByOwner(User owner);
}
