package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.RolePermission;

import java.util.List;

public interface RolePermissionMapper {
    List<RolePermission> findAll();
    RolePermission findById(Integer id);
    List<RolePermission> findByRoleId(Integer roleId);
    void insert(RolePermission rolePermission);
    void update(RolePermission rolePermission);
    void delete(Integer id);
}
