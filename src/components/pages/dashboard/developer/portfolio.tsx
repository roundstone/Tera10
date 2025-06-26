import usePageTitle from "@/hooks/use-page-title";
import { Wallet } from "iconsax-react";
import { StatCard, StatCard2 } from "./children/stat-card";
import PortfolioMilestoneTable from "./children/portfolio-milestone-table";

const stats = [
  {
    title: "Portfolio Balance",
    value: 0,
    currency: "NGN",
    icon: <Wallet size={18} color="#000" />,
  },
];

const PortfolioPage = () => {
  usePageTitle("Portfolio", "See what you’ve earned from Approved Milestone");

  return (
    <>
      {/* Dashboard Content */}
      <div className=" flex-1 ">
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat) => (
              <StatCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                icon={stat.icon}
                currency={stat.currency}
              />
            ))}
            <StatCard2
              icon={<Wallet size={18} color="#000" />} // Replace with actual star icon
              title="Most Valued of your assets"
              subtitle="Cosgrove Sunrise Villas"
              change={{
                value: "+7.5%",
                isPositive: true,
              }}
              additionalInfo="123 units sold today"
            />
          </div>

          <PortfolioMilestoneTable />
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;
