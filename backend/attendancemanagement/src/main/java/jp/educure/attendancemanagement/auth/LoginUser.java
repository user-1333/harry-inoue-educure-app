package jp.educure.attendancemanagement.auth;

import lombok.Getter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class LoginUser implements UserDetails {

    @Getter
    private final Integer userId;
    private final String name;
    private final String email;
    private final String password;
    private final String roleName;
    private final String departmentName;
    private final List<? extends GrantedAuthority> authorities;

    public LoginUser(
            Integer userId,
            String name,
            String email,
            String password,
            String roleName,
            String departmentName,
            List<? extends GrantedAuthority> authorities
    ) {
        this.userId = userId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.roleName = roleName;
        this.departmentName = departmentName;
        this.authorities = List.copyOf(authorities);
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getRoleName() {
        return roleName;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
