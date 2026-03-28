import { useEffect, useState } from 'react'
import { TableCell, TableRow } from './ui/table'
import type { attendance } from './schema/Attendance'
import { getAttendanceAll } from '@/hooks/Attendance';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';

export default function ModificationTable() {
    const [attedances, setAttedance] = useState<Array<attendance> | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getAttendanceAll();
            setAttedance(data);
        }
        fetchData();
    }, [])
    console.log(attedances)
    return (
        <>
            {attedances?.map((attedance) => (
                <TableRow key={attedance.id}>
                    <TableCell>{attedance.id}</TableCell>
                    <TableCell>{attedance.userName}</TableCell>
                    <TableCell>
                        {format(new Date(attedance.workDate), "MM月dd日", { locale: ja })}
                    </TableCell>
                    <TableCell>
                        {format(new Date(attedance.clockIn), "MM月dd日 HH:mm", { locale: ja })}
                    </TableCell>
                    <TableCell>
                        {format(new Date(attedance.clockOut), "MM月dd日 HH:mm", { locale: ja })}
                    </TableCell>
                    <TableCell>{attedance.modifiedBy}</TableCell>
                    <TableCell>
                        {format(new Date(attedance.modifiedAt), "MM月dd日 HH:mm", { locale: ja })}
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
