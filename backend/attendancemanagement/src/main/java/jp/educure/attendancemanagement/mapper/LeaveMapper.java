package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.dto.detailLeave;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface LeaveMapper {
    List<detailLeave> finddetailLeaveById(Integer userId);
    List<detailLeave> finddetailLeaveApproval(Integer approvalStatusId);
    void insert(
            @Param("userId") Integer userId,
            @Param("leaveTypeId") Integer leaveTypeId,
            @Param("approvalStatusId")  Integer approvalStatusId,
            @Param("startDate") LocalDateTime startDate,
            @Param("endDate") LocalDateTime endDate,
            @Param("reason") String reason
    );
    void update(
            @Param("id")  Integer id,
            @Param("approvedAt")LocalDateTime approvedAt,
            @Param("approvedBy")Integer approvedBy,
            @Param("approvalStatusId")Integer approvalStatusId
            );
}
