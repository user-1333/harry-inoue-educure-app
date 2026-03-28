import type { APIres } from "@/components/schema/APIresponse";
import type { Leave, LeaveRequest, LeaveApproval } from "@/components/schema/Leave";
import { request } from "@/lib/ApiFetch";

export function leaveRequestAPI(leave:LeaveRequest){
    request<APIres>("leave/request",{
            method:"POST",
            data:leave})
        .then((res) => {
            window.alert(res.message);
        }).catch((err) => {
            console.error(err);
            return (`error:${err}`)
        });

}
export function leaveApprovalAPI(leaveApproval:LeaveApproval){
    request<APIres>(`leave/approval/${leaveApproval.leaveId}`,{
        method:"PUT",
        data:leaveApproval,
        credentials: "include"
    }).then((res) => {
        window.alert(res.message);
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