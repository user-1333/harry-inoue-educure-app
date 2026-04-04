package jp.educure.attendancemanagement.controller;

import jakarta.validation.Valid;
import jp.educure.attendancemanagement.auth.LoginUser;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.service.AuthService;
import lombok.Builder;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthService.LoginResponse login(@Valid @RequestBody AuthService.LoginRequest request) {
        return authService.login(request);
    }

    @PostMapping("/signup")
    public AuthService.LoginResponse signup(@Valid @RequestBody AuthService.SignupRequest request) {
        return authService.signup(request);
    }
    @PreAuthorize("hasRole(T(jp.educure.attendancemanagement.domain.role.RoleType).ADMIN)")
    @PutMapping("/change/role")
    public ApiResponse changeRole(@Valid @RequestBody AuthService.RoleRequest request) {
        return authService.changeRole(request);
    }
}
