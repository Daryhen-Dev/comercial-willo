"use client";
import { DataTable } from "./datagrid/data-table";
import { useEffect, useState } from "react";
import { columns } from "./datagrid/columns";
import { toast } from "sonner";
import { BankNumerationGetAllInterface } from "../../../../interfaces";
import { bank_cheque_get_all } from "@/actions";

export default function Page() {
  const [data, setData] = useState<BankNumerationGetAllInterface[]>([]);

  const fetchData = async () => {
    try {
      const response = await bank_cheque_get_all();
      if (response.Success) {
        setData(response.Data);
      } else {
        response.Message === undefined
          ? toast.error("Error inesperado antes de hacer petición.")
          : toast.error(`${response.Message}`);
      }
    } catch (error) {
      setData([]);
      toast.error(`${error}`);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto py-2">
      <DataTable columns={columns} data={data} refreshData={fetchData} />
    </div>
  );
}
