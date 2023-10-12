package pl.dobos.tasker.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import pl.dobos.tasker.filters.JwtTokenFilter;
import pl.dobos.tasker.repositories.UserRepository;
import pl.dobos.tasker.services.DbUserDetailsService;
import pl.dobos.tasker.services.JwtTokenUtils;

@Configuration
public class SecurityConfig {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http, JwtTokenFilter jwtTokenFilter) throws Exception {

    http.csrf(AbstractHttpConfigurer::disable).cors(Customizer.withDefaults());

    http.authorizeHttpRequests(authorize -> authorize
        .requestMatchers("/api/auth/**").permitAll());

    http.formLogin(Customizer.withDefaults()).httpBasic(Customizer.withDefaults());

    http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

    http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public UserDetailsService userDetailsService(UserRepository userRepository) {
    return new DbUserDetailsService(userRepository);
  }

  @Bean
  public JwtTokenFilter jwtTokenFilter(JwtTokenUtils jwtTokenUtils, UserDetailsService userDetailsService) {
    return new JwtTokenFilter(jwtTokenUtils, userDetailsService);
  }
}
