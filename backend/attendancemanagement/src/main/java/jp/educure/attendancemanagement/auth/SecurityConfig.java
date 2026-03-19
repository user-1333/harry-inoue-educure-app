package jp.educure.attendancemanagement.auth;

import jp.educure.attendancemanagement.component.JwtAuthFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;

    // SecurityConfig自体は定義クラスだが、依存するフィルタはDIで受ける。
    // ここで受けたjwtAuthFilterをfilterChainに組み込むことで、JWT認証を有効化する。
    public SecurityConfig(JwtAuthFilter jwtAuthFilter) {
        this.jwtAuthFilter = jwtAuthFilter;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                // このアプリはCookieセッション前提ではなくJWT前提なので、CSRF保護は無効化する。
                // 逆にフォームログインへ戻す場合は再度有効化検討が必要。
                .csrf(csrf -> csrf.disable())

                // 認証状態は毎リクエストのJWTで復元するため、サーバー側セッションは作らない。
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 認可境界:
                // - /auth/** はログイン/サインアップ用なので未認証アクセスを許可
                // - それ以外はすべて認証必須
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()
                        .anyRequest().authenticated()
                )

                // JWTフィルタはUsernamePasswordAuthenticationFilterより前に実行する。
                // 先にSecurityContextを構築しておくことで、後続の認可判定で認証済みとして扱える。
                .addFilterBefore(jwtAuthFilter,
                        UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // パスワード保存時はハッシュ化が必須。BCryptはソルト込みで推奨される方式。
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        // Springが組み立てたAuthenticationManagerを公開し、
        // AuthServiceから authenticate(...) を呼べるようにする。
        return configuration.getAuthenticationManager();
    }
}