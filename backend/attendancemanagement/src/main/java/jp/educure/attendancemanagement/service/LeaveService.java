package jp.educure.attendancemanagement.service;

import jp.educure.attendancemanagement.domain.leave.ApprovalStatus;
import jp.educure.attendancemanagement.dto.ApprovedLeave;
import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.RequestLeave;
import jp.educure.attendancemanagement.mapper.LeaveMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class LeaveService {
    private final LeaveMapper leaveMapper;

    public ApiResponse request(Integer userId, RequestLeave requestLeave) {
        System.out.println("ユーザーID: " + userId);
        System.out.println("休暇申請内容: " + requestLeave.toString());
        if (requestLeave.getStartDate() == null || requestLeave.getEndDate() == null) {
            return new ApiResponse(1, "休暇の開始日と終了日は必須です。");
        }
        if (requestLeave.getStartDate().isAfter(requestLeave.getEndDate())) {
            return new ApiResponse(1, "休暇の開始日は終了日以前でなければなりません。");
        }
        if (requestLeave.getLeaveTypeId() == null
                || requestLeave.getReason() == null
                || requestLeave.getReason().isBlank()) {
            return new ApiResponse(1, "休暇の種類と理由は必須です。");
        }
        leaveMapper.insert(
                userId,
                requestLeave.getLeaveTypeId(),
                ApprovalStatus.PENDING.getId(),
                requestLeave.getStartDate(),
                requestLeave.getEndDate(),
                requestLeave.getReason()
        );
        return new ApiResponse(0, "休暇申請が完了しました。");
    }
    public ApiResponse approved(Integer userId, ApprovedLeave approvedLeave) {
        if (approvedLeave.getApprovalStatusId() == null) {
            return new ApiResponse(1, "休暇IDと承認ステータスは必須です。");
        }
        if (approvedLeave.getApprovalStatusId() != ApprovalStatus.APPROVED.getId()
                && approvedLeave.getApprovalStatusId() != ApprovalStatus.REJECTED.getId()) {
            return new ApiResponse(1, "承認ステータスは approved または rejected でなければなりません。");
        }
        leaveMapper.update(
                approvedLeave.getLeaveId(),
                LocalDateTime.now(),
                approvedLeave.getApprovedBy(),
                approvedLeave.getApprovalStatusId()
        );
        String statusLabel = approvedLeave.getApprovalStatusId() == ApprovalStatus.APPROVED.getId() ? "承認" : "拒否";
        return new ApiResponse(0, "休暇申請が" + statusLabel + "されました。");
    }
}
