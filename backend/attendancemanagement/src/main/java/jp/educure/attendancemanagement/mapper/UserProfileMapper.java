package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.dto.DetailUserProfile;
import jp.educure.attendancemanagement.entity.UserProfile;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UserProfileMapper {
    List<UserProfile> findAll();
    UserProfile findProfileIdByUserId(Integer userId);
    DetailUserProfile findDetailUserById(Integer id);
    List<DetailUserProfile> findDetailUserAll();
    void insert(Integer userId, Integer roleId, Integer departmentId);
    void update(
            @Param("userId") Integer userId,
            @Param("roleId") Integer roleId,
            @Param("departmentId") Integer departmentId
    );
    void delete(Integer userId);
}
