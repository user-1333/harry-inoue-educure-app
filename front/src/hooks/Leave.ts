import type { APIres } from "@/components/schema/APIresponse";
import type { Leave, LeaveRequest, LeaveApproval } from "@/components/schema/Leave";
import { request } from "@/lib/ApiFetch";
import { toast } from "sonner";

export function leaveRequestAPI(leave:LeaveRequest){
    request<APIres>("leave/request",{
            method:"POST",
            data:leave})
        .then((res) => {
            toast.success(res.message, {
                position: "top-center",
            });
        }).catch((err) => {
            console.error(err);
            toast.error(err.message || "Failed to request leave", {
                position: "top-center",
            });
        });

}
export function leaveApprovalAPI(leaveApproval:LeaveApproval){
    request<APIres>(`leave/approval/${leaveApproval.leaveId}`,{
        method:"PUT",
        data:leaveApproval,
        credentials: "include"
    }).then((res) => {
        toast.success(res.message, {
            position: "top-center",
        });
    }).catch((err) => {
        console.error(err);
        return (`error:${err}`)
    });
}


export async function getLeaveAllAPI(): Promise<Leave[]> {
    return await request<Leave[]>("leave/get/pending", { method: "GET" })
}

export async function getLeaveByUserAPI(): Promise<Leave[]> {
    return await request<Leave[]>(`leave/get/approve`, { method: "GET" })
}