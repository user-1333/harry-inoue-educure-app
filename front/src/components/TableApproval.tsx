import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { format } from "date-fns"
import { ja } from "date-fns/locale"
import { MoreHorizontal } from "lucide-react"
import { getLeaveAllAPI, leaveApprovalAPI } from "@/hooks/Leave"
import { useEffect, useState } from "react"
import type { Leave } from "./schema/Leave"
import { LeaveTypeMap,ApprovalStatusMap } from "@/lib/type"
import App from "@/App"

export default function ApprovalTable() {
    const [reload, setReload] = useState(false)
    const [leaves, setLeave] = useState<Array<Leave> | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getLeaveAllAPI()
            setLeave(data)
        }
        fetchData()
    }, [reload])
    
    return (
        <>
            {leaves?.map((leave) => (
                <TableRow key={leave.id}>
                    <TableCell>{leave.userName}</TableCell>
                    <TableCell>{LeaveTypeMap[leave.leaveTypeName]["jp"]}</TableCell>
                    <TableCell>{ApprovalStatusMap[leave.approvalStatus]["jp"]}</TableCell>

                    <TableCell>
                        {format(new Date(leave.startDate), "MM月dd日", { locale: ja })}
                    </TableCell>

                    <TableCell>
                        {format(new Date(leave.endDate), "MM月dd日", { locale: ja })}
                    </TableCell>

                    <TableCell className="w-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <MoreHorizontal />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>操作</DropdownMenuLabel>
                                    <DropdownMenuItem onClick={() => { leaveApprovalAPI({leaveId: leave.id, approvalStatusId: ApprovalStatusMap["approved"]["id"]}); setReload(!reload); }}>
                                        承認
                                    </DropdownMenuItem>
                                    <DropdownMenuItem variant="destructive" onClick={() => { leaveApprovalAPI({leaveId: leave.id, approvalStatusId: ApprovalStatusMap["rejected"]["id"]}); setReload(!reload); }}>
                                        非承認
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
