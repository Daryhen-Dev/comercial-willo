import React, { useEffect, useState } from "react";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { sucursal_get_all } from "@/actions/sucursal/sucursal_action";
import { Spinner } from "@/components/ui/spinner";
import { FetchResponse } from "@/lib/fetch-response";
import { toast } from "sonner";
import { IpLoginCreateInterface } from "@/interfaces";
import { iplogin_create } from "@/actions/setting/iplogin_action";

const ipLoginSchema = z.object({
  idLocal: z
    .number()
    .min(1, "Debe seleccionar una sucursal")
    .refine((val) => val !== 2, {
      message: "El valor no puede ser 2",
    }),
  detalle: z.string().min(2, "El detalle debe tener al menos 2 caracteres"),
  ip: z.string().min(2, "La ip debe tener al menos 2 caracteres"),
});

interface Props {
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function AddIpLoginForm({ onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(ipLoginSchema),
    defaultValues: {
      idLocal: 0,
      detalle: "",
      ip: "",
    },
  });

  const [sucursales, setSucursales] = useState<any[]>([]);

  useEffect(() => {
    fetchSucursales();
  }, []);
  const fetchSucursales = async () => {
    const response = await sucursal_get_all();
    if (response.Success) {
      setSucursales(response.Data);
    } else {
      response.Message === undefined
        ? toast.error("Error inesperado antes de hacer petición.")
        : toast.error(`${response.Message}`);
    }
  };
  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: IpLoginCreateInterface = {
      idLocal: values.idLocal,
      detalle: values.detalle,
      ip: values.ip,
    };
    const response = (await iplogin_create(data)) as FetchResponse;
    setLoading(false);
    if (response.Success) {
      toast.success("Ip creada.");
      if (onSuccess) onSuccess();
      onClose(false);
    } else {
      toast.error(`${response.Message}`);
    }
  });
  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex flex-col gap-2 justify-center">
        <FormField
          control={form.control}
          name="idLocal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sucursal</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={
                  field.value && field.value > 0 ? field.value.toString() : ""
                }
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione una sucursal" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sucursal</SelectLabel>
                    {sucursales.map((sucursal) => (
                      <SelectItem
                        key={sucursal.idLocal}
                        value={sucursal.idLocal.toString()}
                      >
                        {sucursal.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="detalle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Detalle</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ip</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading} className="w-full p-2 mt-5">
          {loading ? <Spinner className="size-8" /> : "Agregar"}
        </Button>
      </form>
    </Form>
  );
}
