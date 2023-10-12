package pl.dobos.tasker.services;

import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import pl.dobos.tasker.exceptions.AuthException;
import pl.dobos.tasker.mappers.TokenMapper;
import pl.dobos.tasker.models.dtos.RefreshTokenResponse;
import pl.dobos.tasker.models.entities.AccessToken;
import pl.dobos.tasker.models.entities.RefreshToken;
import pl.dobos.tasker.models.entities.User;
import pl.dobos.tasker.repositories.AccessTokenRepository;
import pl.dobos.tasker.repositories.RefreshTokenRepository;
import pl.dobos.tasker.repositories.UserRepository;

@Service
@RequiredArgsConstructor
public class TokenService {

  private final AccessTokenRepository accessTokenRepository;
  private final JwtTokenUtils jwtTokenUtils;
  private final RefreshTokenRepository refreshTokenRepository;
  private final TokenMapper tokenMapper;
  private final UserRepository userRepository;

  public String getAccessToken(User tokenOwner) {

    Optional<AccessToken> userAccessToken = accessTokenRepository.findByOwner(tokenOwner);
    if (userAccessToken.isPresent() && !jwtTokenUtils.isTokenExpired(userAccessToken.get().getValue())) {
      return userAccessToken.get().getValue();
    }

    String token = jwtTokenUtils.generateAccessToken(tokenOwner);
    accessTokenRepository.save(tokenMapper.getAccessToken(token, tokenOwner));
    return token;
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
    String token = jwtTokenUtils.generateAccessToken(userByEmail);
    accessTokenRepository.findByOwner(userByEmail)
      .ifPresent(accessToken -> {
        userByEmail.setAccessToken(null);
        accessTokenRepository.delete(accessToken);
      });
    accessTokenRepository.save(tokenMapper.getAccessToken(token, userByEmail));

    return RefreshTokenResponse.builder().token(token).build();
  }
}
