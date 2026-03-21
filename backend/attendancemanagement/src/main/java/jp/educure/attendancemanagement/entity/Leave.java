package jp.educure.attendancemanagement.entity;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Leave {
    private Integer id;
    private Integer userId;
    private Integer leaveTypeId;
    private Integer approvalStatusId;
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer approvedBy;
    private LocalDateTime approvedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private String reason;
}
