import { format } from 'date-fns';
import { TableCell, TableRow } from './ui/table'
import { useAuthUser, useAuthUserAll } from '@/hooks/useAuthUser'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { RoleMap } from '@/lib/type';
import { ChangeRole } from '@/hooks/Auth';

export default function TableUserControl() {
    const users = useAuthUserAll();
    const user = useAuthUser();
    const filteredUsers = users?.filter((u) => u.userId !== user?.userId);
    return (
        <>
            {filteredUsers?.map((user) => (
                <TableRow key={user.userId}>
                    <TableCell>{user.userId}</TableCell>
                    <TableCell>{user.userName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{format(user.userCreatedAt, 'yyyy-MM-dd')}</TableCell>
                    <TableCell>
                        <Select defaultValue={RoleMap[user.roleName].toString()} 
                            onValueChange={(value) => {
                                ChangeRole({userId: user.userId, roleId: Number(value)})
                            }}>
                            <SelectTrigger className="w-45">
                                <SelectValue placeholder="Theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value={RoleMap.ADMIN.toString()}>ADMIN</SelectItem>
                                    <SelectItem value={RoleMap.MANAGER.toString()}>MANAGER</SelectItem>
                                    <SelectItem value={RoleMap.EMPLOYEE.toString()}>EMPLOYEE</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </TableCell>
                </TableRow>
            ))}
        </>
    )
}
