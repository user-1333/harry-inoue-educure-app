package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.Permission;

import java.util.List;

public interface PermissionMapper {
    List<Permission> findAll();
    Permission findById(Integer id);
    void insert(Permission permission);
    void update(Permission permission);
    void delete(Integer id);
}
