package jp.educure.attendancemanagement.service;

import jakarta.validation.constraints.*;
import jp.educure.attendancemanagement.domain.role.RoleType;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.entity.User;
import jp.educure.attendancemanagement.mapper.UserMapper;
import jp.educure.attendancemanagement.mapper.UserProfileMapper;
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
    private final UserProfileMapper userProfileMapper;

    public record LoginRequest(
            @NotBlank(message = "メールアドレスは必須です")
            @Email(message = "有効なメールアドレスを入力してください")
            String email,
            @NotBlank(message = "パスワードは必須です")
            String password
    ) {}
    public record LoginResponse(
            String token
    ) {}
    public record SignupRequest(
            @NotBlank(message = "名前は必須です")
            @Size(min = 1, max = 100, message = "名前は1～100文字で入力してください")
            String name,
            @NotBlank(message = "メールアドレスは必須です")
            @Email(message = "有効なメールアドレスを入力してください")
            String email,
            @NotBlank(message = "パスワードは必須です")
            @Size(min = 5, message = "パスワードは5字以上である必要があります")
            String password
    ) {}
    public record RoleRequest(
            @NotNull(message = "ユーザーIDは必須です")
            @Positive(message = "ユーザーIDは正の整数である必要があります")
            Integer userId,
            @NotNull(message = "ロールIDは必須です")
            @Positive(message = "ロールIDは正の整数である必要があります")
            Integer roleId
    ) {}

    public AuthService(UserMapper userMapper,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService,
                       AuthenticationManager authenticationManager, UserProfileMapper userProfileMapper)
    {
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
        this.userProfileMapper = userProfileMapper;
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

    public LoginResponse signup(SignupRequest request) {

        // 既存ユーザーのチェック
        User existingUser = userMapper.findByEmail(request.email());
        if (existingUser != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "このメールアドレスは既に登録されています");
        }

        // 保存前に平文パスワードを必ずハッシュ化する。
        String hashedPassword = passwordEncoder.encode(request.password());
        userMapper.insert(request.name(), request.email(),hashedPassword);
        
        User newUser = userMapper.findByEmail(request.email());
        if (newUser == null) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "ユーザー登録に失敗しました");
        }
        Integer EMPLOYEE = 1;
        userProfileMapper.insert(newUser.getId(), EMPLOYEE , null);
        
        // ログイン処理を実行して token を返す
        return login(new LoginRequest(request.email(), request.password()));
    }
    //
    public ApiResponse changeRole(RoleRequest request) {
        userProfileMapper.update(request.userId,request.roleId,null);
        return new ApiResponse(0, "ユーザーのロールが変更されました。");
    }
}
