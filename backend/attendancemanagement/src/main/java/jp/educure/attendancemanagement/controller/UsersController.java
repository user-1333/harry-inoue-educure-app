package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.auth.LoginUser;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.DetailUserProfile;
import jp.educure.attendancemanagement.mapper.UserProfileMapper;
import jp.educure.attendancemanagement.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UsersController {
    private final UserProfileMapper userProfileMapper;

    @GetMapping("/all")
    public List<DetailUserProfile> getAll() {
        return userProfileMapper.findDetailUserAll();
    }
    @GetMapping("/{id}")
    public DetailUserProfile getUserById(@PathVariable Integer id) {
        return userProfileMapper.findDetailUserById(id);
    }
    @GetMapping("/me")
    public DetailUserProfile test(@AuthenticationPrincipal LoginUser loginUser) {
        return userProfileMapper.findDetailUserById(loginUser.getUserId());
    }
}
