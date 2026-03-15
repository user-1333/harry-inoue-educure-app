package jp.educure.attendancemanagement.entity;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApprovalStatus {
    private Integer id;
    private String status;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
}
