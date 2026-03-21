package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.auth.LoginUser;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.ApprovedLeave;
import jp.educure.attendancemanagement.dto.RequestLeave;
import jp.educure.attendancemanagement.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/leave")
public class LeaveController {
    @Autowired
    private LeaveService leaveService;

    @PostMapping("/request")
    public ApiResponse requestLeave(
            @AuthenticationPrincipal LoginUser loginUser,
            @RequestBody RequestLeave requestLeave
    ) {
        return leaveService.request(loginUser.getUserId(), requestLeave);
    }
    @PutMapping("/approval/{targetId}")
    public ApiResponse approveLeave(
            @AuthenticationPrincipal LoginUser loginUser,
            @PathVariable Integer targetId,
            @RequestBody ApprovedLeave approvedLeave
    ) {
        approvedLeave.setLeaveId(targetId);
        return leaveService.approved(loginUser.getUserId(),approvedLeave);
    }
}
