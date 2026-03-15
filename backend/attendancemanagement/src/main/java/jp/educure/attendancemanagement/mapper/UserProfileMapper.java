package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.UserProfile;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserProfileMapper {
    List<UserProfile> findAll();
    UserProfileMapper findProfileIdByUserId(Integer userId);
    void insert(UserProfile userProfile);
    void update(UserProfile userProfile);
    void delete(Integer userId);
}
