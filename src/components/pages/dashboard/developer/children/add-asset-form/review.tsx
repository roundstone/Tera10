import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CloseCircle, Edit2 } from "iconsax-react";
import IMAGES from "@/assets/images";
import AppModal from "@/components/common/modal";
import ComplianceDocumentUpload from "../../modals/compliants-doc";
import { useAsset } from '@/context/AssetContext';
import { assetApi } from '@/api/assetApi';
import { stat } from "fs";

const PreviewSubmit = ({
  gotoStep,
}: {
  gotoStep: (step: number) => void;
}) => {
  const [open, setOpen] = React.useState(false);
  const { state, dispatch } = useAsset();
  const [propertyData, setPropertyData] = useState<any>(null)


  const handleEdit = (assetId: number, step: number) => {
    dispatch({ type: 'SET_EDIT_ASSET_ID', payload: assetId });
    gotoStep(step)
  };

  const handleRemoveImage = async (mediaId: number) => {
    try {
      const response = await assetApi.deleteMedia(mediaId);
      if (response.success) {

        fetchAsset(state.assetId!);
      }
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };


  const handleSubmit = async () => {
    // Process the milestone being edited or create a new one

    try {

      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });




      //const response = await assetApi.unitPrice(state.assetId!, data);
      const response = await assetApi.updateAssetStatus(state.assetId!, 'pending');

      if (response.success) {

        setOpen(true);

      } else {
        dispatch({ type: 'SET_ERROR', payload: response.message });
      }
    } catch (error) {
      console.log("error>>", error);
      dispatch({ type: 'SET_ERROR', payload: 'An error occurred' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }



  };



  const fetchAsset = async (assetId: number) => {
    try {
      const response = await assetApi.getAsset(assetId);
      if (response.success) {
        setPropertyData(response.data?.data)
      }
    } catch (error) {
      console.error('Error fetching milestones:', error);
    }
  };

  useEffect(() => {
    if (state.assetId) {
      fetchAsset(state.assetId);
    }

  }, []);


  return (
    <>
      {propertyData &&
        <>
          <div className="max-w-3xl mx-auto space-y-32">
            {/* Basic Information Section */}
            <div className="">
              <div className="flex items-center justify-between mb-4 gap-2">
                <h2 className="text-green-500 font-medium flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Basic
                </h2>
                <div className="w-full h-px bg-gray-300"></div>
                <Button
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700 p-1 h-auto"
                  onClick={() => handleEdit(propertyData.asset.id, 0)}
                >
                  Edit <Edit2 size={16} color="#6a7282" className="ml-1" />
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4  text-[#667085] items-center">
                <div className="col-span-1 text-gray-600 font-semibold">
                  Property Name:
                </div>
                <div className="col-span-2 text-right font-light">
                  {propertyData.asset.property_name}
                </div>

                <div className="col-span-1 text-gray-600 font-semibold">
                  Location
                </div>
                <div className="col-span-2 text-right font-light">
                  {propertyData.asset.property_location}
                </div>

                <div className="col-span-1 text-gray-600 font-semibold">
                  Description
                </div>
                <div className="col-span-2 text-right font-light">
                  {propertyData.asset.property_desc}
                </div>

                <div className="col-span-1 text-gray-600 font-semibold">
                  Media Files
                </div>
                <div className="col-span-2">
                  <div className="flex flex-wrap gap-2 justify-end">
                    {propertyData.asset.media.map((image: any, index: number) => (
                      <div key={index} className="relative">
                        <img
                          src={`${import.meta.env.VITE_BASE_URL}/${image.file}`}
                          alt={`Property image ${index + 1}`}
                          className="w-24 h-16 object-cover rounded-md"
                        />
                        <button
                          className="absolute -top-2 -left-2 bg-white rounded-full p-0.5"
                          onClick={() => handleRemoveImage(image.id)}
                        >
                          <CloseCircle size={16} color="#374151" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="">
              <div className="flex items-center mb-5 gap-2">
                <h2 className="text-green-500  font-medium flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Pricing
                </h2>
                <div className="w-full h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4 text-[#667085] items-center">
                <div className="col-span-1 text-gray-600 font-semibold">
                  Unit Price
                </div>
                <div className="col-span-2 text-right font-light">
                  {propertyData.asset.unit_price}
                </div>

                <div className="col-span-1 text-gray-600 font-semibold">
                  Available Unit
                </div>
                <div className="col-span-2 text-right font-light">
                  {propertyData.asset.unit_available}
                </div>

                <div className="col-span-1 text-gray-600 font-semibold">
                  Max Per individual
                </div>
                <div className="col-span-2 text-right font-light">
                  {propertyData.asset.max_per_person}
                </div>
              </div>
            </div>

            {/* Milestones Section */}
            <div className="">
              <div className="flex items-center  mb-5">
                <h2 className="text-green-500  font-medium flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Milestones
                </h2>
              </div>

              {propertyData.asset.milestones.map((milestone: any, index: any) => (
                <div key={index} className="flex items-start mb-16">
                  {/* Left Side: Phase and Line */}
                  <div className="relative flex flex-col items-center justify-center self-center w-24">
                    <span className="text-sm font-semibold text-gray-700 mb-2">
                      Phase {index + 1}
                    </span>

                    {/* Line - only if not the last milestone */}
                    {index !== propertyData.asset.milestones.length - 1 && (
                      <>
                        <div
                          className="w-px h-full bg-gray-300"
                          style={{ height: "" }}
                        />
                      </>
                    )}
                  </div>

                  {/* Right Side: Milestone Content */}
                  <div className="flex-1 pl-4 text-[#667085]">
                    <div className="flex flex-col items-end">
                      <div className="text-right font-medium">
                        {milestone.phase_name}
                      </div>
                      <div className="text-right  text-sm">
                        {milestone.start_date}
                      </div>
                      <div className="text-right mt-2 max-w-[396.5px]">
                        {milestone.end_date}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-end mt-4">
                      {milestone.media.map((image: any, imgIndex: any) => (
                        <div key={imgIndex} className="relative">
                          <img
                            src={`${import.meta.env.VITE_BASE_URL}/${image.file}`}
                            alt={`Milestone image ${imgIndex + 1}`}
                            className="w-24 h-16 object-cover rounded-md"
                          />
                          <button
                            className="absolute -top-2 -left-2 bg-white rounded-full p-0.5"
                            onClick={() =>
                              handleRemoveImage(image.id)
                            }
                          >
                            <CloseCircle size={16} color="#374151" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <Button className="px-8 py-2 rounded-full" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </div>


          <AppModal
            open={open}
            setOpen={setOpen}
            title="Upload Property License Document"
            className="sm:max-w-[588px] bg-white"
          >
            <ComplianceDocumentUpload propertyName={state.formData.step1.propertyName} />
          </AppModal>
        </>
      }
    </>
  );
};

export default PreviewSubmit;
