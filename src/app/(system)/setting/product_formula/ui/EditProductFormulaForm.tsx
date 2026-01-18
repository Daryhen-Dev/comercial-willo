import React, { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Spinner } from "@/components/ui/spinner";
import { FetchResponse } from "@/lib/fetch-response";
import { toast } from "sonner";
import {
  ProductFormulaGetAllInterface,
  ProductFormulaUpdateInterface,
} from "@/interfaces";
import { product_formula_update } from "@/actions";

const productFormulaSchema = z.object({
  idProducto: z.number(),
  sucursal: z.string().min(1, "Campo requerido"),
  producto: z.string().min(1, "Campo requerido"),
  humedadSeco: z.number(),
  mermaAgua: z.number(),
  servBasico: z.number(),
  precio: z.number(),
});

interface Props {
  productoFormula: ProductFormulaGetAllInterface;
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function EditProductFormulaForm({
  productoFormula,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(productFormulaSchema),
    defaultValues: {
      idProducto: productoFormula.idProducto,
      sucursal: productoFormula.sucursal,
      producto: productoFormula.producto,
      humedadSeco: Number(productoFormula.humedadSeco),
      mermaAgua: Number(productoFormula.mermaAgua),
      servBasico: Number(productoFormula.servBasico),
      precio: Number(productoFormula.precio),
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: ProductFormulaUpdateInterface = {
      idProducto: values.idProducto,
      humedadSeco: values.humedadSeco,
      mermaAgua: values.mermaAgua,
      servBasico: values.servBasico,
      precio: values.precio,
    };
    const response = (await product_formula_update(data)) as FetchResponse;
    setLoading(false);
    if (response.Success) {
      toast.success("Producto formula actualizado.");
      if (onSuccess) onSuccess();
      onClose(false);
    } else {
      toast.error(`${response.Message}`);
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-2">
        <FormField
          control={form.control}
          name="sucursal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sucursal</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="producto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Producto</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="humedadSeco"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Humedad Seco</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mermaAgua"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Merma Agua</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="servBasico"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Servicio Basico</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="precio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={loading}
          //disabled={!isValid}
          //  href="/checkout"
          className="w-70 p-2 mt-5"
        >
          {loading ? <Spinner className="size-8" /> : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
}
