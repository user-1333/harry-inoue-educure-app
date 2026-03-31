// import type { attendance } from "@/components/schema/Attendance"
// import { useEffect, useState } from "react"
// import { getAttendanceById } from "./Attendance"

// export function useAttendanceById(attendanceId: number): attendance | null {
//     const [data, setData] = useState<attendance | null>(null)

//     useEffect(() => {
//         if (!attendanceId) return

//         getAttendanceById(attendanceId)
//             .then(setData)
//             .catch((e) => {
//                 console.error("勤怠取得失敗", e)
//             })
//     }, [attendanceId])

//     return data
// }