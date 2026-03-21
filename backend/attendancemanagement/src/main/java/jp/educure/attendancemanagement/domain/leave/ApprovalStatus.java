package jp.educure.attendancemanagement.domain.leave;

import lombok.Getter;

@Getter
public enum ApprovalStatus {
    PENDING(1, "pending"),
    APPROVED(2, "approved"),
    REJECTED(3, "rejected");

    private final int id;
    private final String label;

    ApprovalStatus(int id, String label) {
        this.id = id;
        this.label = label;
    }

}
