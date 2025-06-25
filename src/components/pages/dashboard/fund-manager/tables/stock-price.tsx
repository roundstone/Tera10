import { createColumnHelper } from "@tanstack/react-table";
import { useState } from "react";

// Define the type
export interface FundRequestData {
  id: number;
  project: string;
  currentPrice: string;
  entryPrice: string;
  exitPrice: string;
  requestDate: string;
  newRequest: string;
  actions: string;
}

const columnHelper = createColumnHelper<FundRequestData>();

export const fundRequestColumns = (
    onApprove: (row: FundRequestData) => void,
    onReject: (row: FundRequestData) => void
) => [
    columnHelper.display({
        id: "select",
        header: ({ table }) => (
            <input
                type="checkbox"
                checked={table.getIsAllRowsSelected()}
                onChange={(e) => table.toggleAllRowsSelected(!!e.target.checked)}
            />
        ),
        cell: ({ row }) => (
            <input
                type="checkbox"
                checked={row.getIsSelected()}
                onChange={(e) => row.toggleSelected(!!e.target.checked)}
            />
        ),
    }),
    columnHelper.accessor("project", {
        header: () => "Project",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("currentPrice", {
        header: () => "Current Price (NGN)",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("entryPrice", {
        header: () => "Entry Price",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("exitPrice", {
        header: () => "Exit Price",
        cell: ({ row }) => {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const [value, setValue] = useState(row.original.exitPrice);

            return (
                <input
                    type="text"
                    className="border px-2 py-1 rounded w-24"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
            );
        },
    }),
    columnHelper.accessor("requestDate", {
        header: () => "Request Date",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("newRequest", {
        header: () => "New Requests",
        cell: (info) => (
            <span className="text-green-600 font-semibold">{info.getValue()}</span>
        ),
    }),
    columnHelper.display({
        id: "actions",
        header: () => "Actions",
        cell: ({ row }) => (
            <div className="flex space-x-3">
                <button
                    className="text-gray-600 hover:underline"
                    onClick={() => onApprove(row.original)}
                >
                    Approve
                </button>
                <button
                    className="text-gray-600 hover:underline"
                    onClick={() => onReject(row.original)}
                >
                    Reject
                </button>
            </div>
        ),
    }),
];

// Table data from the image
export const fundRequestData: FundRequestData[] = [
  {
    id: 1,
    project: "Greenview Apartments",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "--",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦10,000,000",
    actions: "",
  },
  {
    id: 2,
    project: "Metro Living & Business Hub",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "₦ 8000",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦7,000,000",
    actions: "",
  },
  {
    id: 3,
    project: "Harborview Mixed-Use Complex",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "₦ 8000",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦7,000,000",
    actions: "",
  },
  {
    id: 4,
    project: "Unity Square Development",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "₦ 8000",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦7,000,000",
    actions: "",
  },
  {
    id: 5,
    project: "Industrial Gateway Complex",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "₦ 8000",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦7,000,000",
    actions: "",
  },
  {
    id: 6,
    project: "Warehouse District 42",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "₦ 8000",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦7,000,000",
    actions: "",
  },
  {
    id: 7,
    project: "Production Zone Towers",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "₦ 8000",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦7,000,000",
    actions: "",
  },
  {
    id: 8,
    project: "Royal Gardens Estate",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "₦ 8000",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦7,000,000",
    actions: "",
  },
  {
    id: 9,
    project: "Riverside Lifestyle Center",
    currentPrice: "₦ 7000",
    entryPrice: "₦ 8000",
    exitPrice: "₦ 8000",
    requestDate: "07 May, 2025 7:30PM",
    newRequest: "₦7,000,000",
    actions: "",
  },
];
