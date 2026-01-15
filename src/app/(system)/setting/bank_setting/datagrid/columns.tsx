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
import { UserGetAllInterface } from "../../../../../interfaces/settings/user_action_interface";
import EditUserForm from "../ui/EditBankForm";
import ActiveUserForm from "../ui/ActiveBankForm";
import { BankGetAllInterface } from "@/interfaces";
import EditBankForm from "../ui/EditBankForm";
import { formatDateTime } from "@/lib/format-date";
import ActiveBankForm from "../ui/ActiveBankForm";

interface ActionsCellProps {
  bank: BankGetAllInterface;
  table: Table<BankGetAllInterface>;
}

function ActionsCell({ bank, table }: ActionsCellProps) {
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
          <DropdownMenuItem
            onClick={() =>
              navigator.clipboard.writeText(bank.idBanco.toString())
            }
          >
            Copiar ID Banco
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setSheetOpenActive(true)}>
            Activar
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setSheetOpen(true)}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetCustom
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        side="right"
        title={`Información del banco: ${bank.nombre}`}
        description={`Detalles del banco con ID: ${bank.cuenta} + ${bank.codigo}`}
      >
        <EditBankForm
          bank={bank}
          onClose={setSheetOpen}
          onSuccess={() => table.options.meta?.refreshData()}
        />
      </SheetCustom>
      <SheetCustom
        open={sheetOpenActive}
        onOpenChange={setSheetOpenActive}
        side="right"
        title={`${bank.nombre}`}
        description={`${bank.cuenta}`}
      >
        <ActiveBankForm
          bank={bank}
          onClose={setSheetOpenActive}
          onSuccess={() => table.options.meta?.refreshData()}
        />
      </SheetCustom>
    </>
  );
}

export const columns: ColumnDef<BankGetAllInterface>[] = [
  {
    id: "actions",
    cell: ({ row, table }) => {
      return <ActionsCell bank={row.original} table={table} />;
    },
  },
  {
    accessorKey: "nombre",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Banco
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "cuenta",
    header: "Cuenta",
  },
  {
    accessorKey: "codigo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Codigo
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "fechaModificado",
    header: "Editado",
    cell: ({ row }) => {
      return formatDateTime(row.getValue("fechaModificado") as string);
    },
  },
  {
    accessorKey: "activo",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("activo") as boolean;
      return (
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              estado ? "bg-green-400" : "bg-red-400"
            }`}
          />
          <span>{estado ? "Activo" : "Inactivo"}</span>
        </div>
      );
    },
  },
];
