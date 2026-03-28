import LeaveRequestDialog from "@/components/DialogLeaveRequest";
import TableLeaveRequest from "@/components/TableLeaveRequest";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";


export default function LeaveRequest() {
  return (
    <div className='flex flex-col h-screen gap-4'>
      <div className="flex items-center">
        <h1 className="text-3xl font-bold m-8 underline">申請一覧</h1>
        <LeaveRequestDialog />
      </div>
      <ScrollArea className="border p-4 h-[80%]">
        <Table className="w-[90%] mx-auto text-lg mt-4">
          <TableHeader>
            <TableRow>
              <TableHead className="font-bold">休暇理由</TableHead>
              <TableHead className="font-bold">ステータス</TableHead>
              <TableHead className="font-bold">休暇開始日</TableHead>
              <TableHead className="font-bold">休暇終了日</TableHead>
              <TableHead className="font-bold">承認者</TableHead>
              <TableHead className="font-bold">承認日</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableLeaveRequest />
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
