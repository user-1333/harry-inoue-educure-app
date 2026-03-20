package jp.educure.attendancemanagement.auth;

import jp.educure.attendancemanagement.dto.DetailUserProfile;
import jp.educure.attendancemanagement.entity.User;
import jp.educure.attendancemanagement.mapper.UserMapper;
import jp.educure.attendancemanagement.mapper.UserProfileMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

@Configuration
public class UserDetailsConfig {

    private final UserProfileMapper userProfileMapper;
    private final UserMapper userMapper;

    public UserDetailsConfig(UserProfileMapper userProfileMapper, UserMapper userMapper) {
        this.userProfileMapper = userProfileMapper;
        this.userMapper = userMapper;
    }

    @Bean
    public UserDetailsService userDetailsService() {

        // DaoAuthenticationProviderが呼び出すユーザー取得ロジック。
        // usernameは本アプリではemailとして扱う。
        return email -> {
            User user = userMapper.findByEmail(email);
            if (user == null) {
                throw new UsernameNotFoundException("User not found");
            }

            DetailUserProfile profile = userProfileMapper.findDetailUserById(user.getId());
            if (profile == null || profile.getRoleName() == null || profile.getRoleName().isBlank()) {
                throw new UsernameNotFoundException("User profile not found");
            }

            // DBのロール名をSpring Securityの規約(ROLE_プレフィックス)へ変換。
            // 例: ADMIN -> ROLE_ADMIN
            String roleFromDb = profile.getRoleName();
            String formattedRole = "ROLE_" + roleFromDb.trim();

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(formattedRole));

            // 戻り値のUserDetailsに「ハッシュ済みパスワード」と「権限」をセットすることで、
            // AuthenticationManager.authenticate(...) 時にパスワード照合と権限付与が行われる。
            return new LoginUser(
                    user.getId(),
                    user.getName(),
                    user.getEmail(),
                    user.getPassword(),
                    profile.getRoleName(),
                    profile.getDepartmentName(),
                    authorities
            );
        };
    }
}

