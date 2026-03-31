import type { APIres } from "@/components/schema/APIresponse";
import type { attendance, attendanceMin, attendanceModification } from "@/components/schema/Attendance";
import { request } from "@/lib/ApiFetch";
import { toast } from "sonner";

export async function getAttendanceAll():Promise<Array<attendance>>{
    return await request<Array<attendance>>("attendance/get/all",{method:"GET"})
}

export async function getAttendanceByUser(): Promise<Array<attendance>> {
    return await request<Array<attendance>>("attendance/get/user", { method: "GET" });
}

export async function getAttendanceById(attendanceId: number): Promise<Array<attendance>> {
    return await request<Array<attendance>>(`attendance/get/id/${attendanceId}`, { method: "GET" });
}

export async function getAttendanceByWorkDate() {
    return await request<Array<attendanceMin>>("attendance/get/user/work-date", { method: "GET" });    
}

export async function clockIn() {
    await request("attendance/clock-in", {
        method: "POST",
        credentials: "include"
    });
}

export async function clockOut() {
    await request("attendance/clock-out", {
        method: "POST",
        credentials: "include"
    });
}

export async function late() {
    await request("attendance/clock-in/late", {
        method: "POST",
        credentials: "include"
    });
}

export async function earlyLeave() {
    await request("attendance/clock-out/early", {
        method: "POST",
        credentials: "include"
    });
}

export async function startBreak() {
    await request("attendance/break-in", {
        method: "POST",
        credentials: "include"
    });
}
export async function endBreak() {
    await request("attendance/break-out", {
        method: "POST",
        credentials: "include"
    });
}

export async function modifyAttendanceAPI(attendance: attendanceModification, attendanceId: number) {
    try {
        const res = await request<APIres>(`attendance/update/${attendanceId}`, {
            method: "PUT",
            data: attendance,
            credentials: "include"
        });
        toast.success(res.message, {
            position: "top-center",
        });
        return res;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

