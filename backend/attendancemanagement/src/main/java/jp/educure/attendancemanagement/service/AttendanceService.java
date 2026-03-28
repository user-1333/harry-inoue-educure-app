package jp.educure.attendancemanagement.service;

import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.DetailAttendance;
import jp.educure.attendancemanagement.entity.Attendance;
import jp.educure.attendancemanagement.mapper.AttendanceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceMapper attendanceMapper;
    public List<DetailAttendance> getAttendanceByUserId(Integer userId) {
        return attendanceMapper.findUserById(userId);
    }
    public List<DetailAttendance> getAttendanceAll() {
        return attendanceMapper.findAll();
    }
    public ApiResponse clockIn(Integer userId) {
        LocalDateTime now = LocalDateTime.now();
        if (!attendanceMapper.findByWorkDate(userId, now.toLocalDate()).isEmpty()){
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
        List<Attendance> records = attendanceMapper.findByWorkDate(userId, now.toLocalDate());
        if (records.size() != 1) {
            return new ApiResponse(1, "出勤打刻が存在しないか、複数存在しています。");
        }
        Attendance todayWork = records.getFirst();
         attendanceMapper.update(
                userId,
                todayWork.getWorkDate(),
                todayWork.getClockIn(),
                now,
                null,
                null
        );
        return new ApiResponse(0, "退勤打刻が完了しました。");
    }
    public ApiResponse updateAttendance(Integer userId, Attendance attendance) {
        if (attendance == null || attendance.getUserId() == null || attendance.getWorkDate() == null) {
            return new ApiResponse(1, "更新対象のユーザーIDと勤務日が必要です。");
        }
        if (attendance.getClockIn() != null && attendance.getClockOut() != null
                && attendance.getClockIn().isAfter(attendance.getClockOut())) {
            return new ApiResponse(1, "clockIn は clockOut より後にできません。");
        }

        List<Attendance> records = attendanceMapper.findByWorkDate(attendance.getUserId(), attendance.getWorkDate());
        if (records.size() != 1) {
            return new ApiResponse(1, "出勤打刻が存在しないか、複数存在しています。");
        }
        attendanceMapper.update(
                attendance.getUserId(),
                attendance.getWorkDate(),
                attendance.getClockIn(),
                attendance.getClockOut(),
                userId,
                LocalDateTime.now()
        );
        return new ApiResponse(0, "勤怠情報の更新が完了しました。");
    }
}
