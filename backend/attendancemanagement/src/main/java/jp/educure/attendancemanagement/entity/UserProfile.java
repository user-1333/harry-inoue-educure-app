package jp.educure.attendancemanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserProfile {
    private Integer userId;
    private Integer roleId;
    private Integer departmentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
