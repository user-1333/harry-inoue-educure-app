package jp.educure.attendancemanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class DetailAttendance {

    private Integer id;
    private String userName;
    private LocalDate workDate;
    private LocalDateTime clockIn;
    private LocalDateTime clockOut;
    private Boolean isLate;
    private Boolean isEarlyLeave;
    private Integer breakTimeMinutes;
    private LocalDateTime breakStart;
    private LocalDateTime breakEnd;
    private String modifiedBy;
    private LocalDateTime modifiedAt;
}
