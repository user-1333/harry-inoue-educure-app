//package jp.educure.attendancemanagement;
//
//import jp.educure.attendancemanagement.dto.authUser;
//import jp.educure.attendancemanagement.dto.getPermission;
//import jp.educure.attendancemanagement.entity.User;
//import jp.educure.attendancemanagement.mapper.RoleMapper;
//import jp.educure.attendancemanagement.mapper.UserMapper;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//public class test {
//    private final UserMapper userMapper;
//    test(UserMapper userMapper) {
//        this.userMapper = userMapper;
//    }
//    @GetMapping("/")
//    public authUser aaa() {
//        return userMapper.findAuthUserByEmail("admin@company.com");
//    }
//}