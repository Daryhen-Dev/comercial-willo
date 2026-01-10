"use client";
import { DataTable } from "./datagrid/data-table";
import { user_get_all } from "../../../../actions/setting/user_action";
import { UserGetAllInterface } from "../../../../interfaces/settings/user_action_interface";
import { useEffect, useState } from "react";
import { columns } from "./datagrid/columns";
import { toast } from "sonner";

export default function Page() {
  const [data, setData] = useState<UserGetAllInterface[]>([]);

  const fetchData = async () => {
    try {
      const response = await user_get_all();
      setData(response.Data);
    } catch (error) {
      setData([]);
      toast.error("Error al obtener los usuarios.");
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
