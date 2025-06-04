import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useDashboardTitle from "@/hooks/use-page-title";

const ProfilePage = () => {
  useDashboardTitle("Profile");
  const [activities] = useState([
    {
      id: 1,
      date: "19 May, 2025",
      time: "18:59",
      action: "Approved Milestone",
      milestone: "Phase One, Palm Height City",
    },
    {
      id: 2,
      date: "18 May, 2025",
      time: "18:59",
      action: "Approved Milestone",
      milestone: "Phase One, Palm Height City",
    },
    {
      id: 3,
      date: "19 May, 2025",
      time: "18:59",
      action: "Approved Milestone",
      milestone: "Phase One, Palm Height City",
    },
    {
      id: 4,
      date: "20 May, 2025",
      time: "18:59",
      action: "Approved Milestone",
      milestone: "Phase One, Palm Height City",
    },
    {
      id: 5,
      date: "21 May, 2025",
      time: "18:59",
      action: "Approved Milestone",
      milestone: "Phase One, Palm Height City",
    },
  ]);

  // Generate zigzag pattern for the chart
  const generateZigzagPath = () => {
    const points = [
      { x: 0, y: 50 },
      { x: 20, y: 20 },
      { x: 40, y: 60 },
      { x: 60, y: 30 },
      { x: 80, y: 70 },
      { x: 100, y: 10 },
    ];

    return points
      .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
      .join(" ");
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Card */}
        <Card className="bg-white shadow-none border-none pt-0 overflow-hidden">
          <CardHeader className="p-0 h-32 m-1 rounded-t-lg bg-gradient-to-r from-[#F6E9DA] to-[#FCFAFD] border-b border-[#E7E9F1]"></CardHeader>
          <CardContent className="p-8 b\[50%]  z-10">
            <div className="flex items-center justify-between -mt-[150px] ">
              {/* Left Section - Profile Info */}
              <div className="flex gap-6">
                <Avatar className="w-25 h-25">
                  <AvatarImage
                    src="/api/placeholder/96/96"
                    alt="Olivia Anayo"
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-300 text-gray-600 text-2xl font-semibold">
                    OA
                  </AvatarFallback>
                </Avatar>
              </div>

              {/* Right Section - Tera 10 Badge and Chart */}

              <div className="text- -mt-10">
                <div className="text-[46.54px] font-bold mb-1 bg-gradient-to-r from-[#F9B8EB] to-[#FFCC00] bg-clip-text text-transparent">
                  Tera 10
                </div>
              </div>

              <div className="text-xs font-semibold tracking-wide -mt-10">
                FUND MANAGER
              </div>

              {/* Mini Chart */}
              <div className="w-[103px] h-[85px] -mt-10">
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 100 80"
                  className="overflow-visible"
                >
                  <path
                    d={generateZigzagPath()}
                    stroke="#F59E0B"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {/* Data points */}
                  <circle cx="0" cy="50" r="2" fill="#F59E0B" />
                  <circle cx="20" cy="20" r="2" fill="#F59E0B" />
                  <circle cx="40" cy="60" r="2" fill="#F59E0B" />
                  <circle cx="60" cy="30" r="2" fill="#F59E0B" />
                  <circle cx="80" cy="70" r="2" fill="#F59E0B" />
                  <circle cx="100" cy="10" r="2" fill="#F59E0B" />
                </svg>
              </div>
            </div>

            <div className="flex-1 pt-5">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                  Olivia Anayo
                </h1>
                <p className="text-gray-500 text-sm">
                  Account Cadre: Fund Manager
                </p>
              </div>

              <div className="space-y-3 text-gray-500">
                <div className="flex items-center">
                  <span className=" w-36">Email:</span>
                  <span className="">olivia@example.com</span>
                </div>
                <div className="flex items-center -mt-2">
                  <span className=" w-36">Phone Number:</span>
                  <span className="">+234 8142 658412</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities Card */}
        <Card className="bg-white shadow-none border-none">
          <CardContent className="p-0">
            <div className="mb-6 px-8">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Recent Activities
              </h2>
              <p className="text-gray-500">on this profile</p>
            </div>

            {/* Activities List */}
            <div className="space-y4 divide-y divide-gray-200 text-sm">
              {activities.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between py-4 px-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-gray-700 font-medium min-w-[120px]">
                      {activity.date}
                    </div>
                    <div className="text-gray-500 font-medium min-w-[60px]">
                      {activity.time}
                    </div>
                  </div>

                  <div className="flex-1 text-right">
                    <span className="text-gray-700">{activity.action}</span>
                    <span className="font-semibold text-gray-900">
                      "{activity.milestone}"
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
