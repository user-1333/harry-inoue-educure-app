package jp.educure.attendancemanagement.service;

import jp.educure.attendancemanagement.entity.User;
import jp.educure.attendancemanagement.mapper.UserMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public record LoginRequest(
            String email,
            String password
    ) {}
    public record LoginResponse(
            String token
    ) {}
    public record SignupRequest(
            String name,
            String email,
            String password
    ) {}

    public AuthService(UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager)
    {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    public LoginResponse login(LoginRequest request) {
        // 認証はAuthenticationManagerへ委譲する。
        // これによりDaoAuthenticationProvider -> UserDetailsServiceの標準フローが実行される。
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.email(), request.password())
            );
        } catch (AuthenticationException e) {
            // 認証失敗の詳細理由は返さず、固定文言で401を返す。
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,HttpStatus.UNAUTHORIZED.getReasonPhrase());
        }

        // トークン生成のためにアプリ独自Userエンティティを再取得する。
        // (authenticateの戻り値principalを使う実装にも変更可能だが、ここでは既存形を維持)
        User user = userMapper.findByEmail(request.email());
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, HttpStatus.UNAUTHORIZED.getReasonPhrase());
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(token);
    }

    public void signup(SignupRequest request) {

        // 保存前に平文パスワードを必ずハッシュ化する。
        String hashedPassword = passwordEncoder.encode(request.password());
        userMapper.insert(request.name(), request.email(),hashedPassword);
    }
}
