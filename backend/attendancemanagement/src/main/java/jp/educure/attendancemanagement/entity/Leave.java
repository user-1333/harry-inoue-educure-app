package jp.educure.attendancemanagement.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class Leave {
    private Integer id;
    private Integer userId;
    private Integer leaveTypeId;
    private Integer approvalStatusId;
    private String startDate;
    private String endDate;
    private Integer approvedBy;
    private LocalDateTime approvedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
