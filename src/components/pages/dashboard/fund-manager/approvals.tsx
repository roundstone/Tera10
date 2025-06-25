import usePageTitle from "@/hooks/use-page-title";
import InvestmentCard from "./children/investment-cards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "iconsax-react";
import ApprovalTable from "./children/approval-table";
import DeveloperProfileReview from "./children/developer-profile";
import StockPriceAdjustmentRequest from "./children/stock-price";

const ApprovalPage = () => {
  usePageTitle("Approvals");

  const investments = [
    {
      name: "Greenview Apartments",
      company: "TechVest Capital",
      target: "$5M Target",
      submittedDate: "Jan 15, 2025",
      investmentType: "Equity",
      industry: "Technology",
      stage: "Series A",
    },
    {
      name: "Production Zone Towers",
      company: "TechVest Capital",
      target: "$5M Target",
      submittedDate: "Jan 15, 2025",
      investmentType: "Equity",
      industry: "Technology",
      stage: "Series A",
    },
    {
      name: "Riverside Lifestyle Center",
      company: "TechVest Capital",
      target: "$5M Target",
      submittedDate: "Jan 15, 2025",
      investmentType: "Equity",
      industry: "Technology",
      stage: "Series A",
    },
  ];

  return (
    <>
      <div className=" flex-1 ">
        {/* Dashboard Content */}
        <Tabs defaultValue="account" className="">
          <TabsList className="grid w-full grid-cols-3 bg-[#EEEEF0] rounded-md w-[788px]">
            <TabsTrigger
              value="account"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md"
            >
              Milestone Approval (21)
            </TabsTrigger>
            <TabsTrigger
              value="password"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md"
            >
              <User color="#000" size={15} />
              <span>Developer Profile Review (16)</span>
            </TabsTrigger>
            <TabsTrigger
              value="stock"
              className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md"
            >
              Stock Price Adjustment request (32)
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            <ApprovalTable />
          </TabsContent>
          <TabsContent value="password">
            <DeveloperProfileReview />
          </TabsContent>
          <TabsContent value="stock">
            <StockPriceAdjustmentRequest />
          </TabsContent>
        </Tabs>
        <div className=" flex-1 hidden">
          <div className="space-y-6">
            <div className="p-6max-w-4xl mx-auto">
              {investments.map((investment, index) => (
                <InvestmentCard
                  key={index}
                  name={investment.name}
                  company={investment.company}
                  target={investment.target}
                  submittedDate={investment.submittedDate}
                  investmentType={investment.investmentType}
                  industry={investment.industry}
                  stage={investment.stage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApprovalPage;

// Main App Component
// export default function InvestmentReviewDashboard() {
//   const investments = [
//     {
//       name: "Greenview Apartments",
//       company: "TechVest Capital",
//       target: "$5M Target",
//       submittedDate: "Jan 15, 2025",
//       investmentType: "Equity",
//       industry: "Technology",
//       stage: "Series A"
//     },
//     {
//       name: "Production Zone Towers",
//       company: "TechVest Capital",
//       target: "$5M Target",
//       submittedDate: "Jan 15, 2025",
//       investmentType: "Equity",
//       industry: "Technology",
//       stage: "Series A"
//     },
//     {
//       name: "Riverside Lifestyle Center",
//       company: "TechVest Capital",
//       target: "$5M Target",
//       submittedDate: "Jan 15, 2025",
//       investmentType: "Equity",
//       industry: "Technology",
//       stage: "Series A"
//     }
//   ];

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       {investments.map((investment, index) => (
//         <InvestmentCard
//           key={index}
//           name={investment.name}
//           company={investment.company}
//           target={investment.target}
//           submittedDate={investment.submittedDate}
//           investmentType={investment.investmentType}
//           industry={investment.industry}
//           stage={investment.stage}
//         />
//       ))}
//     </div>
//   );
// }
