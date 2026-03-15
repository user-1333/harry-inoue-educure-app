package jp.educure.attendancemanagement.mapper;

import org.apache.ibatis.annotations.Mapper;


@Mapper
public interface RolePermissionMapper {

    void insert(Integer roleId, Integer permissionId);
    void deleteByRoleId(Integer roleId);
}
