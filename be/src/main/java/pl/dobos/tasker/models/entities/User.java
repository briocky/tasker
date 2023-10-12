package pl.dobos.tasker.models.entities;

import static lombok.AccessLevel.PRIVATE;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import java.util.Collection;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter @Setter
@FieldDefaults(level = PRIVATE)
public class User implements UserDetails {

  @Id
  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_id_seq")
  @SequenceGenerator(name = "user_id_seq", sequenceName = "user_id_seq", allocationSize = 1)
  Long id;

  @NotNull
  String firstName;

  @NotNull
  String lastName;

  int age;

  String imageUrl;

  @NotNull
  @Email
  String email;

  String password;

  boolean isEnabled;

  @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
  List<Role> roles;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "owner")
  AccessToken accessToken;

  @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY, mappedBy = "owner")
  RefreshToken refreshToken;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.roles
        .stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .toList();
  }

  @Override
  public String getPassword() {
    return this.password;
  }

  @Override
  public String getUsername() {
    return this.email;
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return isEnabled;
  }
}
