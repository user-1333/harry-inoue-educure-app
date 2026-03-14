import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
// import * as d from "../ui/dropdown-menu"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger  } from '../ui/dropdown-menu'

export default function Header() {
  return (
    <>
        <div className='w-full h-16 flex items-center justify-between px-4 bg-muted'>
            <div>
                <h1 className='text-2xl font-bold'>Chrono</h1>
            </div>
            <div className='flex items-center gap-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src="https://avatars.githubusercontent.com/u/122604?v=4" alt="Avatar" />
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-40" align="start">
                        <DropdownMenuGroup>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Log out</DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    </>
  )
}
