import { VscAccount } from 'react-icons/vsc'
import type { User } from '../../components/schema/User'
import { getMenuItems } from '../../components/MenuItem'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { removeTokenCookie } from '@/lib/cookie'
import { NavLink } from 'react-router-dom'

const baseStyle = "flex items-center gap-2 py-2 pl-8 border-white/40 rounded-2xl transition-colors cursor-pointer";

export default function Sidebar({ user }: { user: User | null }) {
    const menuItems = getMenuItems({ user });
    return (
        <aside className="md:w-56 w-24 border-white/40 border-r-2 h-screen py-4 px-2">
            <div className='pd-4 flex flex-col gap-2'>
                {/* User Info */}
                <DropdownMenu>
                    <DropdownMenuTrigger>
                            <div className="flex items-center gap-2 justify-center border-white/40 pb-4 rounded-2xl transition-colors">
                                <VscAccount className="md:mx-0 mx-auto md:text-3xl text-2xl" />
                                <div>
                                    <p className='md:block hidden text-2xl'>{user?.userName}</p>
                                    <p className='md:block hidden text-sm text-gray-300'>{user?.email}</p>
                                </div>
                            </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuItem onClick={removeTokenCookie}>Log Out</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Menu Items */}
                <nav className='flex flex-col gap-2'>
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={({ isActive }) =>
                                isActive ? `${baseStyle} bg-white/40` : `${baseStyle} hover:bg-white/20`
                            }
                        >
                            <div className="md:text-2xl text-xl">{item.icon}</div>
                            <p className="md:block hidden">{item.label}</p>
                        </NavLink>
                    ))}
                </nav>
            </div>
        </aside>
    )
}
