import {
  ChartSquare,
  Home,
  Logout,
  Messages1,
  Star1,
  User,
  Wallet3,
} from "iconsax-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import React from "react";
import { cn } from "@/lib/utils";
import config from "@/config/app";
import IMAGES from "@/assets/images";
import { AppRoutes } from "@/types/route.type";
import { ROUTES } from "@/config/route";
import { Link, useLocation } from "react-router-dom";
import { getUserRoleFromPath } from "@/utils/navigation";
import { useNavigate } from 'react-router-dom';

// Menu items.
type MenuItem = {
  title: string;
  to: AppRoutes;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

type MenuItems = {
  [key: string]: MenuItem[];
};

const items: MenuItems = {
  DEVELOPER: [
    {
      title: "Dashboard",
      to: ROUTES.DASHBOARD.DEVELOPER.HOME,
      icon: Home,
    },
    {
      title: "Portfolio",
      to: ROUTES.DASHBOARD.DEVELOPER.PORTFOLIO,
      icon: ChartSquare,
    },
    {
      title: "Listings",
      to: ROUTES.DASHBOARD.DEVELOPER.LISTING,
      icon: ChartSquare,
    },
    {
      title: "Milestones",
      to: ROUTES.DASHBOARD.DEVELOPER.MILESTONE,
      icon: Star1,
    },
    {
      title: "Wallet",
      to: ROUTES.DASHBOARD.DEVELOPER.WALLET,
      icon: Wallet3,
    },
    // {
    //   title: "Profile",
    //   to: ROUTES.DASHBOARD.DEVELOPER.PROFILE,
    //   icon: User,
    // },
  ],
  MANAGER: [
    {
      title: "Dashboard",
      to: ROUTES.DASHBOARD.MANAGER.HOME,
      icon: Home,
    },
    {
      title: "Approvals",
      to: ROUTES.DASHBOARD.MANAGER.APPROVALS,
      icon: ChartSquare,
    },
    {
      title: "Market",
      to: ROUTES.DASHBOARD.MANAGER.MARKETS,
      icon: ChartSquare,
    },
    {
      title: "Communications",
      to: ROUTES.DASHBOARD.MANAGER.COMMUNICATION,
      icon: Messages1,
    },
    {
      title: "Insight",
      to: ROUTES.DASHBOARD.MANAGER.INSIGHT,
      icon: Wallet3,
    },
    {
      title: "Profile",
      to: ROUTES.DASHBOARD.MANAGER.PROFILE,
      icon: User,
    },
  ],
  OTHER: [],
};

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate(); // to programmatically navigate
  const userRole = getUserRoleFromPath(location.pathname, items); // Extract the role dynamically
  const menuItems = items[userRole] || []; // Get the menu for the role
  const navIsActive = (to: string) => window.location.pathname === to;
  // const navIsActive = (to: string) => window.location.pathname.startsWith(to);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    sessionStorage.clear(); // Optionally clear session storage

    navigate(ROUTES.AUTH.LOGIN); // Redirect to login

  };

  return (
    <Sidebar className="p-6 bg-[#F6F6F6] !rounded-r-[20px] !border-r-[#E4E4E4]">
      <SidebarContent className="bg-[#F6F6F6]">
        <AppSidebarHeader />
        <SidebarGroup>
          <SidebarGroupLabel className="px-0">Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <React.Suspense
              fallback={<SidebarSkeleton menuItems={menuItems} />}
            >
              <SidebarMenu className="space-y-2">
                {menuItems.length > 0 ? (
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  menuItems.map((item: any) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        isActive={navIsActive(item.to)}
                        className={cn(
                          "px-3 py-5",
                          navIsActive(item.to) &&
                          "!bg-black !font-semibold !text-yellow-500 rounded-md"
                        )}
                        asChild
                      >
                        <Link to={item.to}>
                          {/* {item.icon} */}
                          <item.icon
                            color={navIsActive(item.to) ? `#FCCF2F` : `#000`}
                            size="52"
                          />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))
                ) : (
                  <p className="text-gray-500">No menu available</p>
                )}
                <div className="text-black pt-80 flex gap-1 items-center">
                  <button
                    onClick={handleLogout}
                    className="text-black pt-80 flex gap-1 items-center hover:text-yellow-500"
                  >
                    <Logout color="#000" size={17} />
                    Logout
                  </button>
                </div>
              </SidebarMenu>
              {/* {userRole.toLocaleLowerCase() !== "admin" && <SecurityAlertCard />} */}

              {/* {userRole.toLocaleLowerCase() !== "admin" && <SecurityAlertCard />} */}
            </React.Suspense>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

const AppSidebarHeader: React.FC = () => {
  const userName = localStorage.getItem('name');
  return (
    <div className="p-2 py-4 space-y-10">
      <Link to={"/"} className="flex gap-1 item-center">
        <img src={IMAGES.appLogo} alt={config.appName} />
      </Link>

      <div className="bg-white rounded-md px-2 py-1.5 flex gap-2 items-center">
        <div className="bg-black rounded-full  h-8 w-8 flex justify-center items-center">
          <img src={IMAGES.CROSGROVE} alt={""} className="h-4" />
        </div>
        <span>{userName}</span>
      </div>
    </div>
  );
};

const SidebarSkeleton: React.FC<{ menuItems: unknown[] }> = ({ menuItems }) => {
  return (
    <SidebarMenu>
      {menuItems.map((_, index) => (
        <SidebarMenuItem key={index}>
          <SidebarMenuSkeleton />
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
};
