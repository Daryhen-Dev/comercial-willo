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
import { ProductMMGetAllInterface } from "../../../../../interfaces";
import { formatDateTime } from "@/lib/format-date";

interface ActionsCellProps {
  product: ProductMMGetAllInterface;
  table: Table<ProductMMGetAllInterface>;
}

function ActionsCell({ product, table }: ActionsCellProps) {
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
              navigator.clipboard.writeText(product.idProducto.toString())
            }
          >
            Copiar ID Producto
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
      {/* <SheetCustom
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
      </SheetCustom> */}
    </>
  );
}

export const columns: ColumnDef<ProductMMGetAllInterface>[] = [
  {
    id: "actions",
    cell: ({ row, table }) => {
      return <ActionsCell product={row.original} table={table} />;
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
    accessorKey: "producto",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Producto
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "pMinimo",
    header: "PMinimo",
  },
  {
    accessorKey: "pMaximo",
    header: "PMaximo",
  },
  {
    accessorKey: "estadoMM",
    header: "EstadoMM",
  },

  {
    accessorKey: "humeSeco",
    header: "HumeSeco",
  },
  {
    accessorKey: "mermaAgua",
    header: "MermaAgua",
  },
  {
    accessorKey: "servBasico",
    header: "ServBasico",
  },
  {
    accessorKey: "precio",
    header: "Precio",
  },
  {
    accessorKey: "fModificado",
    header: "Fecha Modificado",
    cell: ({ row }) => {
      return formatDateTime(row.getValue("fModificado") as string);
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
