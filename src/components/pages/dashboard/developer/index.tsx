import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import usePageTitle from "@/hooks/use-page-title";
import { Box, DocumentCopy, DocumentText, Star, Wallet } from "iconsax-react";
import { StatCard } from "./children/stat-card";
import DashboardPropertyTable from "./children/dashboard-propety-table";
import { ROUTES } from "@/config/route";
// import { useNavigation } from "@/utils/navigation";
import { Link } from "react-router-dom";
import UnlockCard from "./children/unlock-card";
import { dashboardApi } from "@/api/dashboardApi";



const DeveloperDashboardPage = () => {
  usePageTitle("Developer’s Dashboard");
  // const { goTo } = useNavigation();

  const [stats, setStats] = useState([
    {
      title: "Available Listing",
      value: 0,
      icon: <DocumentText size={18} color="#000" />,
    },
    {
      title: "Portfolio Balance",
      value: 0,
      currency: "NGN",
      icon: <Wallet size={18} color="#000" />,
    },
    {
      title: "Units Sold",
      value: 0,
      icon: <Box size={18} color="#000" />,
    },
    {
      title: "Pending Milestone Approvals",
      value: 0,
      icon: <Star size={18} color="#000" />,
    },
  ]);
  const fetchStats = async () => {
    try {
      const response = await dashboardApi.getDashboardStats();
      if (response.success) {

        setStats([
          {
            title: "Available Listing",
            value: response.data?.data.total_assets,
            icon: <DocumentText size={18} color="#000" />,
          },
          {
            title: "Portfolio Balance",
            value: 0,
            currency: "NGN",
            icon: <Wallet size={18} color="#000" />,
          },
          {
            title: "Units Sold",
            value: 0,
            icon: <Box size={18} color="#000" />,
          },
          {
            title: "Pending Milestone Approvals",
            value: response.data?.data.pending_milestones,
            icon: <Star size={18} color="#000" />,
          },
        ])


      }
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <>
      <div className="flex justify-end items-center gap-4">
        <Button variant="outline" className="gap-2 text-[#475467] rounded-full">
          <DocumentCopy size={20} color="#475467" />
          <span>Drafts</span>
        </Button>

        <Link
          to={ROUTES.DASHBOARD.DEVELOPER.ADD_ASSETS}
          className="!border-[#EBA10E] bg-yellow-400 border rounded-full text-black p-2 px-2 text-sm"
        >
          Add New
        </Link>
      </div>

      {/* Dashboard Content */}
      <div className=" flex-1 ">
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb4">Stats</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                currency={stat.currency}
              />
            ))}
          </div>
          <div className="lg:grid grid-cols-4 gap-4">
            <DashboardPropertyTable />
            {/* Promo Banner */}
            <div>
              <UnlockCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeveloperDashboardPage;
