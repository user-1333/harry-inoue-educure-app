package jp.educure.attendancemanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class authUser {
    private Integer id;
    private String name;
    private String email;
    private String password;
    private Integer roleId;
}
