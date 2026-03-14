package jp.educure.attendancemanagement.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class getPermission {
    private String roleName;
    private Integer permissionId;
    private String permissionName;
}
