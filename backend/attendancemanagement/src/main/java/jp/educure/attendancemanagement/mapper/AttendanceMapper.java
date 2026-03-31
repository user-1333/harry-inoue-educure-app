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
    List<DetailAttendance> findUserById(Integer userId);
    Attendance findById(Integer id);
    List<Attendance> findByWorkDate(
            @Param("userId")   Integer userId,
            @Param("workDate") LocalDate workDate
    );
    void insert(
            @Param("userId")       Integer userId,
            @Param("workDate")     LocalDate workDate,
            @Param("clockIn")  LocalDateTime clockIn,
            @Param("clockOut") LocalDateTime clockOut,
            @Param("isLate")     Boolean isLate,
            @Param("modifiedBy")   Integer modifiedBy,
            @Param("modifiedAt")   LocalDateTime modifiedAt
    );
    void update(
            @Param("id")         Integer id, // WHERE句の条件
            @Param("userId")       Integer userId,
            @Param("workDate")     LocalDate workDate,
            @Param("clockIn")  LocalDateTime clockIn,
            @Param("clockOut") LocalDateTime clockOut,
            @Param("isLate") Boolean isLate,
            @Param("isEarlyLeave") Boolean isEarlyLeave,
            @Param("breakStart") LocalDateTime breakStart,
            @Param("breakEnd") LocalDateTime breakEnd,
            @Param("modifiedBy")   Integer modifiedBy,
            @Param("modifiedAt")   LocalDateTime modifiedAt
    );
    void breakTimeUpdate(
            @Param("userId")       Integer userId,
            @Param("workDate")     LocalDate workDate,
            @Param("breakStart") LocalDateTime breakStart,
            @Param("breakEnd")   LocalDateTime breakEnd
    );
}
