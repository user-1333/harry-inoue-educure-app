import React from 'react'
import { SidebarProvider, SidebarTrigger } from '../ui/sidebar'
import AppSidebar from './appsidebar'

export default function AppLayout() {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background">
        {/* サイドバー本体 */}
        <AppSidebar />
        
        {/* メインエリア */}
        <div className="flex flex-1 flex-col">
          {/* ヘッダーエリア */}
          <header className="flex items-center gap-2 border-b p-4">
            <SidebarTrigger />
          </header>
          
          {/* コンテンツエリア */}
          <main className="flex-1 p-4">
            {/* ここにダッシュボードのコンテンツを配置 */}
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
