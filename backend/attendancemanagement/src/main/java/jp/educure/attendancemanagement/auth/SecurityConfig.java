package jp.educure.attendancemanagement.auth;

import jp.educure.attendancemanagement.component.JwtAuthFilter;
import jp.educure.attendancemanagement.entity.User;
import jp.educure.attendancemanagement.mapper.UserMapper;
import jp.educure.attendancemanagement.mapper.UserProfileMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserProfileMapper userProfileMapper;
    private final UserMapper userMapper;
    public SecurityConfig(JwtAuthFilter jwtAuthFilter, UserProfileMapper userProfileMapper,UserMapper userMapper) {
        this.userProfileMapper = userProfileMapper;
        this.userMapper = userMapper;
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // APIなのでCSRF不要
                .csrf(csrf -> csrf.disable())

                // Sessionを使わない
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 認可設定
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .anyRequest().authenticated()
                )

                // JWT filter
                .addFilterBefore(jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService() {

        return email -> {
            System.out.println("=== userDetailsService called for email: " + email + " ===");
            
            try {
                User user = userMapper.findByEmail(email);
                if (user == null) {
                    System.err.println("User not found for email: " + email);
                    throw new UsernameNotFoundException("User not found with email: " + email);
                }

                System.out.println("User found: ID=" + user.getId() + ", Email=" + user.getEmail());

                var userProfile = userProfileMapper.findDetailUserById(user.getId());
                if (userProfile == null) {
                    System.err.println("User profile not found for user ID: " + user.getId());
                    throw new UsernameNotFoundException("User profile not found for user ID: " + user.getId());
                }

                String roleFromDb = userProfile.getRoleName();
                if (roleFromDb == null || roleFromDb.trim().isEmpty()) {
                    System.err.println("Role is null or empty for user ID: " + user.getId());
                    throw new UsernameNotFoundException("Role not found for user ID: " + user.getId());
                }

                String formattedRole = "ROLE_" + roleFromDb.trim();
                System.out.println("--- UserDetailsService Debug ---");
                System.out.println("Email: [" + email + "]");
                System.out.println("User ID: [" + user.getId() + "]");
                System.out.println("Raw Role from DB: [" + roleFromDb + "]");
                System.out.println("Formatted Authority: [" + formattedRole + "]");

                List<GrantedAuthority> authorities = new ArrayList<>();
                authorities.add(new SimpleGrantedAuthority(formattedRole));

                return new org.springframework.security.core.userdetails.User(
                        user.getEmail(),
                        user.getPassword(),
                        authorities
                );
            } catch (UsernameNotFoundException e) {
                System.err.println("UsernameNotFoundException: " + e.getMessage());
                throw e;
            } catch (Exception e) {
                System.err.println("Unexpected exception in userDetailsService for email [" + email + "]: " + e.getClass().getName() + " - " + e.getMessage());
                e.printStackTrace();
                throw new UsernameNotFoundException("Authentication failed: " + e.getMessage(), e);
            }
        };
    }
}