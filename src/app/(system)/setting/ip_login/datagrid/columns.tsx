"use client";

import { ColumnDef, Table } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import SheetCustom from "@/components/ui/sheet/sheetCustom";
import { useState } from "react";
import { IpLoginGetAllInterface } from "@/interfaces/settings/iplogin_action_interface";
import { formatDateTime } from "@/lib/format-date";
import EditIpLoginForm from "../ui/EditIpLoginForm";
import AddIpLoginForm from "../ui/AddIpLoginForm";

interface ActionsCellProps {
  ipLogin: IpLoginGetAllInterface;
  table: Table<IpLoginGetAllInterface>;
}

function ActionsCell({ ipLogin, table }: ActionsCellProps) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [sheetOpenActive, setSheetOpenActive] = useState<boolean>(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-8 w-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="font-bold text-xl">
            Acciones
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSheetOpen(true)}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetCustom
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        side="right"
        title={`Información del login ip: ${ipLogin.detalle}`}
        description={`Editar login ip`}
      >
        <EditIpLoginForm
          ipLogin={ipLogin}
          onClose={setSheetOpen}
          onSuccess={() => table.options.meta?.refreshData()}
        />
      </SheetCustom>
      <SheetCustom
        open={sheetOpenActive}
        onOpenChange={setSheetOpenActive}
        side="right"
        title={`Crear login ip`}
        description={`Formulario para crear un nuevo login ip`}
      >
        <AddIpLoginForm
          onClose={setSheetOpenActive}
          onSuccess={() => table.options.meta?.refreshData()}
        />
      </SheetCustom>
    </>
  );
}

export const columns: ColumnDef<IpLoginGetAllInterface>[] = [
  {
    id: "actions",
    cell: ({ row, table }) => {
      return <ActionsCell ipLogin={row.original} table={table} />;
    },
  },
  {
    accessorKey: "sucursal",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sucursal
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "detalle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Detalle
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "ip",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ip
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dateUpdate",
    header: "Fecha de Actualización",
    cell: ({ row }) => {
      return formatDateTime(row.getValue("dateUpdate") as string);
    },
  },
];
