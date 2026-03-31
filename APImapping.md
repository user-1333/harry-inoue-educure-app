# API Mapping

基点パス: `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement`

## Auth API

### `POST /auth/login`
- URLパラメータ: なし
- RequestBody:
  - `email: String`
  - `password: String`
- 戻り値:
  - `LoginResponse`
    - `token: String`
- 参照ファイル:
  - `controller/AuthController.java`
  - `service/AuthService.java` (`LoginRequest`, `LoginResponse`)

### `POST /auth/signup`
- URLパラメータ: なし
- RequestBody:
  - `name: String`
  - `email: String`
  - `password: String`
- 戻り値:
  - `LoginResponse`
    - `token: String`
- 参照ファイル:
  - `controller/AuthController.java`
  - `service/AuthService.java` (`SignupRequest`, `LoginResponse`)

## Attendance API

### `GET /attendance/get/all`
- URLパラメータ: なし
- RequestBody: なし
- 戻り値:
  - `List<DetailAttendance>`
    - `id: Integer`
    - `userName: String`
    - `workDate: LocalDate`
    - `clockIn: LocalDateTime`
    - `clockOut: LocalDateTime`
    - `isLate: Boolean`
    - `isEarlyLeave: Boolean`
    - `breakTimeMinutes: Integer`
    - `breakStart: LocalDateTime`
    - `breakEnd: LocalDateTime`
    - `modifiedBy: String`
    - `modifiedAt: LocalDateTime`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/DetailAttendance.java`

### `GET /attendance/get/user`
- URLパラメータ: なし
- RequestBody: なし
- 戻り値:
  - `List<DetailAttendance>` (項目は `GET /attendance/get/all` と同じ)
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/DetailAttendance.java`

### `POST /attendance/get/id/{attendanceId}`
- URLパラメータ:
  - Path: `attendanceId: Integer`
- RequestBody: なし
- 実装メモ:
  - エンドポイント名は「ID指定取得」だが、実装上の HTTP メソッドは `POST`
  - 戻り値は単体ではなく `List<DetailAttendance>`
- 戻り値:
  - `List<DetailAttendance>` (項目は `GET /attendance/get/all` と同じ)
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `service/AttendanceService.java`
  - `dto/DetailAttendance.java`

### `GET /attendance/get/user/work-date`
- URLパラメータ: なし
- RequestBody: なし
- 実装メモ:
  - ログインユーザーの勤怠を日付順で取得するAPI
- 戻り値:
  - `List<Attendance>`
    - `id: Integer`
    - `userId: Integer`
    - `workDate: LocalDate`
    - `clockIn: LocalDateTime`
    - `clockOut: LocalDateTime`
    - `isEarlyLeave: Boolean`
    - `isLate: Boolean`
    - `breakStart: LocalDateTime`
    - `breakEnd: LocalDateTime`
    - `modifiedBy: Integer`
    - `modifiedAt: LocalDateTime`
    - `createdAt: LocalDateTime`
    - `updatedAt: LocalDateTime`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `entity/Attendance.java`

### `POST /attendance/clock-in`
- URLパラメータ:
  - Query: `isLate: boolean` (任意, default=`false`)
- RequestBody: なし
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/ApiResponse.java`

### `POST /attendance/clock-in/late`
- URLパラメータ: なし
- RequestBody: なし
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/ApiResponse.java`

### `POST /attendance/break-in`
- URLパラメータ: なし
- RequestBody: なし
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/ApiResponse.java`

### `POST /attendance/break-out`
- URLパラメータ: なし
- RequestBody: なし
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/ApiResponse.java`

### `POST /attendance/clock-out`
- URLパラメータ:
  - Query: `isEarlyLeave: boolean` (任意, default=`false`)
- RequestBody: なし
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/ApiResponse.java`

### `POST /attendance/clock-out/early`
- URLパラメータ: なし
- RequestBody: なし
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/ApiResponse.java`

### `PUT /attendance/update/{attendanceId}`
- URLパラメータ:
  - Path: `attendanceId: Integer`
- RequestBody:
  - `workDate: LocalDate`
  - `clockIn: LocalDateTime`
  - `breakStart: LocalDateTime`
  - `breakEnd: LocalDateTime`
  - `clockOut: LocalDateTime`
  - `isLate: Boolean`
  - `isEarlyLeave: Boolean`
  - ※ 実装上、パスで受け取る ID は「ユーザーID」ではなく更新対象の `attendance.id`
  - ※ `AttendanceController` は上記全項目を `Attendance` に詰め替えて `AttendanceService#updateAttendance` に渡している
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/AttendanceController.java`
  - `dto/AttendanceUpdateRequest.java`
  - `dto/ApiResponse.java`

## Leave API

### `GET /leave/get/pending`
- URLパラメータ: なし
- RequestBody: なし
- 実装メモ:
  - `LeaveController#getPending` は `leaveService.getLeaveApproval(1)` を呼び出しており、承認ステータスID `1` (PENDING) で固定取得
- 戻り値:
  - `List<detailLeave>`
    - `id: Integer`
    - `userName: String`
    - `leaveTypeName: String`
    - `approvalStatus: String`
    - `startDate: LocalDate`
    - `endDate: LocalDate`
    - `reason: String`
    - `approvedAt: LocalDate`
    - `approvedBy: String`
- 参照ファイル:
  - `controller/LeaveController.java`
  - `dto/detailLeave.java`

### `GET /leave/get/approve`
- URLパラメータ: なし
- RequestBody: なし
- 実装メモ:
  - `LeaveController#getApproved` は `loginUser.getUserId()` を使って `leaveService.getLeave(userId)` を呼ぶため、承認済み固定ではなく「ログインユーザーの休暇一覧」を取得する
- 戻り値:
  - `List<detailLeave>` (項目は `GET /leave/get/pending` と同じ)
- 参照ファイル:
  - `controller/LeaveController.java`
  - `dto/detailLeave.java`

### `POST /leave/request`
- URLパラメータ: なし
- RequestBody:
  - `leaveTypeId: Integer`
  - `startDate: LocalDateTime` (format: `yyyy-MM-dd'T'HH:mm:ss`)
  - `endDate: LocalDateTime` (format: `yyyy-MM-dd'T'HH:mm:ss`)
  - `reason: String`
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/LeaveController.java`
  - `dto/RequestLeave.java`
  - `dto/ApiResponse.java`

### `PUT /leave/approval/{targetId}`
- URLパラメータ:
  - Path: `targetId: Integer`
- RequestBody:
  - `approvalStatusId: Integer`
  - ※ `leaveId` と `approvedBy` はDTOに存在するが、コントローラ側で `targetId` と `loginUser.getUserId()` を上書き設定するためリクエストでの指定は不要
- 戻り値:
  - `ApiResponse`
    - `code: Integer`
    - `message: String`
- 参照ファイル:
  - `controller/LeaveController.java`
  - `dto/ApprovedLeave.java`
  - `dto/ApiResponse.java`

## User API

### `GET /user/all`
- URLパラメータ: なし
- RequestBody: なし
- 戻り値:
  - `List<DetailUserProfile>`
    - `userId: Integer`
    - `userName: String`
    - `email: String`
    - `roleName: String`
    - `departmentName: String`
- 参照ファイル:
  - `controller/UsersController.java`
  - `dto/DetailUserProfile.java`

### `GET /user/{id}`
- URLパラメータ:
  - Path: `id: Integer`
- RequestBody: なし
- 戻り値:
  - `DetailUserProfile`
    - `userId: Integer`
    - `userName: String`
    - `email: String`
    - `roleName: String`
    - `departmentName: String`
- 参照ファイル:
  - `controller/UsersController.java`
  - `dto/DetailUserProfile.java`

### `GET /user/me`
- URLパラメータ: なし
- RequestBody: なし
- 戻り値:
  - `DetailUserProfile`
    - `userId: Integer`
    - `userName: String`
    - `email: String`
    - `roleName: String`
    - `departmentName: String`
- 参照ファイル:
  - `controller/UsersController.java`
  - `dto/DetailUserProfile.java`

## 補足
- `@AuthenticationPrincipal LoginUser` はURLパラメータ/RequestBodyではなく、認証済みユーザー情報としてサーバ側で注入される。
- `SecurityConfig` により、`/auth/**` は未認証でもアクセス可能。それ以外の API は認証必須。
- `@PreAuthorize` 付きAPI:
  - `PUT /attendance/update/{attendanceId}`
  - `PUT /leave/approval/{targetId}`
- ロール階層は `ADMIN > MANAGER > EMPLOYEE`。そのため `hasRole(MANAGER)` の API は `ADMIN` でも利用可能。
- `GET /leave/get/pending` は名称上は承認待ち一覧だが、現状の実装では `@PreAuthorize` が付いていないため、認証済みユーザーであれば取得可能。
