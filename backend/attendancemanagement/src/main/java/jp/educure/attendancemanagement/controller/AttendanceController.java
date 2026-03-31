package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.auth.LoginUser;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.AttendanceUpdateRequest;
import jp.educure.attendancemanagement.dto.DetailAttendance;
import jp.educure.attendancemanagement.entity.Attendance;
import jp.educure.attendancemanagement.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/attendance")
public class AttendanceController {
    private final AttendanceService attendanceService;

    @GetMapping("/get/all")
    public List<DetailAttendance> getAll() {
        return attendanceService.getAttendanceAll();
    }

    @GetMapping("get/user")
    public List<DetailAttendance> getAttendanceByUserId(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.getAttendanceByUserId(loginUser.getUserId());
    }


    @GetMapping("get/user/work-date")
    public List<Attendance> getAttendanceByWorkDate(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.getAttendanceByWorkDate(loginUser.getUserId());
    }

    @PostMapping("/clock-in")
    public ApiResponse clockIn(@AuthenticationPrincipal LoginUser loginUser,@RequestParam(defaultValue = "false") boolean isLate) {
        return attendanceService.clockIn(loginUser.getUserId(),isLate);
    }
    @PostMapping("/clock-in/late")
    public ApiResponse clockInLate(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.clockIn(loginUser.getUserId(),true);
    }

    @PostMapping("/break-in")
    public ApiResponse breakIn(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.breakIn(loginUser.getUserId());
    }
    @PostMapping("/break-out")
    public ApiResponse breakOut(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.breakOut(loginUser.getUserId());
    }

    @PostMapping("/clock-out")
    public ApiResponse clockOut(@AuthenticationPrincipal LoginUser loginUser, @RequestParam(defaultValue = "false") boolean isEarlyLeave) {
        return attendanceService.clockOut(loginUser.getUserId(),isEarlyLeave);
    }
    @PostMapping("/clock-out/early")
    public ApiResponse clockOutEarly(@AuthenticationPrincipal LoginUser loginUser) {
        return attendanceService.clockOut(loginUser.getUserId(),true);
    }

    @PreAuthorize("hasRole(T(jp.educure.attendancemanagement.domain.role.RoleType).MANAGER)")
    @PutMapping("/update/{attendanceId}")
    public ApiResponse updateAttendance(
            @AuthenticationPrincipal LoginUser loginUser,
            @PathVariable Integer attendanceId,
            @RequestBody AttendanceUpdateRequest request) {
        Attendance attendance = new Attendance();
        attendance.setId(attendanceId);
        attendance.setWorkDate(request.getWorkDate());
        attendance.setClockIn(request.getClockIn());
        attendance.setBreakStart(request.getBreakStart());
        attendance.setBreakEnd(request.getBreakEnd());
        attendance.setClockOut(request.getClockOut());
        attendance.setIsLate(request.getIsLate());
        attendance.setIsEarlyLeave(request.getIsEarlyLeave());
        return attendanceService.updateAttendance(loginUser.getUserId(), attendance);
    }
}
