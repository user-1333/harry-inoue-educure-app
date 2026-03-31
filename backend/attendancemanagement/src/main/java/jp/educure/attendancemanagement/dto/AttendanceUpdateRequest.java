package jp.educure.attendancemanagement.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceUpdateRequest {
    private LocalDate workDate;
    private LocalDateTime clockIn;
    private LocalDateTime breakStart;
    private LocalDateTime breakEnd;
    private LocalDateTime clockOut;
    private Boolean isLate;
    private Boolean isEarlyLeave;
}
