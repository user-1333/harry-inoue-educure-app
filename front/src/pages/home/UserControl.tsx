import TableUserControl from '@/components/TableUserControl'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

export default function UserControl() {
  return (
        <div className="flex flex-col h-screen">
            <h1 className="text-3xl font-bold m-8 underline">ユーザー管理</h1>
            <ScrollArea className="border p-4 h-[80%]">
                <Table className="w-[90%] mx-auto text-lg mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">ID</TableHead>
                            <TableHead className="font-bold">名前</TableHead>
                            <TableHead className="font-bold">メール</TableHead>
                            <TableHead className="font-bold">登録日</TableHead>
                            <TableHead className="font-bold">Role</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       <TableUserControl />
                    </TableBody>
                </Table>
            </ScrollArea >
        </div>
  )
}
