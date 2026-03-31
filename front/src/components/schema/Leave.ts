import { LeaveTypeMap, type LeaveTypeEN } from "@/lib/type";
import z from "zod";

export const LeaveRequestSchema = z.object({
    leaveTypeId : z.number().int().min(1,"休暇理由を選択してください"),
    startDate : z.string().min(1,"休暇開始日は必須です"),
    endDate : z.string().min(1,"休暇終了日は必須です"),
    reason : z.string().min(1,"理由は必須です")
})
export type LeaveRequest = z.infer<typeof LeaveRequestSchema>;

export const LeaveApprovalSchema = z.object({
    leaveId : z.number().int(),
    approvalStatusId : z.union([z.literal(2), z.literal(3)]),
})
export type LeaveApproval = z.infer<typeof LeaveApprovalSchema>;


const LeaveTypeEnum = z.enum(
  Object.keys(LeaveTypeMap) as [LeaveTypeEN, ...LeaveTypeEN[]]
)
export const LeaveSchema = z.object({
    id:z.number(),
    userName : z.string(),
    leaveTypeName : LeaveTypeEnum,
    approvalStatus : z.enum(["approved", "rejected", "pending"]),
    startDate : z.date(),
    endDate : z.date(),
    approvedAt : z.date().nullable(),
    approvedBy : z.string().nullable()
})
export type Leave = z.infer<typeof LeaveSchema>;