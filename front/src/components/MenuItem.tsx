import { RoleMap, type RoleName } from "@/lib/type";
import type { User } from "./schema/User";
import { MdDescription, MdEdit } from "react-icons/md";
import { VscCheck } from "react-icons/vsc";
import { FaHistory, FaHome } from "react-icons/fa";
import Modification from "@/pages/home/Modification";
import LeaveApproval from "@/pages/home/LeaveApproval";
import LeaveRequest from "@/pages/home/LeaveRequest";
import Home from "@/pages/home/Home";
import History from "@/pages/home/History";

type MenuItemProps = {
    href: string;
    icon: React.ReactNode;
    label: string;
    active: string;
    listStyle: (hash: string) => string;
};

export type hash = "#HOME" | "#LEAVE_REQUEST" | "#LEAVE_APPROVAL" | "#MODIFICATION" | "#HISTORY";

export const componentMap = {
  "#HOME": Home,
  "#LEAVE_REQUEST": LeaveRequest,
  "#LEAVE_APPROVAL": LeaveApproval,
  "#MODIFICATION": Modification,
  "#HISTORY": History,
} as const;

export function MenuItem({
    href,
    icon,
    label,
    listStyle,
}: MenuItemProps) {
    return (
        <a href={href} className={listStyle(href)}>
            <div className="md:text-2xl text-xl">{icon}</div>
            <p className="md:block hidden">{label}</p>
        </a>
    );
}

export function getMenuItems({ user }: { user: User | null }) {
    const userRoleId = RoleMap[(user?.roleName as RoleName)];
    const menuItems = [
        { href: "#HOME", label: "ホーム", icon: <FaHome /> },
        { href: "#LEAVE_REQUEST", label: "休暇申請", icon: <MdDescription /> },
        { href: "#HISTORY", label: "勤怠履歴", icon: <FaHistory /> },
    ];
    if (userRoleId >= RoleMap.MANAGER) {
        menuItems.push(
            { href: "#LEAVE_APPROVAL", label: "休暇承認", icon: <VscCheck /> },
            { href: "#MODIFICATION", label: "勤怠修正", icon: <MdEdit /> }
        );
    }
    return menuItems;
}