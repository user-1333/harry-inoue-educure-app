import Sidebar from "@/pages/home/Sidebar";
import { useAuthUser } from "@/hooks/useAuthUser";
import { useEffect, useState } from "react";
import { componentMap, type hash } from "@/components/MenuItem";

export default function Index() {
  const user = useAuthUser();
  const [active, setActive] = useState<hash>("#HOME");

  useEffect(() => {
    const updateHash = () => {
      setActive(window.location.hash as hash);
    };

    updateHash();
    window.addEventListener("hashchange", updateHash);

    return () => window.removeEventListener("hashchange", updateHash);
  }, []);

  const Component = componentMap[active];

  return (
    <div className="flex">
      <Sidebar user={user} />
      <main className="w-full">
        <Component />
      </main>
    </div>
  );
}