package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.entity.User;
import jp.educure.attendancemanagement.mapper.UserMapper;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UsersController {
    private final UserMapper userMapper;
    UsersController(UserMapper userMapper) {
        this.userMapper = userMapper;
    }
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Integer id) {
        return userMapper.findById(id);
    }
}
