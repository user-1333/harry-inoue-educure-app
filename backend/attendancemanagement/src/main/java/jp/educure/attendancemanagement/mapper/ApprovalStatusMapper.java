package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.ApprovalStatus;

import java.util.List;

public interface ApprovalStatusMapper {
    List<ApprovalStatus> findAll();
    ApprovalStatus findById(Integer id);
    void insert(String status);
    void update(ApprovalStatus approvalStatus);
    void delete(Integer id);
}
