package pl.dobos.tasker.services;

import jakarta.servlet.http.Cookie;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.dobos.tasker.exceptions.AuthException;
import pl.dobos.tasker.mappers.UserMapper;
import pl.dobos.tasker.models.dtos.LoginRequest;
import pl.dobos.tasker.models.dtos.LoginResponse;
import pl.dobos.tasker.models.dtos.RegisterRequest;
import pl.dobos.tasker.models.dtos.RegisterResponse;
import pl.dobos.tasker.models.entities.User;
import pl.dobos.tasker.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class AuthService {

  private final UserRepository userRepository;
  private final TokenService tokenService;
  private final UserMapper userMapper;
  private final PasswordEncoder passwordEncoder;
  private final CookieService cookieService;

  public RegisterResponse register(RegisterRequest request) {

    final pl.dobos.tasker.models.dtos.User requestUser = request.getUser();
    Optional<User> userByEmail = userRepository.findByEmail(requestUser.getEmail());
    if (userByEmail.isPresent()) {
      throw new AuthException("Email already taken");
    }
    User mappedUser = userMapper.getUser(requestUser);
    mappedUser.setPassword(passwordEncoder.encode(mappedUser.getPassword()));
    User savedUser = userRepository.save(mappedUser);

    Cookie refreshTokenCookie = cookieService.makeRefreshTokenCookie(
        tokenService.getRefreshToken(savedUser)
    );

    return RegisterResponse.builder()
        .token(tokenService.getAccessToken(savedUser))
        .refreshTokenCookie(refreshTokenCookie)
        .build();
  }

  public LoginResponse login(LoginRequest request) {

    User userByEmail = userRepository.findByEmail(request.getEmail())
        .orElseThrow(() -> new AuthException("User not found"));

    if (!passwordEncoder.matches(request.getPassword(), userByEmail.getPassword())) {
      throw new AuthException("Wrong password");
    }

    String accessToken = tokenService.getAccessToken(userByEmail);
    String refreshToken = tokenService.getRefreshToken(userByEmail);

    Cookie refreshTokenCookie = cookieService.makeRefreshTokenCookie(refreshToken);

    return LoginResponse.builder()
        .token(accessToken)
        .refreshTokenCookie(refreshTokenCookie)
        .build();
  }
}
