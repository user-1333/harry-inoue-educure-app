package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.dto.getPermission;
import jp.educure.attendancemanagement.entity.Role;

import java.util.List;

public interface RoleMapper {
    List<Role> findAll();
    Role findById(Integer id);
    List<getPermission> findPermissionById(Integer id);
    void insert(Role role);
    void update(Role role);
    void delete(Integer id);
}
