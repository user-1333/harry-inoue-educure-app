import { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import type { attendance } from './schema/Attendance'
import { getAttendanceAll } from '@/hooks/Attendance';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { FaClock } from 'react-icons/fa';
import { FiLogOut } from "react-icons/fi";
import DialogModification from './DialogModification';

export default function ModificationTable() {
    const [attendances, setAttendances] = useState<Array<attendance> | null>(null);
    const fetchData = async () => {
        const data = await getAttendanceAll();
        setAttendances([...data].map((d) => ({
            ...d,
            clockIn: new Date(d.clockIn),
            clockOut: d.clockOut ? new Date(d.clockOut) : null,
            breakStart: d.breakStart ? new Date(d.breakStart) : null,
            breakEnd: d.breakEnd ? new Date(d.breakEnd) : null,
            modifiedAt: d.modifiedAt ? new Date(d.modifiedAt) : null
        })));
    }

    useEffect(() => {
        fetchData();
    }, []);
    return (
        <>
            {attendances?.map((attendance) => (
                <TableRow key={attendance.id}>
                    {/* ユーザー名 */}
                    <TableCell>
                        {attendance.userName}
                    </TableCell>

                    {/* 勤務日 */}
                    <TableCell>
                        {format(new Date(attendance.workDate), "MM月dd日", { locale: ja })}
                    </TableCell>

                    {/* 出勤時刻 */}
                    <TableCell>
                        {attendance.isLate ? (
                            <div className="flex items-center gap-2">
                                <FaClock className="text-red-500" />
                                {format(new Date(attendance.clockIn), "MM月dd日 HH:mm", { locale: ja })}
                            </div>
                        ) : (
                            format(new Date(attendance.clockIn), "MM月dd日 HH:mm", { locale: ja })
                        )}
                    </TableCell>

                    {/* 休憩時間 */}
                    {attendance.breakTimeMinutes === null ? (
                        <TableCell>ー</TableCell>
                    ) : (
                        <TableCell>{attendance.breakTimeMinutes}分</TableCell>
                    )}

                    {/* 退勤時刻 */}
                    {attendance.clockOut === null ? (
                        <TableCell>ー</TableCell>
                    ) : (
                        <TableCell>
                            {attendance.isEarlyLeave ? (
                                <div className="flex items-center gap-2">
                                    <FiLogOut className="text-yellow-500" />
                                    {format(new Date(attendance.clockOut), "MM月dd日 HH:mm", { locale: ja })}
                                </div>
                            ) : (
                                format(new Date(attendance.clockOut), "MM月dd日 HH:mm", { locale: ja })
                            )}
                        </TableCell>
                    )}

                    {/* 更新者 */}
                    <TableCell>
                        {attendance.modifiedBy}
                    </TableCell>

                    {/* 更新日時 */}
                    {attendance.modifiedAt === null ? (
                        <TableCell>ー</TableCell>
                    ) : (
                        <TableCell>{format(new Date(attendance.modifiedAt), "MM月dd日 HH:mm", { locale: ja })}</TableCell>
                    )}

                    {/* 編集アイコン */}
                    <TableCell className="text-center">
                        <DialogModification attendance={attendance} onSuccess={fetchData} />
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
