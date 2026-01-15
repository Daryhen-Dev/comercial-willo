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
import { BankNumerationGetAllInterface } from "../../../../../interfaces";

import { formatDateTime } from "@/lib/format-date";
import EditBankChequeForm from "../ui/EditBankChequeForm";

interface ActionsCellProps {
  bank: BankNumerationGetAllInterface;
  table: Table<BankNumerationGetAllInterface>;
}

function ActionsCell({ bank, table }: ActionsCellProps) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);

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
          <DropdownMenuItem onClick={() => setSheetOpen(true)}>
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetCustom
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        side="right"
        title={`${bank.nombre}`}
        description={`Banco id: ${bank.idBanco}`}
      >
        <EditBankChequeForm
          bankCheque={bank}
          onClose={setSheetOpen}
          onSuccess={() => table.options.meta?.refreshData()}
        />
      </SheetCustom>
    </>
  );
}

export const columns: ColumnDef<BankNumerationGetAllInterface>[] = [
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
    accessorKey: "inicial",
    header: "Inicial",
  },
  {
    accessorKey: "final",
    header: "Final",
  },
  {
    accessorKey: "fechaModify",
    header: "Editado",
    cell: ({ row }) => {
      return formatDateTime(row.getValue("fechaModify") as string);
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
