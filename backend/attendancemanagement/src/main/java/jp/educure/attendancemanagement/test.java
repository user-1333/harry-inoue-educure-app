package jp.educure.attendancemanagement;

import jp.educure.attendancemanagement.dto.getPermission;
import jp.educure.attendancemanagement.entity.User;
import jp.educure.attendancemanagement.mapper.RoleMapper;
import jp.educure.attendancemanagement.mapper.UserMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class test {

    private final RoleMapper roleMapper;

    public test(RoleMapper roleMapper) {
        this.roleMapper = roleMapper;
    }

    @GetMapping("/")
    public List<getPermission> aaa() {
        return roleMapper.findPermissionById(1);
    }
}