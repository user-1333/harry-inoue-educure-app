package jp.educure.attendancemanagement.service;

import jp.educure.attendancemanagement.dto.ApiResponse;
import jp.educure.attendancemanagement.dto.DetailAttendance;
import jp.educure.attendancemanagement.entity.Attendance;
import jp.educure.attendancemanagement.mapper.AttendanceMapper;
import jp.educure.attendancemanagement.mapper.UserProfileMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AttendanceService {
    private final AttendanceMapper attendanceMapper;
    public List<DetailAttendance> getAttendanceByUserId(Integer userId) {
        return attendanceMapper.findUserById(userId);
    }
    public List<DetailAttendance> getAttendanceById(Integer id) {
        return attendanceMapper.findAttendanceById(id);
    }
    public List<Attendance> getAttendanceByWorkDate(Integer userId) {
        return attendanceMapper.findByWorkDate(userId, LocalDateTime.now().toLocalDate());
    }

    public List<DetailAttendance> getAttendanceAll() {
        return attendanceMapper.findAll();
    }
    public ApiResponse clockIn(Integer userId, Boolean isLate) {
        LocalDateTime now = LocalDateTime.now();
        if (!attendanceMapper.findByWorkDate(userId, now.toLocalDate()).isEmpty()){
            return new ApiResponse(1, "既に出勤打刻が存在しています。");
        }
        attendanceMapper.insert(
                userId,
                now.toLocalDate(),
                now,
                null,
                isLate,
                null,
                null);
        return new ApiResponse(0, "出勤打刻が完了しました。");
    }

    private Object breakTimeCheck(Integer userId) {
        LocalDateTime now = LocalDateTime.now();
        List<Attendance> records = attendanceMapper.findByWorkDate(userId, now.toLocalDate());
        if (records.size() != 1) return new ApiResponse(1, "出勤打刻が存在しないか、複数存在しています。");
        Attendance todayWork = records.getFirst();
        if (todayWork.getClockOut() != null) return new ApiResponse(1, "既に退勤打刻が存在しています。");
        return todayWork;
    }

    public ApiResponse breakIn(Integer userId) {
        if (breakTimeCheck(userId) instanceof  ApiResponse) return (ApiResponse) breakTimeCheck(userId);
        Attendance todayWork = (Attendance) breakTimeCheck(userId);
         LocalDateTime now = LocalDateTime.now();
        if (todayWork.getBreakStart() != null) return new ApiResponse(1, "既に休憩開始打刻が存在しています。");
        attendanceMapper.breakTimeUpdate(
                userId,
                now.toLocalDate(),
                now,
                null
        );
        return new ApiResponse(0, "休憩開始打刻が完了しました");
    }
    public ApiResponse breakOut(Integer userId) {
        if (breakTimeCheck(userId) instanceof  ApiResponse) return (ApiResponse) breakTimeCheck(userId);
        Attendance todayWork = (Attendance) breakTimeCheck(userId);
        LocalDateTime now = LocalDateTime.now();
        if (todayWork.getBreakStart() == null) return new ApiResponse(1, "休憩開始打刻が存在しません。");
        if (todayWork.getBreakEnd() != null) return new ApiResponse(1, "既に休憩終了打刻が存在しています。");
        attendanceMapper.breakTimeUpdate(
                userId,
                now.toLocalDate(),
                todayWork.getBreakStart(),
                now
        );
        return new ApiResponse(0, "休憩終了打刻が完了しました");
    }
    public ApiResponse clockOut(Integer userId, Boolean isEarlyLeave) {
        LocalDateTime now = LocalDateTime.now();
        List<Attendance> records = attendanceMapper.findByWorkDate(userId, now.toLocalDate());
        if (records.size() != 1) {
            return new ApiResponse(1, "出勤打刻が存在しないか、複数存在しています。");
        }
        Attendance todayWork = records.getFirst();
        attendanceMapper.update(
                todayWork.getId(),
                userId,
                todayWork.getWorkDate(),
                todayWork.getClockIn(),
                now,
                todayWork.getIsLate(),
                isEarlyLeave,
                todayWork.getBreakStart(),
                todayWork.getBreakEnd(),
                null,
                null
        );
        return new ApiResponse(0, "退勤打刻が完了しました。");
    }
    public ApiResponse updateAttendance(Integer loginUserId, Attendance attendance) {
        if (attendance == null || attendance.getWorkDate() == null) {
            return new ApiResponse(1, "更新対象のユーザーIDと勤務日が必要です。");
        }
        if (attendance.getClockIn() != null && attendance.getClockOut() != null
                && attendance.getClockIn().isAfter(attendance.getClockOut())) {
            return new ApiResponse(1, "clockIn は clockOut より後にできません。");
        }
        if (attendance.getBreakStart() != null && attendance.getBreakEnd() != null
                && attendance.getBreakStart().isAfter(attendance.getBreakEnd())) {
            return new ApiResponse(1, "breakStart は breakEnd より後にできません。");
        }
        Integer userId = attendanceMapper.findById(attendance.getId()).getUserId();
        System.out.println("attendance 詳細: " + attendance.getId() + ", " + userId + ", " + attendance.getWorkDate() + ", " +
                attendance.getClockIn() + ", " + attendance.getClockOut() + ", " +
                attendance.getIsLate() + ", " + attendance.getIsEarlyLeave() + ", " +
                attendance.getBreakStart() + ", " + attendance.getBreakEnd());
        attendanceMapper.update(
                attendance.getId(),
                userId,
                attendance.getWorkDate(),
                attendance.getClockIn(),
                attendance.getClockOut(),
                attendance.getIsLate(),
                attendance.getIsEarlyLeave(),
                attendance.getBreakStart(),
                attendance.getBreakEnd(),
                loginUserId,
                LocalDateTime.now()
        );
        return new ApiResponse(0, "勤怠情報の更新が完了しました。");
    }
}
