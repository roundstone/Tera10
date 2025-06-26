/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useState,
} from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAsset } from '@/context/AssetContext';
import { assetApi } from '@/api/assetApi';
// import { Upload } from "iconsax-react";

const ComplianceDocumentUpload = ({
  propertyName
}: {
  propertyName: string
}) => {
  const [files, setFiles] = useState<any>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { state, dispatch } = useAsset();

  const handleFileChange = (e: any) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      alert("Please upload a compliance document before submitting.");
      return;
    }

    setIsUploading(true);

    // Simulate upload process
    setTimeout(() => {
      console.log("Files submitted:", files);
      setIsUploading(false);
      toast.success(
        "You have successfully created an asset for listing. This would be reviewed shortly and decided upon"
      );
      // Navigate or show success message here
    }, 1500);
  };

  return (
    <div className="">
      <h1 className="text-sm font-medium text-gray-800 mb-2">Upload Files</h1>

      {/* File Upload Area */}
      <div className="border border-dashed border-gray-300 rounded-lg p-10 mb-8 flex flex-col items-center justify-center">
        <input
          type="file"
          id="file-upload"
          accept=".gif,.jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
          multiple
        />
        <label
          htmlFor="file-upload"
          className="bg-white border border-gray-300 rounded-lg py- px-3 cursor-pointer hover:bg-gray-50 transition-colors mb-4"
        >
          Add files
        </label>
        <p className="text-gray-600 text-sm">Accepts .gif, .jpg, and .png</p>

        {files.length > 0 && (
          <div className="mt-4 w-full">
            <p className="text-sm font-medium text-gray-700 mb-2">
              Selected files:
            </p>
            <ul className="text-sm text-gray-600">
              {files.map(
                (
                  file: {
                    name:
                    | string
                    | number
                    | bigint
                    | boolean
                    | ReactElement<
                      unknown,
                      string | JSXElementConstructor<any>
                    >
                    | Iterable<ReactNode>
                    | ReactPortal
                    | Promise<
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactPortal
                      | ReactElement<
                        unknown,
                        string | JSXElementConstructor<any>
                      >
                      | Iterable<ReactNode>
                      | null
                      | undefined
                    >
                    | null
                    | undefined;
                  },
                  index: Key | null | undefined
                ) => (
                  <li key={index} className="flex items-center gap-2">
                    <span>📄</span> {file.name}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Compliance Document Section */}
      <h2 className="text-sm font-medium text-gray-800 mb-4">
        Compliance document for{" "}
        <span className="underline">{propertyName}</span>
      </h2>

      <p className="text-[#667085] mb-8">
        To ensure compliance with real estate regulations, all property listings
        must include a valid property license document. Please upload a clear
        and verifiable copy of the official license for this asset.
      </p>

      {/* Legal Notes */}
      <h3 className="text-sm font-medium text-gray-800 mb-4">
        Legal Compliance Note
      </h3>

      <ul className="space-y-4 mb-12">
        <li className="flex items-start gap-2 text-[#667085]">
          <span className="text-sm mt-0.5">•</span>
          <span>
            The uploaded document must be a government-issued property license
            or an officially recognized equivalent.
          </span>
        </li>
        <li className="flex items-start gap-2 text-[#667085]">
          <span className="text-sm mt-0.5">•</span>
          <span>
            Forgery or misrepresentation of property documents may result in
            legal action and permanent account suspension.
          </span>
        </li>
        <li className="flex items-start gap-2 text-[#667085]">
          <span className="text-sm mt-0.5">•</span>
          <span>
            By uploading this document, you confirm that the information
            provided is accurate and legally binding.
          </span>
        </li>
      </ul>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={isUploading}
        className="rounded-full"
      >
        {isUploading ? "Uploading..." : "Submit"}
      </Button>
    </div>
  );
};

export default ComplianceDocumentUpload;
