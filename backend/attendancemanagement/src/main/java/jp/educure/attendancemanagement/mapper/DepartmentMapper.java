package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.Department;

import java.util.List;

public interface DepartmentMapper {
    List<Department> findAll();
    Department findById(Integer id);
    void insert(String name);
    void update(Department department);
    void delete(Integer id);
}
