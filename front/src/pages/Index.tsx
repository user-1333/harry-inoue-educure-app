import Sidebar from "@/pages/home/Sidebar";
import { useAuthUser } from "@/hooks/useAuthUser";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";

export default function Index() {
  const user = useAuthUser();
  
  return (
    <div className="flex">
      <Sidebar user={user} />
      <main className="w-full">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}