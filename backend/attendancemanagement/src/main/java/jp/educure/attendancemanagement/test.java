package jp.educure.attendancemanagement;

import jp.educure.attendancemanagement.entity.User;
import jp.educure.attendancemanagement.mapper.UserMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class test {

    private final UserMapper userMapper;

    public test(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    @GetMapping("/")
    public List<User> aaa() {
        return userMapper.findAll();
    }
}