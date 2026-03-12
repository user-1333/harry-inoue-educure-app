package jp.educure.attendancemanagement.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@NoArgsConstructor
@Data
public class Attendance {
    private Integer id;
    private Integer userId;
    private Date workDate;
    private LocalDateTime clockIn;
    private LocalDateTime clockOut;
    private Integer modifiedBy;
    private LocalDateTime modifiedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
