package jp.educure.attendancemanagement.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class ApprovalStatus {
    private Integer id;
    private String status;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
