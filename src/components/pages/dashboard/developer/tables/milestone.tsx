import { createColumnHelper } from "@tanstack/react-table";

// Define the type for asset data
interface AssetData {
  id: number;
  assets: string;
  phase: number;
  status: "Completed" | "In Progress" | "Not Started";
  completionDate: string;
  revenueAccrued: string;
  actions: string;
}

// Sample data extracted from the screenshot
export const assetData: AssetData[] = [
  // {
  //   id: 1,
  //   assets: "Cosgrove Greenview Apartments",
  //   phase: 1,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
  // {
  //   id: 2,
  //   assets: "Cosgrove Sunrise Villas",
  //   phase: 2,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
  // {
  //   id: 3,
  //   assets: "Cosgrove Ocean Breeze Residences",
  //   phase: 1,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
  // {
  //   id: 4,
  //   assets: "Cosgrove Pinecrest Heights",
  //   phase: 4,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
  // {
  //   id: 5,
  //   assets: "Cosgrove Harmony Towers",
  //   phase: 3,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
  // {
  //   id: 6,
  //   assets: "Cosgrove Lakeside Retreat",
  //   phase: 4,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
  // {
  //   id: 7,
  //   assets: "Cosgrove Emerald Hills Apartments",
  //   phase: 7,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
  // {
  //   id: 8,
  //   assets: "Cosgrove Emerald Hills Apartments",
  //   phase: 9,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
  // {
  //   id: 9,
  //   assets: "Cosgrove Prime Business Hub",
  //   phase: 3,
  //   status: "Completed",
  //   completionDate: "22-Feb-2025",
  //   revenueAccrued: "120,000 ( Released)",
  //   actions: "See details",
  // },
];

// Create column helper
const columnHelper = createColumnHelper<AssetData>();

// Define the columns for the table
export const assetColumns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
          id="select-all-rows"
        checked={table.getIsAllRowsSelected()}
        onChange={(e) => table.toggleAllRowsSelected(!!e.target.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        id={`row-select-${row.id}`}
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("assets", {
    header: () => "Assets",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phase", {
    header: () => "Phase",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => {
      const status = info.getValue();
      return (
        <div className="flex items-center">
          <div className="bg-[#ECFDF3] rounded-full py-1 px-2">
            <span className="inline-block w-2 h-2 bg-green-600 mr-2 rounded-full"></span>
            <span className="text-green-700">{status}</span>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("completionDate", {
    header: () => "Completion Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("revenueAccrued", {
    header: () => "Revenue Accrued(NGN)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("actions", {
    header: () => "Actions",
    cell: (info) => (
      <button className="text-gray-600 hover:underline">
        {info.getValue()}
      </button>
    ),
  }),
];

// For interactive table with open functionality
export const interactiveAssetColumns = ({
  onOpen,
}: {
  onOpen: (asset: string) => void;
}) => [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <input
        type="checkbox"
        checked={table.getIsAllRowsSelected()}
        onChange={(e) => table.toggleAllRowsSelected(!!e.target.checked)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <input
        type="checkbox"
        checked={row.getIsSelected()}
        onChange={(e) => row.toggleSelected(!!e.target.checked)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("assets", {
    header: () => "Assets",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("phase", {
    header: () => "Phase",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("status", {
    header: () => "Status",
    cell: (info) => {
      const status = info.getValue();
      return (
        <div className="flex items-center">
          <span className="inline-block w-2 h-2 bg-green-500 mr-2"></span>
          <span>{status}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("completionDate", {
    header: () => "Completion Date",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("revenueAccrued", {
    header: () => "Revenue Accrued(NGN)",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("actions", {
    header: () => "Actions",
    cell: (info) => (
      <button
        className="text-gray-600 hover:underline"
        onClick={() => onOpen(info.row.original.assets)}
      >
        {info.getValue()}
      </button>
    ),
  }),
];
