package jp.educure.attendancemanagement.controller;

import jp.educure.attendancemanagement.dto.DetailUserProfile;
import jp.educure.attendancemanagement.mapper.UserProfileMapper;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@PreAuthorize("hasRole('Employee')")
@RestController
@RequestMapping("/users")
public class UsersController {
    private final UserProfileMapper userProfileMapper;
    UsersController(UserProfileMapper userProfileMapper) {
        this.userProfileMapper = userProfileMapper;
    }
    @GetMapping("/all")
    public List<DetailUserProfile> getAll() {
        return userProfileMapper.findDetailUserAll();
    }
    @GetMapping("/{id}")
    public DetailUserProfile getUserById(@PathVariable Integer id) {
        return userProfileMapper.findDetailUserById(id);
    }
}
