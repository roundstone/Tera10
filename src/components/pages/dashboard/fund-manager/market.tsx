/* eslint-disable @typescript-eslint/no-explicit-any */
import usePageTitle from "@/hooks/use-page-title";
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
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  // PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import AppTable from "@/components/common/app-table";
import AppTablePagination from "@/components/common/app-table-pagination";
import React from "react";
import { SearchNormal } from "iconsax-react";
import { Setting4 } from "iconsax-react";
import { Button } from "@/components/ui/button";
import { columns, propertyData } from "../developer/tables/live-market";
import {
  cosgroveColumns,
  // scosgrovePropertyData,
} from "../developer/tables/live-market";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import UnlockCard from "../developer/children/unlock-card";

const ManageMarketPage = () => {
  usePageTitle("Market");

  // Developer options
  const developers = [
    { value: "cosgroove", label: "Cosgroove" },
    { value: "bilad", label: "Bilad" },
    { value: "hecarters", label: "Hecarters" },
    { value: "pinnacle", label: "Pinnacle" },
    { value: "landwey", label: "Landwey" },
  ];

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

  // Component state
  const [search, setSearch] = React.useState("");
  const [, setOpen] = React.useState(false);
  const [, setSelectedProperty] = React.useState<string | null>(
    null
  );
  const [selectedDeveloper, setSelectedDeveloper] = React.useState("cosgroove");
  const [developerPopoverOpen, setDeveloperPopoverOpen] = React.useState(false);

  const table1State = useTableState();
  const table2State = useTableState();
  const table3State = useTableState();
  const table4State = useTableState();

  // Filter data based on stock status
  const getFilteredData = (status?: "IN STOCK" | "OUT OF STOCK") => {
    if (!status) return propertyData; // All data
    return propertyData.filter((item) => item.stockStatus === status);
  };

  // Filter data based on selected developer
  const getFilteredDeveloperData = () => {
    // Filter by developer - you'll need to add developer field to your data
    // For now, using cosgrove data as example, but you should filter based on actual developer field
    switch (selectedDeveloper) {
      case "cosgroove":
        return propertyData.filter((item) => item.developer == "Cosgroove");
      case "bilad":
        // Return Bilad's data when you have it
        return propertyData.filter((item) => item.developer == "Bilad");
      case "hecarters":
        // Return Hecarters' data when you have it
        return propertyData.filter((item) => item.developer == "Hecarters");
      default:
        return propertyData;
    }
  };

  // Create tables for different tabs
  const allTable = useTable(getFilteredData(), columns, table1State);
  const activeTable = useTable(
    getFilteredData("IN STOCK"),
    columns,
    table2State
  );
  const delistedTable = useTable(
    getFilteredData("OUT OF STOCK"),
    columns,
    table3State
  );

  const columns2 = cosgroveColumns({
    onOpen: (property: string) => {
      setSelectedProperty(property);
      setOpen(true);
    },
  });

  const developerTable = useTable(
    getFilteredDeveloperData(),
    columns2,
    table4State
  );

  // Get counts for tab labels
  const allCount = propertyData.length;
  const activeCount = propertyData.filter(
    (item) => item.stockStatus === "IN STOCK"
  ).length;
  const delistedCount = propertyData.filter(
    (item) => item.stockStatus === "OUT OF STOCK"
  ).length;

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          {/* Tabs */}
          <Tabs defaultValue="all" className="mb4">
            <div className="mb-4 w-full">
              <TabsList className="bg-transparent">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:border-b-2 !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] bg- rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
                >
                  All ({allCount})
                </TabsTrigger>

                <TabsTrigger
                  value="active"
                  className="data-[state=active]:border-b-2 !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] bg- rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
                >
                  Active ({activeCount})
                </TabsTrigger>

                <TabsTrigger
                  value="delisted"
                  className="data-[state=active]:border-b-2 !shadow-none md:w-[146px] justify-start data-[state=active]:border-b-[#FFAB04] bg- rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
                >
                  Delisted ({delistedCount})
                </TabsTrigger>

                <TabsTrigger
                  value="developer"
                  className="data-[state=active]:border-b-2 bg- !shadow-none justify-start data-[state=active]:border-b-[#FFAB04] rounded-none py-5 text-[#8E8E93] data-[state=active]:text-black"
                >
                  <Popover
                    open={developerPopoverOpen}
                    onOpenChange={setDeveloperPopoverOpen}
                  >
                    {/* <PopoverTrigger > */}
                    {/* <Button variant="outline">Open popover</Button> */}
                    <span
                      // variant="ghost"
                      role="combobox"
                      aria-expanded={developerPopoverOpen}
                      className="justify-between p-0 h-auto font-normal hover:bg-transparent cursor-pointer flex items-center"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {
                        developers.find(
                          (developer) => developer.value === selectedDeveloper
                        )?.label
                      }

                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </span>
                    {/* </PopoverTrigger>    */}
                    <PopoverContent className="w-[200px] p-0" align="start">
                      <Command>
                        <CommandInput placeholder="Search developer..." />
                        <CommandEmpty>No developer found.</CommandEmpty>
                        <CommandGroup>
                          {developers.map((developer, i) => (
                            <CommandItem
                              key={i}
                              value={developer.value}
                              onSelect={(currentValue) => {
                                setSelectedDeveloper(
                                  currentValue === selectedDeveloper
                                    ? ""
                                    : currentValue
                                );
                                setDeveloperPopoverOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  selectedDeveloper === developer.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {developer.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
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
                    // Apply global filter to all tables
                    allTable.setGlobalFilter(e.target.value);
                    activeTable.setGlobalFilter(e.target.value);
                    delistedTable.setGlobalFilter(e.target.value);
                    developerTable.setGlobalFilter(e.target.value);
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
                  table={allTable}
                  className=""
                  noResultsMessage="No properties found."
                />
              </div>
              <AppTablePagination table={allTable} />
            </TabsContent>

            <TabsContent value="active">
              <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-t-lg rounded-b mt-2">
                <AppTable
                  table={activeTable}
                  className=""
                  noResultsMessage="No active properties found."
                />
              </div>
              <AppTablePagination table={activeTable} />
            </TabsContent>

            <TabsContent value="delisted">
              <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-t-lg rounded-b mt-2">
                <AppTable
                  table={delistedTable}
                  className=""
                  noResultsMessage="No delisted properties found."
                />
              </div>
              <AppTablePagination table={delistedTable} />
            </TabsContent>

            <TabsContent value="developer">
              <div className="overflow-auto border border-[#E4E7EC] text-[#475467] rounded-t-lg rounded-b mt-2">
                <AppTable
                  table={developerTable}
                  className=""
                  noResultsMessage={`No properties found for ${developers.find((d) => d.value === selectedDeveloper)?.label}.`}
                />
              </div>
              <AppTablePagination table={developerTable} />
            </TabsContent>
          </Tabs>

          {/* <AppModal
        open={open}
        setOpen={setOpen}
        title="Market Stats"
        className="sm:max-w-[588px] bg-white"
      >
        <MarketStats property={selectedProperty!} />
      </AppModal> */}
        </div>
        <div className="col-span-1">
          <UnlockCard hasButton={false} />
        </div>
      </div>
    </>
  );
};

export default ManageMarketPage;
