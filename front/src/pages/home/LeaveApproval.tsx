import ApprovalTable from "../../components/TableApproval"
import { ScrollArea } from "../../components/ui/scroll-area"
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../components/ui/table"

export default function LeaveApproval() {
    return (
        <div className="flex flex-col h-screen">
            <h1 className="text-3xl font-bold m-8 underline">申請一覧</h1>
            <ScrollArea className="border p-4 h-[80%]">
                <Table className="w-[90%] mx-auto text-lg mt-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-bold">名前</TableHead>
                            <TableHead className="font-bold">休暇理由</TableHead>
                            <TableHead className="font-bold">ステータス</TableHead>
                            <TableHead className="font-bold">休暇開始日</TableHead>
                            <TableHead className="font-bold">休暇終了日</TableHead>
                            <TableHead className="font-bold"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                       <ApprovalTable /> 
                    </TableBody>
                </Table>
            </ScrollArea >
        </div>
    )
}
