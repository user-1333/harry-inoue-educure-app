package jp.educure.attendancemanagement.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class User {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private Integer roleId;
    private Integer departmentId;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
