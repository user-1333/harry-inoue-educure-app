package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.auth.LoginUser;
import jp.educure.attendancemanagement.dto.DetailUserProfile;
import jp.educure.attendancemanagement.mapper.UserProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UsersController {
    private final UserProfileMapper userProfileMapper;

    @PreAuthorize("hasRole(T(jp.educure.attendancemanagement.domain.role.RoleType).ADMIN)")
    @GetMapping("/all")
    public List<DetailUserProfile> getAll() {
        return userProfileMapper.findDetailUserAll();
    }
    @GetMapping("/me")
    public DetailUserProfile test(@AuthenticationPrincipal LoginUser loginUser) {
        return userProfileMapper.findDetailUserById(loginUser.getUserId());
    }
}
