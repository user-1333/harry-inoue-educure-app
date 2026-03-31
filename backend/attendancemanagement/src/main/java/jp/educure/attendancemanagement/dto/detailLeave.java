package jp.educure.attendancemanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class detailLeave {
    private Integer id;
    private String userName;
    private String leaveTypeName;
    private String approvalStatus;
    private LocalDate startDate;
    private LocalDate endDate;
    private String reason;
    private LocalDate approvedAt;
    private String approvedBy;
}
