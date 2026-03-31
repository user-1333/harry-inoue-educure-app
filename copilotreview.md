# front / back 実装レビュー（現状）

## ターゲット
- **誰のため**: 従業員・管理者・人事担当者など、勤怠と休暇運用に関わる社内利用者向け
- **何のため**: 出退勤記録、休暇申請・承認、勤怠確認を一元化し、運用の正確性と効率を高めるため
- **どのようなシステムか**: フロント（React/TypeScript）とバックエンド（Spring Boot/MyBatis/JWT）で構成された、認証付きの勤怠・休暇管理Webシステム

## このシステムの売り
- **勤怠と休暇を1つのシステムでまとめて扱える**
  - 出退勤記録、勤怠一覧、休暇申請、休暇承認までを同一のWebシステム内で扱える構成になっている
- **認証付きで、利用者ごとに必要な機能を出し分けられる**
  - JWT認証とロール別メニューにより、一般従業員と管理者で使う機能を分けやすい設計になっている
- **申請から承認までの流れをつなげやすい**
  - 休暇申請画面、申請一覧、承認一覧、承認APIがそろっており、業務フローとしてまとまりがある
- **将来的な機能追加に広げやすい土台がある**
  - front / back の責務分割、共通API処理、ロール階層の仕組みがあり、拡張の入口を作りやすい

## 判定基準
- **実装終了**: 画面・API・主要処理がつながっており、最低限のユースケースが通る状態
- **実装途中**: UIのみ/APIのみ、または処理はあるが接続・権限制御・値設定に未完了要素がある状態

## Front（`front`）

### 実装終了
- **認証（サインイン）**
  - `Signin.tsx` から `login` を実行し、JWTをCookieへ保存して `/` へ遷移（`front/src/pages/auth/Signin.tsx`, `front/src/hooks/Auth.ts`, `front/src/lib/cookie.ts`）
- **認証ガード + 自分情報取得**
  - トークンなし/失効時はサインインへリダイレクト、`/user/me` でログインユーザー情報取得（`front/src/hooks/useAuthUser.ts`）
- **ロール別メニュー表示**
  - 一般ユーザーと管理者以上で表示メニューを出し分け（`front/src/components/MenuItem.tsx`, `front/src/pages/home/Sidebar.tsx`）
- **休暇申請（作成）**
  - ダイアログ入力 + バリデーション（zod）+ `POST /leave/request` 連携（`front/src/components/DialogLeaveRequest.tsx`, `front/src/components/FormLeaveApproval.tsx`, `front/src/hooks/Leave.ts`）
- **休暇一覧（本人）表示**
  - `GET /leave/get/approve` で本人の申請一覧を取得表示（`front/src/components/TableLeaveRequest.tsx`）
- **休暇承認（管理者）**
  - `GET /leave/get/pending` の表示と承認/非承認アクション（`PUT /leave/approval/{id}`）連携（`front/src/components/TableApproval.tsx`）
- **勤怠一覧表示（本人/全体）**
  - 本人履歴と全体一覧の取得表示（`front/src/components/TableHistory.tsx`, `front/src/components/TableModification.tsx`, `front/src/hooks/Attendance.ts`）

### 実装途中
- **サインアップ画面**
  - UI入力とボタン制御のみで、`/auth/signup` API呼び出し未接続（`front/src/pages/auth/Signup.tsx`）
- **ホームの打刻ボタン（出勤/退勤/休憩/遅刻/早退）**
  - ボタンUIはあるが `clockIn` / `clockOut` 等のイベント接続なし（`front/src/pages/home/Home.tsx`, `front/src/hooks/Attendance.ts`）
- **勤怠修正ダイアログ**
  - `DialogModification` がプレースホルダ表示のみ（`front/src/components/DialogModification.tsx`）
- **休暇一覧/承認一覧の表示ラベル不一致**
  - テーブル見出しは「休暇理由」だが、実際に表示しているのは `leaveTypeName` ベースの休暇種別（`front/src/components/TableLeaveRequest.tsx`, `front/src/components/TableApproval.tsx`）
- **勤怠履歴の休憩列**
  - テーブル列はあるが値出力未実装（`front/src/components/TableHistory.tsx`）
- **画面の二重取得/不要ログ**
  - `History.tsx` と `TableHistory.tsx` の両方で同じ取得を行う構成、`console.log` 残存（`front/src/pages/home/History.tsx`, `front/src/components/TableModification.tsx`）

## Back（`backend/attendancemanagement`）

### 実装終了
- **JWT認証の基盤**
  - `/auth/**` を公開し、それ以外は認証必須。JWTフィルタで `Authorization: Bearer` を検証（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/auth/SecurityConfig.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/auth/JwtAuthFilter.java`）
- **ログイン/サインアップAPI**
  - `POST /auth/login`, `POST /auth/signup` 実装（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/AuthController.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/AuthService.java`）
- **ユーザー情報取得API**
  - `GET /user/me`, `GET /user/{id}`, `GET /user/all` 実装（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/UsersController.java`）
- **勤怠API（取得/出勤/退勤/管理者更新）**
  - `GET /attendance/get/user`, `GET /attendance/get/all`, `POST /attendance/clock-in`, `POST /attendance/clock-out`, `PUT /attendance/update/{targetUserId}`（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/AttendanceController.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/AttendanceService.java`）
- **休暇API（申請/承認/取得）**
  - `POST /leave/request`, `PUT /leave/approval/{targetId}`, `GET /leave/get/approve`, `GET /leave/get/pending`（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/LeaveService.java`）

### 実装途中
- **新規登録後のプロフィール未作成**
  - `signup` では `users` への登録のみで、`user_profiles` 生成処理がないため、登録直後の `/user/me` 利用やロール判定に影響する可能性（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/AuthService.java`, `backend/attendancemanagement/src/main/resources/mapper/UserProfile.xml`）
- **休暇承認待ち取得のマジックナンバー依存**
  - `GET /leave/get/pending` が `leaveService.getLeaveApproval(1)` 固定呼び出し（コメントも `//PENDING`）で、承認待ち判定を数値 `1` に直接依存している（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`）
- **勤怠の休憩/遅刻/早退項目**
  - DBには `break_start`, `break_end`, `is_late`, `is_early_leave` があるが、Controller/Service/APIに未反映（`backend/attendancemanagement/src/main/resources/schema.sql`）
- **ロール権限制御の適用不足**
  - `attendance/update` には `@PreAuthorize` がある一方、`leave/approval` には同等の管理者制御が未設定（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/AttendanceController.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`）
- **デバッグ出力の残存**
  - `System.out.println` が業務処理中に残っている（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/LeaveService.java`）

## 不足機能（コードベース判断）

### 優先度: 高
- **新規登録を完結させる機能**
  - フロントのサインアップ画面はAPI未接続で、バックエンド側も登録後の `user_profiles` 作成がないため、登録を完了できる状態になっていない（`front/src/pages/auth/Signup.tsx`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/AuthService.java`）
- **休憩開始/休憩終了の打刻機能**
  - ホーム画面にはボタンがあるが、対応API・保存処理・履歴表示が未実装で、休憩打刻が使えない（`front/src/pages/home/Home.tsx`, `backend/attendancemanagement/src/main/resources/schema.sql`, `front/src/components/TableHistory.tsx`）
- **遅刻/早退の記録機能**
  - ボタンとDB項目はあるが、実際に遅刻/早退を登録・表示する導線がない（`front/src/pages/home/Home.tsx`, `backend/attendancemanagement/src/main/resources/schema.sql`）
- **勤怠修正を登録する機能**
  - 一覧表示と更新APIはあるが、修正入力UIが未完成で、管理者が画面から勤怠修正を完結できない（`front/src/components/DialogModification.tsx`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/AttendanceController.java`）

### 優先度: 中
- **休暇申請理由を確認する機能**
  - 申請時に `reason` は保存しているが、一覧・承認画面・DTOで理由を表示しておらず、申請内容を十分に確認できない（`front/src/components/FormLeaveApproval.tsx`, `backend/attendancemanagement/src/main/resources/mapper/Leave.xml`, `front/src/components/TableLeaveRequest.tsx`, `front/src/components/TableApproval.tsx`）
- **管理者限定で休暇承認を行う機能**
  - 承認API自体はあるが、管理者専用として安全に運用するための権限制御が不足している（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`）
- **ユーザー一覧・詳細を画面から確認する機能**
  - `/user/all` と `/user/{id}` のAPIはあるが、フロント側に対応画面や導線がなく、管理系の情報閲覧機能としては未提供（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/UsersController.java`, `front/src/App.tsx`）

### 優先度: 低
- **休暇申請の取消・編集機能**
  - 申請作成と承認はあるが、利用者側が申請を取り下げたり修正したりする機能は確認できない（`front/src/hooks/Leave.ts`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`）
- **勤怠履歴の詳細表示機能**
  - 現状は一覧中心で、休憩・備考・遅刻/早退状態などをまとめて確認する詳細表示は見当たらない（`front/src/components/TableHistory.tsx`, `backend/attendancemanagement/src/main/resources/schema.sql`）

## 今後の課題（コードベース判断）

### 優先度: 高
- **新規登録後のユーザープロフィール作成を補完する**
  - `AuthService.signup` が `users` 登録のみで完結しており、`user_profiles` 前提の `/user/me` やロール表示と整合していない（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/AuthService.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/UsersController.java`）
- **フロントのサインアップをAPI接続する**
  - `Signup.tsx` は入力取得のみで `POST /auth/signup` 未呼び出し（`front/src/pages/auth/Signup.tsx`）

### 優先度: 中
- **ホーム画面の打刻ボタンを実処理に接続する**
  - 出勤/退勤/休憩/遅刻/早退ボタンにAPI呼び出しハンドラが未接続（`front/src/pages/home/Home.tsx`, `front/src/hooks/Attendance.ts`）
- **休暇承認待ち取得のマジックナンバー依存を解消する**
  - `getLeaveApproval(1)` 固定呼び出しのため、承認ステータス定義変更に弱い（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`）
- **勤怠修正UIを実装する**
  - 修正ダイアログがプレースホルダのままで更新フローが未完成（`front/src/components/DialogModification.tsx`）
- **休暇一覧の表示項目を実データに合わせて整理する**
  - 見出しは「休暇理由」だが、実表示は休暇種別であり、承認者名のSQL取得も不整合がある（`front/src/components/TableLeaveRequest.tsx`, `front/src/components/TableApproval.tsx`, `backend/attendancemanagement/src/main/resources/mapper/Leave.xml`）

### 優先度: 低
- **勤怠の休憩関連データをAPI/画面に反映する**
  - DBに `break_start` / `break_end` があるが、DTO・Service・UI反映が未対応（`backend/attendancemanagement/src/main/resources/schema.sql`, `front/src/components/TableHistory.tsx`）
- **重複取得とデバッグ出力を整理する**
  - `History.tsx` と `TableHistory.tsx` で同種取得が重複し、`console.log` / `System.out.println` が残っている（`front/src/pages/home/History.tsx`, `front/src/components/TableModification.tsx`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/LeaveService.java`）

## プロジェクト全体の評価（コードベース判断）

### 総評
- **基盤はしっかりしているが、現状は「主要機能が動き始めている開発中プロジェクト」という評価**
  - `front` は React + TypeScript + Vite を土台に、`zod` による入力検証や共通APIラッパーを導入できている（`front/package.json`, `front/src/lib/ApiFetch.ts`, `front/src/components/schema/Leave.ts`）
  - `backend` は Spring Boot + Spring Security + MyBatis + JWT の構成で、認証・勤怠・休暇の基本APIがそろっている（`backend/attendancemanagement/build.gradle`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/auth/SecurityConfig.java`）
  - 一方で、画面未接続・権限制御漏れ・登録後データ整合の不足が残っており、実運用前の仕上げが必要な段階（`front/src/pages/auth/Signup.tsx`, `front/src/pages/home/Home.tsx`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/AuthService.java`）

### 良い点
- **技術選定は一貫しており、役割分割も分かりやすい**
  - フロント/バックが明確に分離され、画面・hooks・lib・controller・service・mapper の責務が概ね整理されている（`front/src`, `backend/attendancemanagement/src/main/java`）
- **認証と業務機能の骨格はすでに成立している**
  - ログイン、ログインユーザー取得、休暇申請、休暇承認、勤怠取得、出勤/退勤APIまでが一通り実装済み（`front/src/hooks/useAuthUser.ts`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/AttendanceController.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`）
- **型とバリデーションを意識した実装が入っている**
  - フロントでは `zod` スキーマがあり、最低限の入力保証をしようとする方針が見える（`front/src/components/schema/User.ts`, `front/src/components/schema/Leave.ts`）

### 懸念点
- **実装の完成度にばらつきがある**
  - 完結している機能とプレースホルダ/未接続機能が混在しており、画面上の見た目に対して実処理が伴わない箇所がある（`front/src/components/DialogModification.tsx`, `front/src/pages/home/Home.tsx`）
- **認可・データ整合の不備が業務影響に直結しやすい**
  - 休暇承認の権限制御不足、承認者保存漏れ、新規登録後プロフィール未作成は、動作不良だけでなく運用上の不整合につながる（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/service/LeaveService.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/auth/UserDetailsConfig.java`）
- **品質保証の仕組みはまだ薄い**
  - フロント側の自動テストは見当たらず、バックエンドのテストも `contextLoads` のみで、業務ロジックの回帰を守る層がまだ弱い（`backend/attendancemanagement/src/test/java/jp/educure/attendancemanagement/AttendancemanagementApplicationTests.java`）
- **ドキュメント整備は最小限**
  - `front/README.md` はテンプレートのままで、現プロジェクト固有の起動手順や仕様説明にはまだなっていない（`front/README.md`, `backend/attendancemanagement/HELP.md`）

### 完成度の見立て
- **プロトタイプ〜初期実装段階としては十分前進している**
  - 主要画面と主要APIの往復は部分的に成立しており、土台を一から作る段階は越えている
- **ただし、リリース前品質には未到達**
  - 権限、登録導線、打刻UI接続、表示整合、テスト不足といった「最後に詰めるべき部分」がまだ複数残っている

### 評価まとめ
- **総合すると、アーキテクチャの方向性は良く、今後の伸びしろも大きいが、現時点では「完成度より土台の良さが先行しているプロジェクト」**
  - まずは高優先度課題を解消し、その後にテスト・文書化・表示整合を整えると、プロジェクト全体の評価はかなり上がる見込み

## 拡張性の評価（コードベース判断）

### 拡張しやすい点
- **責務分割の土台はできており、機能追加時の変更箇所を追いやすい**
  - フロントは `pages`・`components`・`hooks`・`lib`、バックエンドは `controller`・`service`・`mapper` に役割が分かれているため、機能追加時に修正範囲を切り分けやすい（`front/src`, `backend/attendancemanagement/src/main/java`）
- **API呼び出しと認証処理がある程度共通化されている**
  - `ApiFetch.ts` に共通リクエスト処理があり、トークン付与やエラーハンドリングの入口がまとまっているため、API追加時の実装パターンを増やしやすい（`front/src/lib/ApiFetch.ts`）
- **権限やステータスの定義が列挙・マップ化されている**
  - `RoleMap`、`LeaveTypeMap`、`ApprovalStatusMap`、`RoleType`、`ApprovalStatus` があり、ロールや休暇種別の追加時に参照先を追いやすい（`front/src/lib/type.ts`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/domain/role/RoleType.java`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/domain/leave/ApprovalStatus.java`）
- **ロール階層の仕組みがあり、将来的な権限拡張に乗せやすい**
  - `ADMIN > MANAGER > EMPLOYEE` の階層を `RoleHierarchyConfig` で定義しており、認可設計を広げる土台がある（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/auth/RoleHierarchyConfig.java`）

### 拡張時のボトルネック
- **画面遷移と状態管理がブラウザ状態に強く依存している**
  - `window.location.hash` や `window.location.href` を直接使う箇所が多く、画面追加や認証導線の複雑化に対して保守しづらくなる可能性がある（`front/src/pages/Index.tsx`, `front/src/pages/home/Sidebar.tsx`, `front/src/hooks/useAuthUser.ts`, `front/src/hooks/Auth.ts`）
- **設定値や判定値のハードコードが残っている**
  - APIのベースURL `http://localhost:8080` や `getLeaveApproval(1)` のような固定値があり、環境追加や仕様変更時の修正漏れリスクがある（`front/src/lib/ApiFetch.ts`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`）
- **フロントの実装パターンに統一感がまだ弱い**
  - 一部は `hooks` 経由でAPI連携しているが、UI未接続・プレースホルダ・重複取得も混在しており、機能追加時に同じ責務をどこへ置くべきかぶれやすい（`front/src/pages/home/Home.tsx`, `front/src/components/DialogModification.tsx`, `front/src/pages/home/History.tsx`, `front/src/components/TableHistory.tsx`）
- **自動テストが薄く、安全に拡張しづらい**
  - バックエンドのテストは `contextLoads` 中心で、フロント側テストは見当たらないため、機能追加時の回帰確認コストが高くなりやすい（`backend/attendancemanagement/src/test/java/jp/educure/attendancemanagement/AttendancemanagementApplicationTests.java`）

### 拡張性を高めるための改善ポイント
- **設定値の外出しを進める**
  - APIベースURLやステータスIDの参照を環境変数・定数へ寄せると、環境追加や仕様変更に強くなる（`front/src/lib/ApiFetch.ts`, `backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`）
- **フロントのデータ取得・遷移責務を整理する**
  - 取得処理を `hooks` 側へ寄せ、画面遷移もルーター中心に寄せると、画面数増加時の見通しが良くなる（`front/src/pages/Index.tsx`, `front/src/pages/home/Sidebar.tsx`, `front/src/pages/home/History.tsx`）
- **認可・DTO・表示項目の整合を優先して固める**
  - 権限制御や承認者情報、休憩情報などの整合が取れると、新機能追加時に既存仕様のあいまいさへ引っ張られにくくなる（`backend/attendancemanagement/src/main/java/jp/educure/attendancemanagement/controller/LeaveController.java`, `backend/attendancemanagement/src/main/resources/mapper/Leave.xml`, `backend/attendancemanagement/src/main/resources/schema.sql`）
- **回帰確認用のテストを追加する**
  - 認証、休暇申請/承認、勤怠更新の主要フローを自動テストで押さえると、今後の拡張に対する安全性が大きく上がる（`backend/attendancemanagement/build.gradle`, `backend/attendancemanagement/src/test/java/jp/educure/attendancemanagement/AttendancemanagementApplicationTests.java`）

### 拡張性まとめ
- **このプロジェクトは「構造面の拡張性は比較的良いが、運用面の拡張性はまだ改善余地が大きい」状態**
  - 役割分離や共通化の方向性は良いため、ハードコード削減・責務整理・テスト追加を進めれば、機能追加に強い構成へ育てやすい

## メモ
- 上記は現コードベースを起点にした棚卸し（要件との完全一致判定ではなく、実装接続の有無を中心に分類）。

