package jp.educure.attendancemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ApprovedLeave {
    private Integer leaveId;
    private Integer approvedBy;
    private Integer approvalStatusId;
}
