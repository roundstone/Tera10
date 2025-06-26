import { useAtom } from "jotai";
import { appAtom } from "@/stores/app";
import IMAGES from "@/assets/images";

export function AppDashboardNav() {
  const [app] = useAtom(appAtom);
  const userEmail = localStorage.getItem('email');
  const userName = localStorage.getItem('name');

  return (
    <nav className="flex justify-between pb10 p-6">
      <div className="flex flex-col gap-2">
        <div className="text-lg font-semibold">
          {app.dashboardTitle || "Dashboard"}
        </div>
        {app.subtitle && (
          <div className="text-sm -mt-2 text-[#505050]">{app.subtitle}</div>
        )}
      </div>

      <div className="space-x-3 flex items-center">
        <div className="relative">
          <img
            src={IMAGES.avatar}
            className="w-[40px] h-[40px] rounded-full"
            alt=""
          />
          <span className="absolute bottom-1 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></span>
        </div>
        <div className="flex-col gap-2 text-[#475467]">
          <div className="font-medium text-sm">{userName}</div>
          <div className="text-xs">{userEmail}</div>
        </div>
      </div>
    </nav>
  );
}
