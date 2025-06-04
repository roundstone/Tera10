/* eslint-disable @typescript-eslint/no-explicit-any */
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
import {
  propertyData,
  columns,
  cosgrovePropertyData,
  cosgroveColumns,
} from "../tables/live-market";
import { Button } from "@/components/ui/button";
import AppModal from "@/components/common/modal";
import MarketStats from "../modals/market-stats";

// export default class DashboardPropertyTable
const DashboardPropertyTable = () => {
  // Custom hook for table state management
  const useTableState = () => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
      React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    return {
      sorting,
      setSorting,
      columnFilters,
      setColumnFilters,
      columnVisibility,
      setColumnVisibility,
      rowSelection,
      setRowSelection,
    };
  };

  // Custom hook to create table configuration
  const useTable = (
    data: any[],
    columns: any[],
    tableState: ReturnType<typeof useTableState>
  ) => {
    return useReactTable({
      data,
      columns,
      onSortingChange: tableState.setSorting,
      onColumnFiltersChange: tableState.setColumnFilters,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: tableState.setColumnVisibility,
      onRowSelectionChange: tableState.setRowSelection,
      state: {
        sorting: tableState.sorting,
        columnFilters: tableState.columnFilters,
        columnVisibility: tableState.columnVisibility,
        rowSelection: tableState.rowSelection,
      },
    });
  };

  // Optimized component code
  const [search, setSearch] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [selectedProperty, setSelectedProperty] = React.useState<string | null>(
    null
  );

  // Table states using the custom hook
  const table1State = useTableState();
  const table2State = useTableState();

  // Table configurations
  const table = useTable(propertyData, columns, table1State);

  const columns2 = cosgroveColumns({
    onOpen: (property: string) => {
      setSelectedProperty(property);
      setOpen(true);
    },
  });

  const table2 = useTable(cosgrovePropertyData, columns2, table2State);
  return (
    <div className="col-span-3">
      {/* Tabs */}
      <Tabs defaultValue="all" className="mb4">
        <div className="mb-4 w-full">
          <TabsList className="bg-transparent">
            <TabsTrigger
              value="all"
              className="data-[state=active]:border-b-2 !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] bg- rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="cosgroove"
              className="data-[state=active]:border-b-2 bg- !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
            >
              Cosgroove
            </TabsTrigger>
          </TabsList>
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mt-px w-f" />
        </div>

        {/* Search and Filter */}
        <div className="flex gap-4 items-center mb-6">
          <div className="relative flex-1 max-w-1/2">
            <SearchNormal
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
              color="#777777"
            />
            <Input
              placeholder="Search"
              className="pl-10 rounded-xl"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                table.setGlobalFilter(e.target.value);
              }}
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

        {/* Live Market Data */}
        <h3 className="text- font-medium mb-">Live Market Data</h3>

        <TabsContent value="all">
          <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-t-lg rounded-b mt-2">
            <AppTable
              table={table}
              className=""
              noResultsMessage="No yellow cards found."
            />
          </div>
          <AppTablePagination table={table} />
        </TabsContent>

        <TabsContent value="cosgroove">
          <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-t-lg rounded-b mt-2">
            <AppTable
              table={table2}
              className=""
              noResultsMessage="No yellow cards found."
            />
          </div>
          <AppTablePagination table={table} />
        </TabsContent>
      </Tabs>

      <AppModal
        open={open}
        setOpen={setOpen}
        title="Market Stats"
        className="sm:max-w-[588px] bg-white"
      >
        <MarketStats property={selectedProperty!} />
      </AppModal>
    </div>
  );
};

export default DashboardPropertyTable;
