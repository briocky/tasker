package pl.dobos.tasker.services;

import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CookieService {

  @Value("${cookie.domain}")
  private String domain;

  @Value("${cookie.max-age}")
  private int maxAge;

  public Cookie makeRefreshTokenCookie(String value) {
    final String cookieName = "refreshToken";
    final String cookieUrl = "/api/auth/refreshToken";
    Cookie cookie = new Cookie(cookieName, value);
    cookie.setHttpOnly(true);
    cookie.setDomain(domain);
    cookie.setPath(cookieUrl);
    cookie.setMaxAge(maxAge);
    return cookie;
  }
}
