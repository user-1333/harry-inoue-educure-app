package jp.educure.attendancemanagement.dto;

import jp.educure.attendancemanagement.entity.Department;
import jp.educure.attendancemanagement.entity.Role;
import jp.educure.attendancemanagement.entity.UserProfile;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class DetailUserProfile {
    private Integer userId;
    private String  userName;
    private String  email;
    private String  roleName;
    private String  departmentName;
}
