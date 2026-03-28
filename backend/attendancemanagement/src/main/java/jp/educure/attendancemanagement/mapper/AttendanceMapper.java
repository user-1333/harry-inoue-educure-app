package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.dto.DetailAttendance;
import jp.educure.attendancemanagement.entity.Attendance;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@Mapper
public interface AttendanceMapper {
    List<DetailAttendance> findAll();
    Attendance findById(Integer id);
    List<DetailAttendance> findUserById(Integer userId);
    List<Attendance> findByWorkDate(
            @Param("userId")   Integer userId,
            @Param("workDate") LocalDate workDate
    );
    void insert(
            @Param("userId")       Integer userId,
            @Param("workDate")     LocalDate workDate,
            @Param("clockIn")  LocalDateTime clockIn,
            @Param("clockOut") LocalDateTime clockOut,
            @Param("modifiedBy")   Integer modifiedBy,
            @Param("modifiedAt")   LocalDateTime modifiedAt
    );
    void update(
            @Param("userId")       Integer userId,
            @Param("workDate")     LocalDate workDate,
            @Param("clockIn")  LocalDateTime clockIn,
            @Param("clockOut") LocalDateTime clockOut,
            @Param("modifiedBy")   Integer modifiedBy,
            @Param("modifiedAt")   LocalDateTime modifiedAt
    );
    void delete(Integer id);
}
