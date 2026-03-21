package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.dto.detailLeave;
import jp.educure.attendancemanagement.entity.Leave;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface LeaveMapper {
    List<Leave> findAll();
    List<Leave> findUserById(Integer userId);
    Leave findById(Integer id);
    detailLeave finddetailUserById(Integer userId);
    void insert(
            @Param("userId") Integer userId,
            @Param("leaveTypeId") Integer leaveTypeId,
            @Param("approvalStatusId")  Integer approvalStatusId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("reason") String reason
    );
    void update(
            @Param("id")  Integer id, // WHERE句の条件
            @Param("approvedAt")LocalDateTime approvedAt,
            @Param("approvedBy")Integer approvedBy,
            @Param("approvalStatusId")Integer approvalStatusId
            );
    void delete(Integer id);

}
