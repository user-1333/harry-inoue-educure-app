package jp.educure.attendancemanagement.mapper;

import jp.educure.attendancemanagement.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    List<User> findAll();
    User findById(Integer id);
    User findByEmail(String email);
    void insert(User user);
    void update(User user);
    void delete(Integer id);
}
