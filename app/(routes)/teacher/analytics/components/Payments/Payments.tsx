import { getLastPurchases } from "@/actions/getLastPurchases";
import { DataTable } from "./data-table";
import { columns, PurchasesWithCourse } from "./Columns";

export default async function Payments() {
  const lastPurchases = await getLastPurchases();

  return <div className="mx-auto my-10 w-full border shadow-md bg-white p-4 rounded-md ">
    Payments
    <DataTable columns={columns} data={lastPurchases as PurchasesWithCourse[]}/>
    </div>;
}