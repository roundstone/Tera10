import { PropertyData } from "@/types/property.type";
import { createColumnHelper } from "@tanstack/react-table";


// Sample data for the table
export const propertyData: PropertyData[] = [
  // {
  //   id: 1,
  //   property: "Greenview Apartments",
  //   unitsAvailable: "1.2K",
  //   stockStatus: "IN STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%", 
  //   developer: "Hecarters",
  // },
  // {
  //   id: 2,
  //   property: "Metro Living & Business Hub",
  //   unitsAvailable: 24,
  //   stockStatus: "LOW STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+9%",
  //   developer: "Hecarters",
  // },
  // {
  //   id: 3,
  //   property: "Harborview Mixed-Use Complex",
  //   unitsAvailable: 21,
  //   stockStatus: "LOW STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+12%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 4,
  //   property: "Unity Square Development",
  //   unitsAvailable: 21,
  //   stockStatus: "LOW STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 5,
  //   property: "Industrial Gateway Complex",
  //   unitsAvailable: 0,
  //   stockStatus: "LOW STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 6,
  //   property: "Warehouse District 42",
  //   unitsAvailable: 0,
  //   stockStatus: "OUT OF STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 7,
  //   property: "Production Zone Towers",
  //   unitsAvailable: 0,
  //   stockStatus: "OUT OF STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 8,
  //   property: "Royal Gardens Estate",
  //   unitsAvailable: 0,
  //   stockStatus: "OUT OF STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 9,
  //   property: "Riverside Lifestyle Center",
  //   unitsAvailable: 0,
  //   stockStatus: "OUT OF STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
];

export const cosgrovePropertyData: PropertyData[] = [
  // {
  //   id: 1,
  //   property: "Cosgrove Greenview Apartments",
  //   unitsAvailable: "1.2K",
  //   stockStatus: "IN STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 2,
  //   property: "Cosgrove Metro Living & Business Hub",
  //   unitsAvailable: 24,
  //   stockStatus: "LOW STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+9%",
  //   developer: "Cosgroove",
  //     },
  // {
  //   id: 3,
  //   property: "Cosgrove Harborview Mixed-Use Complex",
  //   unitsAvailable: 21,
  //   stockStatus: "LOW STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+12%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 4,
  //   property: "Cosgrove Unity Square Development",
  //   unitsAvailable: 21,
  //   stockStatus: "LOW STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 5,
  //   property: "Cosgrove Industrial Gateway Complex",
  //   unitsAvailable: 0,
  //   stockStatus: "LOW STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 6,
  //   property: "Cosgrove Warehouse District 42",
  //   unitsAvailable: 0,
  //   stockStatus: "OUT OF STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Cosgroove",
  // },
  // {
  //   id: 7,
  //   property: "Cosgrove Production Zone Towers",
  //   unitsAvailable: 0,
  //   stockStatus: "OUT OF STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Bilad",
  // },
  // {
  //   id: 8,
  //   property: "Cosgrove Royal Gardens Estate",
  //   unitsAvailable: 0,
  //   stockStatus: "OUT OF STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Bilad",
  // },
  // {
  //   id: 9,
  //   property: "Cosgrove Riverside Lifestyle Center",
  //   unitsAvailable: 0,
  //   stockStatus: "OUT OF STOCK",
  //   sold: 827,
  //   unitPrice: 120000,
  //   marketChange: "+16.2%",
  //   developer: "Bilad",
  // },
];

// Create column helper
const columnHelper = createColumnHelper<PropertyData>();

// Define the columns for the table
export const columns = [
  columnHelper.display({
    id: "select",
    header: ({ table }) => (
      <>
        <input
          type="checkbox"
          name=""
          id="select-all-rows"
          checked={table.getIsAllRowsSelected()}
          onChange={(value) => table.toggleAllRowsSelected(!!value)}
          aria-label="Select all"
        />
      </>
    ),
    cell: ({ row }) => (
      <>
        <input
          type="checkbox"
          name=""
          id={`row-select-${row.id}`}
          checked={row.getIsSelected()}
          onChange={(value) => {
            try {
              row.toggleSelected(!!value);
            } catch (error) {
              console.error(
                `Error toggling selection for row ${row.id}:`,
                error
              );
            }
          }}
          aria-label="Select row"
        />
      </>
    ),
    enableSorting: false,
    enableHiding: false,
  }),
  columnHelper.accessor("property", {
    header: () => "Property",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("unitsAvailable", {
    header: () => "Units Available",
    // cell: info => info.getValue(),
  }),
  columnHelper.accessor("stockStatus", {
    header: () => "Stock",
    cell: (info) => {
      const status = info.getValue();

      if (status === "IN STOCK") {
        return (
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-green-500 mr-2"></span>
            <span>IN STOCK</span>
          </div>
        );
      } else if (status === "LOW STOCK") {
        return (
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-orange-400 mr-2"></span>
            <span>LOW STOCK</span>
          </div>
        );
      } else {
        return (
          <div className="flex items-center">
            <span className="inline-block w-2 h-2 bg-red-500 mr-2"></span>
            <span>OUT OF STOCK</span>
          </div>
        );
      }
    },
  }),
  columnHelper.accessor("sold", {
    header: () => "Sold",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("unitPrice", {
    header: () => "Unit Price (NGN)",
    cell: (info) => info.getValue().toLocaleString(),
  }),
  columnHelper.accessor("marketChange", {
    header: () => "Market (Today)",
    cell: (info) => {
      const change = info.getValue();
      return <span className="text-green-500">{change}</span>;
    },
  }),
];

// In your data.ts or wherever you're exporting columns

export const cosgroveColumns = ({
  onOpen,
}: {
  onOpen: (property: string) => void;
}) => [
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
  columnHelper.accessor("property", {
    header: () => "Property",
    cell: (info) => {
      const property = info.getValue();
      return (
        <button
        id={`row-select-${property}`}
          className="text-gray-600 hover:underline"
          onClick={() => onOpen(property)}
        >
          {property}
        </button>
      );
    },
  }),
  columnHelper.accessor("unitsAvailable", {
    header: () => "Units Available",
  }),
  columnHelper.accessor("stockStatus", {
    header: () => "Stock",
    cell: (info) => {
      const status = info.getValue();
      const colorMap = {
        "IN STOCK": "green-500",
        "LOW STOCK": "orange-400",
        "OUT OF STOCK": "red-500",
      };

      return (
        <div className="flex items-center">
          <span
            className={`inline-block w-2 h-2 bg-${colorMap[status]} mr-2`}
          ></span>
          <span>{status}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("sold", {
    header: () => "Sold",
  }),
  // columnHelper.accessor("unitPrice", {
  //   header: () => "Unit Price (NGN)",
  //   cell: (info) => info.getValue().toLocaleString(),
  // }),
  columnHelper.accessor("marketChange", {
    header: () => "Market (Today)",
    cell: (info) => <span className="text-green-500">{info.getValue()}</span>,
  }),
];

// export const cosgroveColumns = [
//   columnHelper.display({
//     id: "select",
//     header: ({ table }) => (
//       <>
//         <input
//           type="checkbox"
//           name=""
//           id=""
//           checked={table.getIsAllRowsSelected()}
//           onChange={(value) => table.toggleAllRowsSelected(!!value)}
//           aria-label="Select all"
//         />
//       </>
//     ),
//     cell: ({ row }) => (
//       <>
//         <input
//           type="checkbox"
//           name=""
//           id=""
//           checked={row.getIsSelected()}
//           onChange={(value) => row.toggleSelected(!!value)}
//           aria-label="Select row"
//         />
//       </>
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   }),
//   columnHelper.accessor("property", {
//     header: () => "Property",
//     cell: (info) => (
//       <>
//         <Link to={"."}>{info.getValue()}</Link>
//       </>
//     ),
//   }),
//   columnHelper.accessor("unitsAvailable", {
//     header: () => "Units Available",
//     // cell: info => info.getValue(),
//   }),
//   columnHelper.accessor("stockStatus", {
//     header: () => "Stock",
//     cell: (info) => {
//       const status = info.getValue();

//       if (status === "IN STOCK") {
//         return (
//           <div className="flex items-center">
//             <span className="inline-block w-2 h-2 bg-green-500 mr-2"></span>
//             <span>IN STOCK</span>
//           </div>
//         );
//       } else if (status === "LOW STOCK") {
//         return (
//           <div className="flex items-center">
//             <span className="inline-block w-2 h-2 bg-orange-400 mr-2"></span>
//             <span>LOW STOCK</span>
//           </div>
//         );
//       } else {
//         return (
//           <div className="flex items-center">
//             <span className="inline-block w-2 h-2 bg-red-500 mr-2"></span>
//             <span>OUT OF STOCK</span>
//           </div>
//         );
//       }
//     },
//   }),
//   columnHelper.accessor("sold", {
//     header: () => "Sold",
//     cell: (info) => info.getValue(),
//   }),
//   columnHelper.accessor("unitPrice", {
//     header: () => "Unit Price (NGN)",
//     cell: (info) => info.getValue().toLocaleString(),
//   }),
//   columnHelper.accessor("marketChange", {
//     header: () => "Market (Today)",
//     cell: (info) => {
//       const change = info.getValue();
//       return <span className="text-green-500">{change}</span>;
//     },
//   }),
// ];
