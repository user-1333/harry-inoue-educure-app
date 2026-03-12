package jp.educure.attendancemanagement.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class RolePermission {
    private Integer roleId;
    private Integer permissionId;
}
