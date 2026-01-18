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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FetchResponse } from "@/lib/fetch-response";
import { toast } from "sonner";
import {
  ProductMMGetAllInterface,
  ProductMMUpdateInterface,
} from "@/interfaces";
import { product_mm_update } from "@/actions";

const productMMSchema = z.object({
  idProducto: z.number(),
  sucursal: z.string(),
  producto: z.string(),
  pMinimo: z.number().min(0, "El precio mínimo debe ser mayor o igual a 0"),
  pMaximo: z.number().min(0, "El precio máximo debe ser mayor o igual a 0"),
  estadoMM: z.boolean(),
  humedadSeco: z.number().min(0, "La humedad seca debe ser mayor o igual a 0"),
  mermaAgua: z.number().min(0, "La merma de agua debe ser mayor o igual a 0"),
  servBasico: z
    .number()
    .min(0, "El servicio básico debe ser mayor o igual a 0"),
  precio: z.number().min(0, "El precio debe ser mayor o igual a 0"),
});

interface Props {
  product: ProductMMGetAllInterface;
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function EditProductMMForm({
  product,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(productMMSchema),
    defaultValues: {
      idProducto: product.idProducto,
      sucursal: product.sucursal,
      producto: product.producto,
      pMinimo: Number(product.pMinimo),
      pMaximo: Number(product.pMaximo),
      estadoMM: product.estadoMM,
      humedadSeco: Number(product.humedadSeco),
      mermaAgua: Number(product.mermaAgua),
      servBasico: Number(product.servBasico),
      precio: Number(product.precio),
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: ProductMMUpdateInterface = {
      idProducto: values.idProducto,
      pMinimo: values.pMinimo,
      pMaximo: values.pMaximo,
      estadoMM: values.estadoMM,
      humedadSeco: values.humedadSeco,
      mermaAgua: values.mermaAgua,
      servBasico: values.servBasico,
      precio: values.precio,
    };
    const response = (await product_mm_update(data)) as FetchResponse;
    setLoading(false);
    if (response.Success) {
      toast.success("Producto actualizado.");
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
          name="pMinimo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>P. Minimo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="pMaximo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>P. Maximo</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estadoMM"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado MM</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Boolean(val))}
                value={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="true">ACTIVO</SelectItem>
                  <SelectItem value="false">INACTIVO</SelectItem>
                </SelectContent>
              </Select>
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
              <FormLabel>Serv. Basico</FormLabel>
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

        <Button type="submit" disabled={loading} className="w-70 p-2 mt-5">
          {loading ? <Spinner className="size-8" /> : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
}
