package jp.educure.attendancemanagement.service;

import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.entity.Attendance;
import jp.educure.attendancemanagement.mapper.AttendanceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceMapper attendanceMapper;
    public ApiResponse clockIn(Integer userId) {
        LocalDateTime now = LocalDateTime.now();
        if (!attendanceMapper.findByWordDate(userId, now.toLocalDate()).isEmpty()){
            return new ApiResponse(1, "既に出勤打刻が存在しています。");
        }
        attendanceMapper.insert(
                userId,
                now.toLocalDate(),
                now,
                null,
                null,
                null);
        return new ApiResponse(0, "出勤打刻が完了しました。");
    }

    public ApiResponse clockOut(Integer userId) {
        LocalDateTime now = LocalDateTime.now();
        if (!attendanceMapper.findByWordDate(userId, now.toLocalDate()).isEmpty()){
            return new ApiResponse(1, "出勤打刻が存在しないか、複数存在しています。");
        }
        Attendance todaysWork = attendanceMapper.findByWordDate(userId, now.toLocalDate()).getFirst();
         attendanceMapper.update(
                todaysWork.getId(),
                userId,
                todaysWork.getWorkDate(),
                todaysWork.getClockIn(),
                now,
                null,
                null
        );
        return new ApiResponse(0, "退勤打刻が完了しました。");
    }
}
