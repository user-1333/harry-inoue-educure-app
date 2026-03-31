import { RoleMap, type RoleName } from "@/lib/type";
import type { User } from "./schema/User";
import { MdDescription, MdEdit } from "react-icons/md";
import { VscCheck } from "react-icons/vsc";
import { FaHistory, FaHome, FaUserCog } from "react-icons/fa";

type MenuItemProps = {
    href: string;
    icon: React.ReactNode;
    label: string;
    active: string;
    listStyle: (hash: string) => string;
};

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
        { href: "/home", label: "ホーム", icon: <FaHome /> },
        { href: "/leave-request", label: "休暇申請", icon: <MdDescription /> },
        { href: "/history", label: "勤怠履歴", icon: <FaHistory /> },
    ];
    if (userRoleId >= RoleMap.MANAGER) {
        menuItems.push(
            { href: "/leave-approval", label: "休暇承認", icon: <VscCheck /> },
            { href: "/modification", label: "勤怠修正", icon: <MdEdit /> }
        );
    }
    if (userRoleId >= RoleMap.ADMIN) {
        menuItems.push(
            { href: "/user-control", label: "ユーザー管理", icon: <FaUserCog /> }
        );
    }
    return menuItems;
}