import React from "react";
import IMAGES from "@/assets/images";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import usePageTitle from "@/hooks/use-page-title";
import { formatDateRange } from "@/utils/string";
import {
  ArrowDown2,
  CloseCircle,
  Edit2,
  Messages1,
  Moneys,
  Receipt,
  SearchNormal,
  Trash,
} from "iconsax-react";
import { assetApi } from "@/api/assetApi";


interface ProjectPhase {
  phase_n: number;
  phase: string;
  title: string;
  dateRange: string;
  description: string;
  images: string[];
}

interface MilestoneProps {
  id: string;
  projectName: string;
  milestones: ProjectPhase[]
}


const MilestonePage = () => {
  usePageTitle("Milestone");

  const [search, setSearch] = React.useState("");
  const [assets, setAssets] = React.useState<MilestoneProps[]>([]);
  const [selectedAssetId, setSelectedAssetId] = React.useState<string | null>(null);
  const [filteredMilestones, setFilteredMilestones] = React.useState<ProjectPhase[] | null>(null)
  const [selectedMilestone, setSelectedMilestone] = React.useState<ProjectPhase | null>(null);




  const fetchAssets = async () => {
    try {
      const response = await assetApi.getAssetListingHavingMilestone();
      if (response.success) {


        const formattedAssets = response.data.data.assets.map((asset: any) => ({
          id: asset.id,
          projectName: asset.property_name,
          milestones: asset.milestones?.map((milestone: any, index: number) => ({
            phase_n: index + 1,
            phase: milestone.phase_name,
            title: asset.property_name,
            dateRange: `${new Date(milestone.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} - ${new Date(milestone.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
            description: milestone.activities,
            images: milestone.media || [],
          })) || []
        }));


        setAssets(formattedAssets);
        if (formattedAssets.length > 0) {
          setSelectedAssetId(formattedAssets[0].id); // Select first asset by default
        }


      }
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  React.useEffect(() => {
    fetchAssets();
  }, []);

  React.useEffect(() => {
    const asset = assets.find((asset) => asset.id == selectedAssetId);

    if (selectedAssetId && asset) {
      console.log(">>", asset);
      setFilteredMilestones(asset
        ? asset.milestones
        : []);

      console.log(filteredMilestones);

    }
  }, [selectedAssetId, assets]);

  return (
    <div className="md:grid grid-cols-5 gap-4">
      {/* Sidebar */}
      <div className="md:col-span-2 md:border-r border-[#E7E9F1] md:pr-10">
        <div className="flex gap-4 items-center mb-6">
          <div className="relative flex-1">
            <SearchNormal
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
              color="#777777"
            />
            {/* <Input
              placeholder="Search"
              className="pl-10 rounded-xl h-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            /> */}
            <select
              name="asset"
              className="w-full rounded-xl h-8 border border-gray-300 px-2 pl-10 rounded-xl h-8"
              onChange={(e) => setSelectedAssetId(e.target.value)}
              value={selectedAssetId || ""}
            >
              <option value="" disabled>
                Select asset
              </option>
              {assets?.map((asset: any) => (
                <option key={asset.id} value={asset.id.toString()}>
                  {asset.projectName}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-4">

          {filteredMilestones && filteredMilestones.map((milestone: any) => (
            <Card
              key={milestone.id}
              onClick={() => setSelectedMilestone(milestone)}
              className="mb-4 p-2 shadow-none border-gray-200 border w-full !mi-w-[424px] h-[282px] hover:cursor-pointer"
            >
              <CardContent className="p-2">
                <div className="h-32 bg-gray-100 rounded-xl mb-2" />
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-medium text-slate-700">
                    Phase {milestone.phase_n}
                  </h3>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Trash size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <Edit2 size={20} />
                    </Button>
                  </div>
                </div>
                <p className="text-lg text-slate-600 mb-2">{milestone.phase}</p>
                <div className="text-sm text-gray-500">
                  {milestone.dateRange}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="col-span-3">
        {selectedMilestone && (
          <MilestoneDetails milestone={selectedMilestone} />
        )}
      </div>
    </div>
  );
};

export default MilestonePage;

function MilestoneDetails({ milestone }: { milestone: ProjectPhase }) {
  return (
    <div className="px-6">
      <h1 className="text-2xl font-medium text-gray-400 mb-1">Milestones</h1>
      <h2 className="text-sm text-gray-500 mb-6">
        {milestone?.title}
      </h2>

      <div className="flex max-md:flex-col items-center gap-4 mb-8">
        <div className="mb- relative">
          {/* <select
            name="phase"
            className="flex items-center justify-between w-64 px-4 py-1 rounded-lg border border-gray-300 text-gray-700 appearance-none"
            onChange={(e) => console.log(e.target.value)}
          >
            <option value="Phase 1">Phase 1</option>
            <option value="Phase 2">Phase 2</option>
            <option value="Phase 3">Phase 3</option>
            <option value="Phase 4">Phase 4</option>
          </select>
          <ArrowDown2
            size={20}
            color="#4a5565"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none"
          />
          */}
        </div>
        <div className="flex items-center gap-2">
          <Moneys size={20} color="#4a5565" />
          <span className="text-gray-700 font-medium">Funding</span>
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
            Pending
          </span>
        </div>
      </div>


      <div key={milestone.phase_n} className="flex items-center mb-16">
        <div className="relative w-24 flex flex-col items-center">
          <span className="text-sm font-semibold text-gray-700 mb-2">
            Phase {milestone.phase_n}
          </span>
          {/* {index !== (milestone.milestones?.length || 0) - 1 && (
            <div className="w-px h-full bg-gray-300" />
          )} */}
        </div>

        <div className="flex-1 pl-4 text-[#667085]">
          <div className="text-right">
            <div className="font-medium">{milestone.title}</div>
            <div className="text-sm">{milestone.dateRange}</div>
            <p className="mt-2 max-w-md ml-auto">
              {milestone.description}
            </p>
          </div>

          <div className="flex md:flex-wrap gap-2 justify-end mt-4">
            {milestone.images.map((img: any, imgIndex) => (
              <div key={imgIndex} className="relative">
                <img
                  src={`${import.meta.env.VITE_BASE_URL}/${img?.file || ''}`}
                  alt={`Milestone ${imgIndex + 1}`}
                  className="w-24 h-16 object-cover rounded-md"
                />
                <button className="absolute -top-2 -left-2 bg-white rounded-full p-0.5">
                  <CloseCircle size={16} color="#374151" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div className="flex max-md:flex-col gap-3 items-center justify-between py-4 border-t border-gray-200 mb-8">
        <div className="flex items-center gap-2">
          <Receipt size={20} className="text-gray-600" color="#4a5565" />
          <span className="font-medium text-gray-700">Milestone Status</span>
          {/* <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Completed
          </span> */}
          <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm flex items-center">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2" />
            Pending
          </span>
        </div>
        <button className="bg-white border border-gray-300 px-4 py-1 shadow rounded-lg text-gray-700">
          Request Funding
        </button>
      </div>

      {/* Conversations Section */}
      <div className="border border-gray-200 rounded-lg p-14 flex flex-col items-center justify-center text-center">
        <div className=" mb-4">
          <Messages1
            size={32}
            stroke=""
            className="text-gray-500"
            color="#4a5565"
          />
        </div>
        <h3 className="text-gray-500 mb-2 text-base">
          Your conversations with the fund
        </h3>
        <p className="text-gray-500">manager will appear</p>
      </div>
    </div>
  );
}
