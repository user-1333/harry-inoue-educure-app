import TableHistory from '@/components/TableHistory';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export default function History() {
    return (
    <div className='flex flex-col h-screen gap-4'>
      <h1 className="text-3xl font-bold m-8 underline">勤怠履歴</h1>
      <ScrollArea className='w-full h-[80%] border-2 mx-auto px-6' >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>勤務日</TableHead>
              <TableHead>出勤時刻</TableHead>
              <TableHead>休憩開始時間</TableHead>
              <TableHead>退勤時刻</TableHead>
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
