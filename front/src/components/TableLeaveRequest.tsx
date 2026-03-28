import { getLeaveByUserAPI } from "@/hooks/Leave";
import type { Leave } from "@/components/schema/Leave";
import { useEffect, useState } from "react";
import {
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { ja } from 'date-fns/locale';
import { format } from 'date-fns';
import { ApprovalStatusMap, LeaveTypeMap } from '@/lib/type';

export default function TableLeaveRequest() {
    const [leaves, setLeave] = useState<Array<Leave> | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getLeaveByUserAPI();
            setLeave(data)
        }
        fetchData();
    }, []);
    const baseStyle = (leave: Leave): { bg: string; text: string } => {
        const styles = {
            "bg":"",
            "text":""
        }
        if (leave.approvalStatus === "approved") {
            styles.bg = "hover:bg-green-600/20"
            styles.text = "hover:text-green-600"
        } else if (leave.approvalStatus === "rejected") {
            styles.bg = "hover:bg-red-600/20"
            styles.text = "hover:text-red-600"
        }
        return styles
    }
    return (
        <>
            {leaves?.map((leave) => (
                <TableRow key={leave.id} className={baseStyle(leave).bg}>
                    <TableCell>{LeaveTypeMap[leave.leaveTypeName]["jp"]}</TableCell>
                    <TableCell className={baseStyle(leave).text}>{ApprovalStatusMap[leave.approvalStatus]["jp"]}</TableCell>
                    <TableCell>
                        {format(new Date(leave.startDate), "MM月dd日", { locale: ja })}
                    </TableCell>
                    <TableCell>
                        {format(new Date(leave.endDate), "MM月dd日", { locale: ja })}
                    </TableCell>
                    <TableCell>{leave.approvedBy}</TableCell>
                    <TableCell>{leave.approvedAt ? format(new Date(leave.approvedAt), "MM月dd日", { locale: ja }) : "-"}</TableCell>
                </TableRow>
            ))}
        </>
    )
}
