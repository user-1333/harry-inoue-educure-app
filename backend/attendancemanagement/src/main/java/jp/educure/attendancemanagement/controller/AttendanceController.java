package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.auth.LoginUser;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.AttendanceUpdateRequest;
import jp.educure.attendancemanagement.entity.Attendance;
import jp.educure.attendancemanagement.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;

    @PostMapping("/clock-in")
    public ApiResponse clockIn(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.clockIn(loginUser.getUserId());
    }

    @PostMapping("/clock-out")
    public ApiResponse clockOut(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.clockOut(loginUser.getUserId());
    }

    @PreAuthorize("hasRole(T(jp.educure.attendancemanagement.domain.role.RoleType).MANAGER)")
    @PutMapping("/update/{targetUserId}")
    public ApiResponse updateAttendance(
            @AuthenticationPrincipal LoginUser loginUser,
            @PathVariable Integer targetUserId,
            @RequestBody AttendanceUpdateRequest request) {
        Attendance attendance = new Attendance();
        attendance.setUserId(targetUserId);
        attendance.setWorkDate(request.getWorkDate());
        attendance.setClockIn(request.getClockIn());
        attendance.setClockOut(request.getClockOut());
        return attendanceService.updateAttendance(loginUser.getUserId(), attendance);
    }
}
