import z from "zod";

export const AttendanceSchema = z.object({
    id : z.number().int(),
    userName : z.string(),
    workDate: z.date(),
    clockIn:z.date(),
    clockOut:z.date(),
    modifiedBy:z.string(),
    modifiedAt:z.date()
});
export type attendance = z.infer<typeof AttendanceSchema>;