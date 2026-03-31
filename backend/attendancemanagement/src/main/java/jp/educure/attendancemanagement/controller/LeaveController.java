package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.auth.LoginUser;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.ApprovedLeave;
import jp.educure.attendancemanagement.dto.RequestLeave;
import jp.educure.attendancemanagement.dto.detailLeave;
import jp.educure.attendancemanagement.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/leave")
public class LeaveController {
    @Autowired
    private LeaveService leaveService;

    @GetMapping("get/pending")
    //PENDING
    public List<detailLeave> getPending(
//            @AuthenticationPrincipal LoginUser loginUser
    ) {
        return leaveService.getLeaveApproval(1);
    }
    @GetMapping("get/approve")
    public List<detailLeave> getApproved(@AuthenticationPrincipal LoginUser loginUser) {
        return leaveService.getLeave(loginUser.getUserId());
    }



    @PostMapping("/request")
    public ApiResponse requestLeave(
            @AuthenticationPrincipal LoginUser loginUser,
            @RequestBody RequestLeave requestLeave
    ) {
        return leaveService.request(loginUser.getUserId(), requestLeave);
    }
    @PreAuthorize("hasRole(T(jp.educure.attendancemanagement.domain.role.RoleType).MANAGER)")
    @PutMapping("/approval/{targetId}")
    public ApiResponse approveLeave(
            @AuthenticationPrincipal LoginUser loginUser,
            @PathVariable Integer targetId,
            @RequestBody ApprovedLeave approvedLeave
    ) {
        approvedLeave.setLeaveId(targetId);
        approvedLeave.setApprovedBy(loginUser.getUserId());
        return leaveService.approved(loginUser.getUserId(),approvedLeave);
    }
}
