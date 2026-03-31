import type { attendance } from '@/components/schema/Attendance';
import { getAttendanceByUser } from '@/hooks/Attendance';
import { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { FaClock } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';

export default function TableHistory() {
  const [attendances, setAttendances] = useState<Array<attendance> | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAttendanceByUser();
      setAttendances(data)
    }
    fetchData();
  }, []);

  console.log(attendances)
  return (
    <>
      {attendances?.map((attendance) => (
        <TableRow key={attendance.id}>

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
          
          {/* 更新日時 */}
          {attendance.modifiedAt === null ? (
            <TableCell></TableCell>
          ) : (
            <TableCell>{format(new Date(attendance.modifiedAt), "MM月dd日 HH:mm", { locale: ja })}</TableCell>
          )}

        </TableRow>
      ))}
    </>
  )
}
