/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileSpreadsheet, Trophy, User } from "lucide-react";
import useDashboardTitle from "@/hooks/use-page-title";
import { Wallet } from "iconsax-react";
import { formatLargeNumber, formatNumber } from "@/utils/base";

interface RevenueData {
  month: string;
  value: number | null;
}

const InsightPage = () => {
  useDashboardTitle("Insight");
  const [selectedDistribution, setSelectedDistribution] = useState("AGE");
  const [currentRevenue, setCurrentRevenue] = useState(1208230902);

  // Revenue chart data
  const revenueData: RevenueData[] = [
    { month: "JAN", value: 800000000 },
    { month: "FEB", value: 950000000 },
    { month: "MAR", value: 850000000 },
    { month: "APR", value: 900000000 },
    { month: "MAY", value: 750000000 },
    { month: "JUN", value: 880000000 },
    { month: "JUL", value: 1100000000 },
    { month: "AUG", value: 1208230902 },
    { month: "SEP", value: null },
    { month: "OCT", value: null },
  ];

  // User distribution data
  const distributionData: Record<
    string,
    { name: string; value: number; color: string }[]
  > = {
    AGE: [
      { name: "18-24", value: 15, color: "#FB923C" },
      { name: "25-34", value: 20, color: "#FED7AA" },
      { name: "35-44", value: 40, color: "#3B82F6" },
      { name: "45-54", value: 15, color: "#EF4444" },
      { name: "55+", value: 10, color: "#14B8A6" },
    ],
    GENDER: [
      { name: "Male", value: 55, color: "#3B82F6" },
      { name: "Female", value: 45, color: "#FB923C" },
    ],
    LOCATION: [
      { name: "Lagos", value: 35, color: "#3B82F6" },
      { name: "Abuja", value: 25, color: "#FB923C" },
      { name: "Port Harcourt", value: 20, color: "#14B8A6" },
      { name: "Kano", value: 12, color: "#EF4444" },
      { name: "Others", value: 8, color: "#FED7AA" },
    ],
    AMOUNT: [
      { name: "< ₦100k", value: 30, color: "#FB923C" },
      { name: "₦100k - ₦500k", value: 35, color: "#3B82F6" },
      { name: "₦500k - ₦1M", value: 20, color: "#14B8A6" },
      { name: "> ₦1M", value: 15, color: "#EF4444" },
    ],
  };

 

  // Simulate real-time revenue updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRevenue((prev) => prev + Math.floor(Math.random() * 10000));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const renderCustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active: boolean;
    payload: any;
    label: string;
  }) => {
    if (
      active &&
      payload &&
      payload.length &&
      label &&
      payload[0].value &&
      typeof payload[0].value === "number"
    ) {
      return (
        <div className="bg-black text-white px-3 py-2 rounded-lg text-sm">
          <p>{`${label}: ${formatLargeNumber(payload[0].value)}`}</p>
        </div>
      );
    }
    return null;
  };

  const renderPieTooltip = ({
    active,
    payload,
  }: {
    active: boolean;
    payload: any;
  }) => {
    if (
      active &&
      payload &&
      payload.length &&
      payload[0].name &&
      payload[0].value &&
      typeof payload[0].value === "number"
    ) {
      return (
        <div className="bg-black text-white px-3 py-2 rounded-lg text-sm">
          <p>{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="">
      <div className="max-w-7xlmx-auto">
        {/* Header */}
        <h1 className="text-lg font-semibold text-gray-900 mb-8">
          Metrics Overview
        </h1>

        {/* First Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Platform Revenue */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <Card className="h-full border-none bg-[#E7E7E7] shadow-none">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Platform Revenue Till Date
                    </h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <Badge variant="secondary" className="bg-black text-white">
                      Nigerian Naira (NGN)
                    </Badge>
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      {formatNumber(currentRevenue)}
                    </div>
                    <p className="text-sm text-gray-500">
                      One billion, two hundred and eight thousand....
                    </p>
                  </div>

                  <div className="h-64 mt-6">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <XAxis
                          dataKey="month"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: "#6B7280" }}
                        />
                        <YAxis hide />
                        <Tooltip
                          content={(e) => renderCustomTooltip(e as any)}
                        />
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#000000"
                          strokeWidth={2}
                          dot={false}
                          connectNulls={false}
                        />
                        {/* Highlight current month */}
                        <Line
                          type="monotone"
                          dataKey="value"
                          stroke="#000000"
                          strokeWidth={2}
                          dot={{ fill: "#000000", strokeWidth: 2, r: 4 }}
                          activeDot={{ r: 6, fill: "#000000" }}
                        />
                      </LineChart>
                    </ResponsiveContainer>

                    {/* Current value indicator */}
                    <div className="flex justify-end mt-2">
                      <div className="bg-black text-white px-3 py-1 rounded text-sm">
                        ₦ 922,343,232
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Second Row */}
              <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
                {/* Active Projects */}
                <Card className="border-none bg-white shadow-none bg-gradient-to-br from-white to-yellow-50 col-span-2">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Active Projects
                      </h3>
                      <FileSpreadsheet className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-gray-900">232</div>
                    {/* <div className="mt-4 h-2 bg-yellow-200 rounded-full"></div> */}
                  </CardContent>
                </Card>

                {/* Top Performing Stock */}
                <Card className="col-span-3 border-none bg-white shadow-none bg-gradient-to-br from-white to-blue-100">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Top Performing Stock
                      </h3>
                      <Trophy className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-gray-900">
                        Billey & Havillah
                      </h4>
                      <p className="text-sm text-gray-600">SkyHomes</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">232</span>
                      <span className="text-sm text-gray-600">Purchases,</span>
                      <span className="text-green-600 font-medium">
                        +13 Today
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Account Approvals */}
                <Card className="border-none bg-white shadow-none bg-gradient-to-b from-white via-white to-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Account Approvals
                      </h3>
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-3xl font-bold text-gray-900">
                          1,224
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">
                            Approved
                          </span>
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="border-l border-black border-dotted pl-4">
                        <div className="text-3xl font-bold text-gray-900">
                          4
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-sm text-gray-600">Pending</span>
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Largest Portfolio */}
                <Card className="border-none bg-white shadow-none">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                        Largest Portfolio
                      </h3>
                      <Wallet
                        color="#6a7282"
                        className="w-4 h-4 text-gray-500"
                      />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-gray-900 mb-4">
                      232,392
                    </div>
                    <p className="text-sm text-gray-600">
                      Billey & Havillah SkyHomes
                    </p>
                  </CardContent>
                </Card>

                {/* Empty card for layout */}
                <div></div>
              </div>
            </div>
          </div>

          {/* Registered Platform Users */}
          <div className="space-y-6">
            <Card className="border-none bg-[#E7E7E7] shadow-none">
              <CardHeader className="pb-2">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  Registered Platform Users
                </h3>
              </CardHeader>
              <CardContent className="flex ">
                <div className="text-4xl font-bold text-gray-900 mb-6 w-1/2">
                  1,347
                </div>

                <div className="space-y-4 w-1/2 border-l border-black border-dotted pl-4">
                  <div className="flex flex-col ">
                    <span className="text-sm text-gray-600">Developers</span>
                    <span className="text-2xl font-bold">232</span>
                  </div>
                  <div className="border-t border-black border-dotted"></div>
                  <div className="flex flex-col ">
                    <span className="text-sm text-gray-600">
                      Retail Investors
                    </span>
                    <span className="text-2xl font-bold">232</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* User Distribution Chart */}
            <Card className="border-none bg-[#E7E7E7] shadow-none">
              <CardHeader className="pb-2">
                <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
                  User Distribution
                </h3>
                <div className="flex gap-1">
                  {["AGE", "GENDER", "LOCATION", "AMOUNT"].map((type) => (
                    <Button
                      key={type}
                      variant={"ghost"}
                      size="sm"
                      onClick={() => setSelectedDistribution(type)}
                      className={`text-xs border-none bg-transparent ${
                        selectedDistribution === type
                          ? "bg-black text-white"
                          : "bg-white text-gray-600 border-gray-300"
                      }`}
                    >
                      {type}
                    </Button>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={distributionData[selectedDistribution]}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                        stroke="none"
                      >
                        {distributionData[selectedDistribution].map(
                          (entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          )
                        )}
                      </Pie>
                      <Tooltip content={(e) => renderPieTooltip(e as any)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="mt-4 space-y-2">
                  {distributionData[selectedDistribution]
                    .slice(0, 3)
                    .map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-gray-600">{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  {selectedDistribution === "AGE" && (
                    <div className="text-right">
                      <div className="text-lg font-bold">40%</div>
                      <div className="text-xs text-gray-500">Age 35-44</div>
                      <div className="text-xs text-gray-400">
                        "Kids shop, I buy shares"
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightPage;
