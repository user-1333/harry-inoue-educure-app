package jp.educure.attendancemanagement.service;

import jp.educure.attendancemanagement.dto.authUser;
import jp.educure.attendancemanagement.entity.User;
import jp.educure.attendancemanagement.mapper.UserMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

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
                       JwtService jwtService) {

        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public LoginResponse login(LoginRequest request) {

        User user = userMapper.findByEmail(request.email());

        if (user == null ||
                !passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtService.generateToken(user);

        return new LoginResponse(token);
    }

    public void signup(SignupRequest request) {

        String hashedPassword = passwordEncoder.encode(request.password());

        userMapper.insert(request.name(), request.email(), hashedPassword);
    }
}
