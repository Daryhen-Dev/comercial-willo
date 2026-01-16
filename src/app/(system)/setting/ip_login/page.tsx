"use client";
import { DataTable } from "./datagrid/data-table";
import { useEffect, useState } from "react";
import { columns } from "./datagrid/columns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SheetCustom from "@/components/ui/sheet/sheetCustom";
import { iplogin_get_all } from "@/actions/setting/iplogin_action";
import { IpLoginGetAllInterface } from "@/interfaces";
import AddIpLoginForm from "./ui/AddIpLoginForm";

export default function Page() {
  const [data, setData] = useState<IpLoginGetAllInterface[]>([]);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await iplogin_get_all();
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
          Crear ip para pc
        </Button>
      </div>
      <DataTable columns={columns} data={data} refreshData={fetchData} />
      <SheetCustom
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title={`Crear ip para pc`}
        description={`Formulario para crear un nuevo login ip`}
      >
        <AddIpLoginForm onClose={setSheetOpen} onSuccess={() => fetchData()} />
      </SheetCustom>
    </div>
  );
}
