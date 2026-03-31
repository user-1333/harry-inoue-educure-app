package jp.educure.attendancemanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@NoArgsConstructor
@Data
public class BreakeTimeAttendance {
    private  Integer attendanceId; // WHEREの条件に必須
    private LocalDateTime startDate;
    private LocalDateTime endDate;
}
