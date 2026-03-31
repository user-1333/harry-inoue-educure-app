import z from "zod";

export const AttendanceSchema = z.object({
    id : z.number().int(),
    userName : z.string(),
    workDate: z.date(),
    clockIn:z.date(),
    clockOut:z.date().nullable(),
    isLate:z.boolean(),
    isEarlyLeave:z.boolean(),
    breakTimeMinutes:z.number().int().nullable(),
    breakStart:z.date().nullable(),
    breakEnd:z.date().nullable(),
    modifiedBy:z.string(),
    modifiedAt:z.date().nullable()
});
export type attendance = z.infer<typeof AttendanceSchema>;

export const AttendanceMinSchema = z.object({
    id : z.number().int(),
    clockIn:z.date().nullable(),
    clockOut:z.date().nullable(),
    breakStart:z.date().nullable(),
    breakEnd:z.date().nullable(),
});
export type attendanceMin = z.infer<typeof AttendanceMinSchema>;

export const AttendanceModificationSchema = z.object({
    workDate: z.string(),
    clockIn:z.string().nullable(),
    clockOut:z.string().nullable(),
    breakStart:z.string().nullable(),
    breakEnd:z.string().nullable(),
    isLate:z.boolean(),
    isEarlyLeave:z.boolean(),
});
export type attendanceModification = z.infer<typeof AttendanceModificationSchema>;