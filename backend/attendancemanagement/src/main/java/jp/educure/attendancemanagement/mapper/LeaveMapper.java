package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.Leave;

import java.util.List;

public interface LeaveMapper {
    List<Leave> findAll();
    List<Leave> findUserById(Integer userId);
    void insert(Leave leave);
    void update(Leave leave);
    void delete(Integer id);

}
