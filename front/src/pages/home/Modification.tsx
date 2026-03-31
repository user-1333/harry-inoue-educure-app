import { ScrollArea } from '../../components/ui/scroll-area'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '../../components/ui/table'
import ModificationTable from '../../components/TableModification'

export default function Modification() {
  return (
    <div className='flex flex-col h-screen gap-4'>
      <h1 className="text-3xl font-bold m-8 underline">勤怠修正</h1>
      <ScrollArea className='w-full h-[80%] border-2 mx-auto px-6' >
        <Table>
          <TableHeader>
            <TableRow>
              {/* <TableHead>ID</TableHead> */}
              <TableHead>ユーザー名</TableHead>
              <TableHead>勤務日</TableHead>
              <TableHead>出勤時刻</TableHead>
              <TableHead>休憩時間</TableHead>
              <TableHead>退勤時刻</TableHead>
              <TableHead>更新者</TableHead>
              <TableHead>更新日時</TableHead>
              {/* <TableHead>操作</TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            <ModificationTable/>
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
