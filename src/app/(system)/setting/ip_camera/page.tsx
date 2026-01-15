"use client";
import { DataTable } from "./datagrid/data-table";
import { useEffect, useState } from "react";
import { columns } from "./datagrid/columns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SheetCustom from "@/components/ui/sheet/sheetCustom";
import AddUserForm from "./ui/AddUserForm";
import { IpCameraGetAllInterface } from "@/interfaces/settings/ipcamara_action_interface";
import { ipcamera_get_all } from "@/actions";

export default function Page() {
  const [data, setData] = useState<IpCameraGetAllInterface[]>([]);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await ipcamera_get_all();
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
      <div className="flex justify-start">
        <Button
          onClick={() => {
            setSheetOpen(true);
          }}
          className="w-70 p-2 mt-5 mb-2"
        >
          Crear Ip de campara
        </Button>
      </div>
      <DataTable columns={columns} data={data} refreshData={fetchData} />
      <SheetCustom
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title={`Información del Usuario`}
        description={`Detalles del usuario con ID`}
      >
        <AddUserForm onClose={setSheetOpen} onSuccess={() => fetchData()} />
      </SheetCustom>
    </div>
  );
}
