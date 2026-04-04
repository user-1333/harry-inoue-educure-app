package jp.educure.attendancemanagement.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceUpdateRequest {
    @NotNull(message = "勤務日は必須です")
    private LocalDate workDate;

    @NotNull(message = "出勤時刻は必須です")
    private LocalDateTime clockIn;

    private LocalDateTime breakStart;
    private LocalDateTime breakEnd;

    @NotNull(message = "退勤時刻は必須です")
    private LocalDateTime clockOut;

    private Boolean isLate;
    private Boolean isEarlyLeave;
}
