package jp.educure.attendancemanagement.entity;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RolePermission {
    private Integer roleId;
    private Integer permissionId;
}
