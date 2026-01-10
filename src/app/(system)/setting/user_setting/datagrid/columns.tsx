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
import EditUserForm from "../ui/EditUserForm";
import ActiveUserForm from "../ui/ActiveUserForm";

interface ActionsCellProps {
  user: UserGetAllInterface;
  table: Table<UserGetAllInterface>;
}

function ActionsCell({ user, table }: ActionsCellProps) {
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
              navigator.clipboard.writeText(user.idUsuario.toString())
            }
          >
            Copiar ID Usuario
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
        title={`Información del Usuario: ${user.usuario}`}
        description={`Detalles del usuario con ID: ${user.idUsuario}`}
      >
        <EditUserForm
          user={user}
          onClose={setSheetOpen}
          onSuccess={() => table.options.meta?.refreshData()}
        />
      </SheetCustom>
      <SheetCustom
        open={sheetOpenActive}
        onOpenChange={setSheetOpenActive}
        side="right"
        title={`Información del Usuario: ${user.usuario}`}
        description={`Detalles del usuario con ID: ${user.idUsuario}`}
      >
        <ActiveUserForm
          user={user}
          onClose={setSheetOpenActive}
          onSuccess={() => table.options.meta?.refreshData()}
        />
      </SheetCustom>
    </>
  );
}

export const columns: ColumnDef<UserGetAllInterface>[] = [
  {
    id: "actions",
    cell: ({ row, table }) => {
      return <ActionsCell user={row.original} table={table} />;
    },
  },
  {
    accessorKey: "usuario",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Usuario
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "rol",
    header: "Rol",
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
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const estado = row.getValue("estado") as boolean;
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
