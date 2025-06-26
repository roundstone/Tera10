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
import { SearchNormal, Setting4 } from "iconsax-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import React from "react";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/common/modal";
import {
  fundRequestData,
  interactiveFundRequestColumns,
} from "../tables/fund-request";
import ReviewMilestone from "../modal/review-milestone";

// export default class ApprovalTable
const ApprovalTable = () => {
  const [search, setSearch] = React.useState("");

  // Table 1 (All)
  const [sorting1, setSorting1] = React.useState<SortingState>([]);
  const [columnFilters1, setColumnFilters1] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility1, setColumnVisibility1] =
    React.useState<VisibilityState>({});
  const [rowSelection1, setRowSelection1] = React.useState({});

  // Table 2 (Cosgroove)
  const [sorting2, setSorting2] = React.useState<SortingState>([]);
  const [columnFilters2, setColumnFilters2] =
    React.useState<ColumnFiltersState>([]);
  const [columnVisibility2, setColumnVisibility2] =
    React.useState<VisibilityState>({});
  const [rowSelection2, setRowSelection2] = React.useState({});
  const [open, setOpen] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(
    null
  );

  const columns = interactiveFundRequestColumns({
    onOpen: (property: string) => {
      setSelectedProperty(property);
      setOpen(true);
      console.log(selectedProperty);
    },
  });

  const table = useReactTable({
    data: fundRequestData,
    columns,
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

  const table2 = useReactTable({
    data: fundRequestData,
    columns,
    onSortingChange: setSorting2,
    onColumnFiltersChange: setColumnFilters2,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility2,
    onRowSelectionChange: setRowSelection2,
    state: {
      sorting: sorting2,
      columnFilters: columnFilters2,
      columnVisibility: columnVisibility2,
      rowSelection: rowSelection2,
    },
  });

  return (
    <div className="col-span-3">
      <div className="h4 text-lg font-semibold py-10">Manage Milestones</div>
      {/* Tabs*/}
      <Tabs defaultValue="all" className="mb4">
        <div className="mb-4 w-full">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-b-2 !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] bg- rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
            >
              Pending requests
            </TabsTrigger>
            <TabsTrigger
              value="cosgroove"
              className="data-[state=active]:border-b-2 bg- !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
            >
              Approved
            </TabsTrigger>

            <TabsTrigger
              value="flagged"
              className="data-[state=active]:border-b-2 bg- !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
            >
              Payments
            </TabsTrigger>
            {/*  <TabsTrigger
              value="draft"
              className="data-[state=active]:border-b-2 bg- !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
            >
              Draft (2)
            </TabsTrigger> */}
          </TabsList>
          <div className="bg-white rounded-lg border border-gray-200 overflow- mt-px w-[400px]" />
        </div>

        {/* Search and Filter */}
        <div className="flex justify-between">
          <div className="flex gap-4 items-center mb-6 w-full">
            <div className="relative flex-1 max-w-1/3">
              <SearchNormal
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
                color="#777777"
              />
              <Input
                placeholder="Search"
                className="pl-10 rounded-xl"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              className="gap-2 rounded-xl py-5 border-gray-300"
            >
              <Setting4 size={20} color="#000000" />
              <span>Filters</span>
            </Button>
          </div>
        </div>

        <TabsContent value="all">
          <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-t-lg rounded-b mt-2">
            <AppTable
              table={table}
              className=""
              noResultsMessage="no record found."
            />
          </div>
          <AppTablePagination table={table} />
        </TabsContent>

        <TabsContent value="cosgroove">
          <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-t-lg rounded-b mt-2">
            <AppTable
              table={table2}
              className=""
              noResultsMessage="no record found."
            />
          </div>
          <AppTablePagination table={table} />
        </TabsContent>

        <TabsContent value="flagged">
          <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-t-lg rounded-b mt-2">
            <AppTable
              table={table2}
              className=""
              noResultsMessage="no record found."
            />
          </div>
          <AppTablePagination table={table} />
        </TabsContent>
      </Tabs>

      <AppModal
        open={open}
        setOpen={setOpen}
        className="sm:max-w-[1090px] bg-white !p-0 !m-0"
        showClosIcon={false}
      >
        <ReviewMilestone />
      </AppModal>
    </div>
  );
};

export default ApprovalTable;
