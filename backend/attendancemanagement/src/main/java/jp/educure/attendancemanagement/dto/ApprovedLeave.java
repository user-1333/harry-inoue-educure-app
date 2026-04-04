package jp.educure.attendancemanagement.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDate;

@Data
@AllArgsConstructor
public class ApprovedLeave {
    @NotNull(message = "休暇IDは必須です")
    @Positive(message = "休暇IDは正の整数である必要があります")
    private Integer leaveId;

    private Integer approvedBy;

    @NotNull(message = "承認ステータスは必須です")
    @Positive(message = "承認ステータスIDは正の整数である必要があります")
    private Integer approvalStatusId;
}
