package pl.dobos.tasker.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.dobos.tasker.models.entities.TasksCategory;
import pl.dobos.tasker.models.entities.User;

@Repository
public interface TasksCategoryRepository extends JpaRepository<TasksCategory, Long> {

  Page<TasksCategory> findAllByOwnerAndShared(User owner, boolean shared, Pageable pageable);

  @Query("SELECT tc FROM TasksCategory tc JOIN tc.members m WHERE (tc.shared = true AND m = :user) OR tc.owner = :user")
  Page<TasksCategory> findSharedCategoriesForUser(@Param("user") User user, Pageable pageable);
}
