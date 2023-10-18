package pl.dobos.tasker.services;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dobos.tasker.exceptions.AuthException;
import pl.dobos.tasker.mappers.TokenMapper;
import pl.dobos.tasker.models.dtos.RefreshTokenResponse;
import pl.dobos.tasker.models.entities.RefreshToken;
import pl.dobos.tasker.models.entities.User;
import pl.dobos.tasker.repositories.RefreshTokenRepository;
import pl.dobos.tasker.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class TokenService {

  private static final int MAX_REFRESH_TOKEN_USAGES = 2;

  private final JwtTokenUtils jwtTokenUtils;
  private final RefreshTokenRepository refreshTokenRepository;
  private final TokenMapper tokenMapper;
  private final UserRepository userRepository;

  public String getAccessToken(User tokenOwner) {
    return jwtTokenUtils.generateAccessToken(tokenOwner);
  }

  public String getRefreshToken(User tokenOwner) {

    Optional<RefreshToken> userRefreshToken = refreshTokenRepository.findByOwner(tokenOwner);
    if(userRefreshToken.isPresent() && !jwtTokenUtils.isTokenExpired(userRefreshToken.get().getValue())) {
      return userRefreshToken.get().getValue();
    }

    String refreshToken = jwtTokenUtils.generateRefreshToken(tokenOwner);
    refreshTokenRepository.save(tokenMapper.getRefreshToken(refreshToken, tokenOwner));
    return refreshToken;
  }

  public RefreshTokenResponse refreshToken(String refreshToken) {

    if (jwtTokenUtils.isTokenExpired(refreshToken)) {
      throw new AuthException("Refresh token expired");
    }

    String email = jwtTokenUtils.extractEmail(refreshToken);
    User userByEmail = userRepository.findByEmail(email)
        .orElseThrow(() -> new AuthException("No user with this refresh token"));
    RefreshToken userRefreshToken = userByEmail.getRefreshToken();

    if (userRefreshToken.getUsageCount() >= MAX_REFRESH_TOKEN_USAGES) {
      throw new AuthException("Refresh token usage count exceeded");
    }

    String token = jwtTokenUtils.generateAccessToken(userByEmail);
    userRefreshToken.setUsageCount(userRefreshToken.getUsageCount() + 1);
    refreshTokenRepository.save(userRefreshToken);

    return RefreshTokenResponse.builder().token(token).build();
  }
}
