import { id } from "date-fns/locale";

export const RoleMap = {
    EMPLOYEE : 1,
    MANAGER  : 2,
    ADMIN    : 3,
} as const;
export type RoleName  = keyof typeof RoleMap;
export type RoleValue = (typeof RoleMap)[RoleName];

export const LeaveTypeMap = {
    "Paid Leave": {
        id: 1,
        jp: "有給休暇"
    },
    "Sick Leave": {
        id: 2,
        jp: "病欠"
    },
    "Unpaid Leave": {
        id: 3,
        jp: "無給休暇"
    },
    "Maternity Leave": {
        id: 4,
        jp: "産前産後休業"
    },
    "Paternity Leave": {
        id: 5,
        jp: "出生時育児休業"
    },
    "Bereavement Leave": {
        id: 6,
        jp: "忌引休暇"
    },
    "Compensatory Leave": {
        id: 7,
        jp: "代休"
    },
    "Study Leave": {
        id: 8,
        jp: "研修休暇 / 学習休暇"
    }
} as const
export type LeaveTypeEN = keyof typeof LeaveTypeMap
export type LeaveTypeJP = (typeof LeaveTypeMap)[LeaveTypeEN]
export type LeaveTypeId = (typeof LeaveTypeMap)[LeaveTypeEN]["id"]

export const ApprovalStatusMap = {
    "pending" : {
        id: 1,
        jp: "承認待ち"
    },
    "approved" : {
        id: 2,
        jp: "承認"
    },
    "rejected" : {
        id: 3,
        jp: "非承認"
    }
} as const
export type ApprovalStatusEN = keyof typeof ApprovalStatusMap
export type ApprovalStatusJP = (typeof ApprovalStatusMap)[ApprovalStatusEN]
export type ApprovalStatusId = (typeof ApprovalStatusMap)[ApprovalStatusEN]["id"]