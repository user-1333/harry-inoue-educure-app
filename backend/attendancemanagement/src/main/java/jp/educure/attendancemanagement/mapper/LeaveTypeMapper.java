package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.LeaveType;

import java.util.List;

public interface LeaveTypeMapper {
    List<LeaveType> findAll();
    LeaveType findById(Integer id);
    void insert(LeaveType leaveType);
    void update(LeaveType leaveType);
    void delete(Integer id);
}
