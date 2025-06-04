// Define the type for property data
export interface PropertyData {
  id: number;
  property: string;
  unitsAvailable: number | string;
  stockStatus: "IN STOCK" | "LOW STOCK" | "OUT OF STOCK";
  sold: number;
  unitPrice: number;
  marketChange: string;
  developer: string;
}
