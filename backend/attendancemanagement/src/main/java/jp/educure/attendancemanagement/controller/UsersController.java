package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.auth.LoginUser;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.DetailUserProfile;
import jp.educure.attendancemanagement.mapper.AttendanceMapper;
import jp.educure.attendancemanagement.mapper.UserProfileMapper;
import jp.educure.attendancemanagement.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/user")
public class UsersController {
    private final UserProfileMapper userProfileMapper;
    private final AttendanceMapper attendanceMapper;
    @Autowired
    private AttendanceService attendanceService;

    @GetMapping("/all")
    public List<DetailUserProfile> getAll() {
        return userProfileMapper.findDetailUserAll();
    }
    @GetMapping("/{id}")
    public DetailUserProfile getUserById(@PathVariable Integer id) {
        return userProfileMapper.findDetailUserById(id);
    }
    @GetMapping("/test")
    public String test(@AuthenticationPrincipal LoginUser loginUser) {
        return loginUser.getUsername();
    }
    @PostMapping("/clock-in")
    public ApiResponse clockIn(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.clockIn(loginUser.getUserId());
    }
    @PostMapping("/clock-out")
    public ApiResponse clockOut(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.clockOut(loginUser.getUserId());
    }
    /**
     * 休暇申請
     * 休暇承認
     * 勤怠修正
     * をここにかくべき？
     */
    
}
