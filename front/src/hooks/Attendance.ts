import type { attendance } from "@/components/schema/Attendance";
import { request } from "@/lib/ApiFetch";

export async function getAttendanceAll():Promise<Array<attendance>>{
    return await request<Array<attendance>>("attendance/get/all",{method:"GET"})
}

export async function getAttendanceByUser(): Promise<Array<attendance>> {
    return await request<Array<attendance>>("attendance/get/user", { method: "GET" });
}

export async function clockIn() {
    request("attendance/clock-in", {
        method: "POST",
        credentials: "include"
    });
}

export async function clockOut() {
    request("attendance/clock-out", {
        method: "POST",
        credentials: "include"
    });
}

