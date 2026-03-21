package jp.educure.attendancemanagement.domain.role;

public enum RoleType {
    ADMIN,
    MANAGER,
    EMPLOYEE;

    public String toRoleName() {
        return "ROLE_" + this.name();
    }
}
