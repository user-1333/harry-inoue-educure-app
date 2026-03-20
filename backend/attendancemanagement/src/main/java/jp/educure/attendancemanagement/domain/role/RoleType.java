package jp.educure.attendancemanagement.domain.role;

public enum RoleType {
    Admin,
    Manager,
    Employee;

    public String toRoleName() {
        return "ROLE_" + this.name();
    }
}
