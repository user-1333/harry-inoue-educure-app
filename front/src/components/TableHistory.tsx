import type { attendance } from '@/components/schema/Attendance';
import { getAttendanceByUser } from '@/hooks/Attendance';
import { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function TableHistory() {
  const [attendances, setAttendances] = useState<Array<attendance> | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAttendanceByUser();
      setAttendances(data)
    }
    fetchData();
  }, []);
  return (
    <>
      {attendances?.map((attendance) => (
        <TableRow key={attendance.id}>
          <TableCell>{attendance.id}</TableCell>
          <TableCell>
            {format(new Date(attendance.workDate), "MM月dd日", { locale: ja })}
          </TableCell>
          <TableCell>
            {format(new Date(attendance.clockIn), "MM月dd日 HH:mm", { locale: ja })}
          </TableCell>
          <TableCell></TableCell>
          <TableCell>
            {format(new Date(attendance.clockOut), "MM月dd日 HH:mm", { locale: ja })}
          </TableCell>
          <TableCell>
            {format(new Date(attendance.modifiedAt), "MM月dd日 HH:mm", { locale: ja })}
          </TableCell>
        </TableRow>
      ))}
    </>
  )
}
