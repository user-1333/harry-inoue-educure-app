package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.Attendance;

import java.util.List;

public interface AttendanceMapper {
    List<Attendance> findAll();
    List<Attendance> findUserById(Integer userId);
    void insert(Attendance attendance);
    void update(Attendance attendance);
    void delete(Integer id);
}
