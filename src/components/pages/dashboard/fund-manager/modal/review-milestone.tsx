import { Messages } from "iconsax-react";
import IMAGES from "@/assets/images";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FieldReport from "../children/field-report";
import ProjectReviewForm from "../children/project-review-form";

const ReviewMilestone = () => {
  return (
    <div className="flex gap-3 max-h-[937px] overflow-auto">
      {/* Left Column */}
      <div className="w-1/2 ">
        <h2 className="text-lg font-medium mb-4">Review Milestone</h2>
        <div className="space-y-4">
          <h3 className="text-lg font-normal">Greenview Apartments</h3>
          <div className="flex justify-between items-center text-sm mt-1">
            <p className="text-gray-600 pt-4">
              Developer:{" "}
              <span className="text-[#A68409] font- underline">Bilad</span>
            </p>
            <button className="text-[#888] text-sm flex items-center gap-1">
              Open Chat <Messages color="#888" size={24} />{" "}
            </button>
          </div>

          <div className="">
            <select className="w-fit mt-1 p-2 border rounded-md text-sm">
              <option>Phase 1</option>
            </select>
          </div>

          <div className="flex items-center gap-4 ">
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full font-medium">
              <span className="text-yellow-700">●</span> Fund requested
            </span>
            <span className="text-sm text-gray-600">
              <strong>Request Date:</strong> 02 April, 2025
            </span>
          </div>

          <div className="">
            <h4 className="font-medium mb-2">Milestone Description</h4>
            <p className="text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
              Conduct a thorough site survey and environmental impact assessment
              to ensure compliance with local regulations and identify any
              potential environmental concerns.
            </p>
          </div>

          <div className="">
            <h4 className="text-sm font-medium text-gray-600 mb-2">
              View Before{" "}
              <span className="text-xs ml-2 text-gray-500">12 March, 2025</span>
            </h4>
            <div className="grid grid-cols-3 gap-2 bg-gray-50 rounded-lg p-3">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 h-28 rounded-md overflow-hidden"
                >
                  {/* Replace with actual image tags */}
                  <img
                    src={IMAGES.milestone1}
                    className="w-full h-full object-cover"
                    alt={`Before ${i}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="w-1/2 space-y-4 b-blue-50">
        {/* Revenue Box */}
        <div className="bg-blue-50 rounded-xl p-6 border-t-[5px] border-yellow-300 w-full">
          <h4 className="text-sm text-gray-800">
            REVENUE ACCRUED FOR MILESTONE
          </h4>
          <p className="text-xl font-medium text-gray-800 mt-1">
            NGN 12,980,291
          </p>
          <div className="flex justify-between text-sm mt-4">
            <div className="flex flex-col">
              <span className="text-gray-600 uppercase">
                Proposed Date of Completion
              </span>
              <span className="font-semibold">12 March, 2025</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-600">Date Completed</span>
              <span className="font-semibold">12 March, 2025</span>
              <div className="flex items-center gap-2">
                <div className="bg-green-600 h-2 w-2 rounded-full"></div>
                <span>(On time)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Current Status */}
        <div className="bg-white shadow p-6 rounded-xl border-t-[6px] border-yellow-400">
          <h4 className="font-semibold text-sm mb-2">Current Status</h4>
          <div className="flex gap-2 overflow-auto">
            {[1, 2, 3, 4].map((i) => (
              <img
                key={i}
                src={IMAGES.milestone2}
                className="w-[213px] h-28 object-cover rounded-lg"
                alt="Current"
              />
            ))}
          </div>
        </div>

        {/* Inspection Report */}
        <div className="bg-white shadow p-6 rounded-xl border-t-[6px] border-yellow-400">
          <h4 className="font-semibold mb-4 text-sm text-gray-800">
            Inspection Report
          </h4>

          <Tabs defaultValue="account" className="">
            <TabsList className="grid w-full grid-cols-2 bg-[#EEEEF0] rounded-md w[788px]">
              <TabsTrigger
                value="account"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md"
              >
                Field Report
              </TabsTrigger>
              <TabsTrigger
                value="password"
                className="data-[state=active]:bg-white data-[state=active]:text-black rounded-md"
              >
                {/* <User color="#000" size={15} /> */}
                <span>Financial</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <FieldReport />
            </TabsContent>
            <TabsContent value="password">
              <ProjectReviewForm />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReviewMilestone;
