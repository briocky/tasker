package pl.dobos.tasker.repositories;

import java.util.Optional;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import pl.dobos.tasker.models.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

  Optional<User> findByEmail(String email);
}
