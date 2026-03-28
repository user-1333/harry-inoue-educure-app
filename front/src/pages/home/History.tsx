import type { attendance } from '@/components/schema/Attendance';
import TableHistory from '@/components/TableHistory';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getAttendanceByUser } from '@/hooks/Attendance';
import { useEffect, useState } from 'react'

export default function History() {
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
    <div className='flex flex-col h-screen gap-4'>
      <h1 className="text-3xl font-bold m-8 underline">勤怠一覧</h1>
      <ScrollArea className='w-full h-[80%] border-2 mx-auto px-6' >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              {/* <TableHead>ユーザー名</TableHead> */}
              <TableHead>勤務日</TableHead>
              <TableHead>出勤時刻</TableHead>
              <TableHead>休憩開始時間</TableHead>
              <TableHead>退勤時刻</TableHead>
              {/* <TableHead>更新者</TableHead> */}
              <TableHead>更新日時</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableHistory />
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
    )
}
