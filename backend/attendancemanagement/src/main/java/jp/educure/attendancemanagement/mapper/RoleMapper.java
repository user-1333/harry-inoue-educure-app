package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.Role;

import java.util.List;

public interface RoleMapper {
    List<Role> findAll();
    Role findById(Integer id);
    void insert(Role role);
    void update(Role role);
    void delete(Integer id);
}
