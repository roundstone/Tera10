import usePageTitle from "@/hooks/use-page-title";
import { useState } from "react";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";

import { ArrowLeft2 } from "iconsax-react";
import { PricingForm } from "./children/add-asset-form/pricing";
import BasicForm from "./children/add-asset-form/basic";
import MilestonesForm from "./children/add-asset-form/milestone";
import PreviewSubmit from "./children/add-asset-form/review";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AssetProvider } from "@/context/AssetContext";

const steps = ["Basic", "Pricing", "Milestones", "Submit"];

const AddAssetPage = () => {
  usePageTitle("Add New Asset");
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const nextStep = async () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  const gotoStep = async (stp: number) =>
    setStep(stp);

  // const onSubmit = (data: FormData) => {
  //   toast.success("Asset submitted!");
  //   console.log("Full Submission:", { data, ...files });
  // };

  const renderStep = () => {
    switch (step) {
      case 0:
        return <BasicForm onFinish={nextStep} />;
      case 1:
        return <PricingForm onFinish={nextStep} onPrevious={prevStep} gotoStep={gotoStep} />;
      case 2:
        return <MilestonesForm onFinish={nextStep} onPrevious={prevStep} />;
      case 3:
        return <PreviewSubmit gotoStep={gotoStep} />;
    }
  };

  return (
    <AssetProvider>
      <div className="">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex gap-3 text-gray-500 items-center font-semibold">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="bg-gray-100 border border-gray-200 rounded-full p-5"
            >
              <ArrowLeft2 color="#888888" size={18} />
            </Button>
            <span>Add New Asset</span>
          </div>


          {/* <FormField
        // control={form.control}
        name="propertyType"
        render={({ field }) => (
          <FormItem>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger className="w-[320px]">
                  <SelectValue placeholder="Select a property type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="React Estate">
                  <Buildings2 color="#888888" size={32} /> React Estate
                </SelectItem>
                <SelectItem value="Land">
                  <Buildings2 color="#888888" size={32} /> Land
                </SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      /> */}

          <div className="flex items-center gap-8 text-sm">
            {steps.map((label, index) => (
              <span
                key={label}
                className={`${step === index
                  ? "text-green-600 font-medium"
                  : index < step
                    ? "bggray-400  text-green-700"
                    : " text-gray-400"
                  }`}
              >
                ● {label}
              </span>
            ))}
          </div>

          {/* select */}
          {/* Step Title  Preview & Submit*/}
          <h2 className="text-xl font-semibold mb-6">
            {steps[step] == "Submit" ? " Preview & Submit" : steps[step]}
          </h2>
        </div>
        {/* Step Form */}
        {renderStep()}
      </div>
    </AssetProvider>
  );

  return <>{/* <AddAssetForm /> */}</>;
};

export default AddAssetPage;
