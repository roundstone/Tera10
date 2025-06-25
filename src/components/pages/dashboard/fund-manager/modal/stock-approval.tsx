import { Button } from "@/components/ui/button";

interface StockApprovalProps {
  onConfirm: () => void;
}

const StockApproval = ({ onConfirm }: StockApprovalProps) => {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-light text-2xl">
        This action will automatically updated asset price across many instances
      </h2>
      <p className="text-gray-600">
        Are you sure you want to proceed with this?
      </p>
      <Button className="w-fit rounded-full mt-10" onClick={onConfirm}>
        Confirm Approve
      </Button>
    </div>
  );
};

export default StockApproval;
