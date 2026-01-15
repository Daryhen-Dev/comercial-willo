"use client";
import { DataTable } from "./datagrid/data-table";
import { useEffect, useState } from "react";
import { columns } from "./datagrid/columns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import SheetCustom from "@/components/ui/sheet/sheetCustom";
import { BankGetAllInterface } from "@/interfaces";
import { bank_get_all } from "@/actions/setting/bank_action";
import AddBankForm from "./ui/AddBankForm";

export default function Page() {
  const [data, setData] = useState<BankGetAllInterface[]>([]);
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const response = await bank_get_all();
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
          Crear nuevo banco
        </Button>
      </div>
      <DataTable columns={columns} data={data} refreshData={fetchData} />
      <SheetCustom
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title={`Información del banco`}
        description={`Detalles del banco con ID`}
      >
        <AddBankForm onClose={setSheetOpen} onSuccess={() => fetchData()} />
      </SheetCustom>
    </div>
  );
}
