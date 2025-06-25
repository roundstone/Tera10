import AppTable from "@/components/common/app-table";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { fundRequestData, fundRequestColumns } from "../tables/stock-price";
import React from "react";
import AppTablePagination from "@/components/common/app-table-pagination";
import { ArrowUp } from "iconsax-react";
import AppModal from "@/components/common/modal";
import StockApproval from "../modal/stock-approval";

export default function StockPriceAdjustmentRequest() {
  const [sorting1, setSorting1] = React.useState<SortingState>([]);
  const [columnFilters1, setColumnFilters1] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility1, setColumnVisibility1] =
    React.useState<VisibilityState>({});
  const [rowSelection1, setRowSelection1] = React.useState({});
  const [open, setOpen] = React.useState(false);

  const table = useReactTable({
    data: fundRequestData,
    columns: fundRequestColumns(
      (row) => {
        // handle approve action here
        console.log("Approved", row);
        setOpen(true);
      },
      (row) => {
        // handle reject action here
        console.log("Rejected", row);
        setOpen(true);
      }
    ),
    onSortingChange: setSorting1,
    onColumnFiltersChange: setColumnFilters1,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility1,
    onRowSelectionChange: setRowSelection1,
    state: {
      sorting: sorting1,
      columnFilters: columnFilters1,
      columnVisibility: columnVisibility1,
      rowSelection: rowSelection1,
    },
  });

  return (
    <div className="">
      <div className="my-6 bg-black text-white p-6 rounded-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold leading-tight">
            Manage Price Adjustment
          </h1>
          <p className="text-xl text-gray-200 mt-1">
            request for all developers
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* First arrow button - gray */}
          <button className="flex items-center justify-center w-[82.14705657958984px] h-[38.55882263183594px] border border-gray-600 rounded-md hover:bg-gray-800 transition-colors">
            <ArrowUp className="w-5 h-5 text-gray-400" color="#646464" />
          </button>

          {/* Second arrow button - orange */}
          <button className="flex items-center justify-center w-[82.14705657958984px] h-[38.55882263183594px] border border-orange-500 rounded-md hover:bg-orange-600 transition-colors -mb-5">
            <ArrowUp
              className="w-5 h-5 text-orange-500 hover:text-white"
              color="#646464"
            />
          </button>

          {/* Third arrow button - green */}
          <button className="flex items-center justify-center w-[82.14705657958984px] h-[38.55882263183594px] border border-green-500 rounded-md hover:bg-green-600 transition-colors -mt-5">
            <ArrowUp
              className="w-5 h-5 text-green-500 hover:text-white"
              color="#646464"
            />
          </button>
        </div>
      </div>
      <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-lg rounded- mt-2">
        <AppTable
          table={table}
          className=""
          noResultsMessage="No yellow cards found."
        />
      </div>
      <AppTablePagination table={table} />

      <AppModal
        open={open}
        setOpen={setOpen}
        className="sm:max-w-[588px] bg-white !p-0 !m-0"
        title="Approve Price Change"
      >
        <StockApproval onConfirm={() => setOpen(false)} />
      </AppModal>
    </div>
  );
}
