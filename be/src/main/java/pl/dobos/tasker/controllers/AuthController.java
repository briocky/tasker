package pl.dobos.tasker.controllers;

import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.dobos.tasker.models.dtos.LoginRequest;
import pl.dobos.tasker.models.dtos.LoginResponse;
import pl.dobos.tasker.models.dtos.RefreshTokenResponse;
import pl.dobos.tasker.models.dtos.RegisterRequest;
import pl.dobos.tasker.models.dtos.RegisterResponse;
import pl.dobos.tasker.services.AuthService;
import pl.dobos.tasker.services.TokenService;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
class AuthController {

  private final AuthService authService;
  private final TokenService tokenService;

  @PostMapping("/register")
  public ResponseEntity<RegisterResponse> register(@RequestBody @Valid RegisterRequest request,
      HttpServletResponse response) {
    RegisterResponse registerResponse = authService.register(request);
    response.addCookie(registerResponse.getRefreshTokenCookie());
    return ResponseEntity
        .created(URI.create("/api/users/" + registerResponse.getUserId()))
        .body(registerResponse);
  }

  @PostMapping("/login")
  public ResponseEntity<LoginResponse> login(@RequestBody @Valid LoginRequest request,
      HttpServletResponse response) {
    LoginResponse loginResponse = authService.login(request);
    response.addCookie(loginResponse.getRefreshTokenCookie());
    return ResponseEntity.ok().body(loginResponse);
  }

  @GetMapping("/refreshToken")
  public ResponseEntity<RefreshTokenResponse> refreshToken(
      @CookieValue("refreshToken") @NotNull String refreshToken) {
    RefreshTokenResponse response = tokenService.refreshToken(refreshToken);
    return ResponseEntity.ok().body(response);
  }
}
