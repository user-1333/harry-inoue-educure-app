import React from 'react'
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { Home, List, Settings } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function AppSidebar() {
  const navigationItems = [
    { 
      title: 'HOME',
      url: '#',
      icon: Home
    },
    {
      title: 'List',
      url: '#',
      icon: List
    },
    {
      title: 'settings',
      url: '#',
      icon: Settings
    }
  ]
  return (
    <>
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>General</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                      <Link to={item.url}>
                                          <item.icon />
                                          <span>{item.title}</span>
                                      </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    </>
  )
}
