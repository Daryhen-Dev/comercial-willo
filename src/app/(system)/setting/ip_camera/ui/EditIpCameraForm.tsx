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
  IpCameraGetAllInterface,
  IpCameraUpdateInterface,
} from "@/interfaces/settings/ipcamara_action_interface";
import { ipcamera_update } from "@/actions";

interface Props {
  ipCamera: IpCameraGetAllInterface;
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

const ipCameraSchema = z.object({
  camaraId: z.number(),
  idLocal: z.number(),
  sucursal: z.string(),
  ipEntrada: z
    .string()
    .min(6, "La ip de entrada debe tener al menos 6 caracteres")
    .max(15, "La ip de entrada no dese ser mayor a 15 caracteres"),
  ipSalida: z
    .string()
    .min(6, "La ip de entrada debe tener al menos 6 caracteres")
    .max(15, "La ip de entrada no dese ser mayor a 15 caracteres"),
  detalle: z.string().min(2, "El detalle debe tener al menos 2 caracteres"),
  usuario: z.string().min(2, "El usuario debe tener al menos 2 caracteres"),
  password: z.string().min(2, "La contraseña debe tener al menos 2 caracteres"),
});

export default function EditIpCameraForm({
  ipCamera,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(ipCameraSchema),
    defaultValues: {
      camaraId: ipCamera.camaraId,
      idLocal: ipCamera.idLocal,
      sucursal: ipCamera.sucursal,
      ipEntrada: ipCamera.ipEntrada,
      ipSalida: ipCamera.ipSalida,
      detalle: ipCamera.detalle,
      usuario: ipCamera.usuario,
      password: ipCamera.password,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: IpCameraUpdateInterface = {
      camaraId: values.camaraId,
      idLocal: values.idLocal,
      ipEntrada: values.ipEntrada,
      ipSalida: values.ipSalida,
      detalle: values.detalle,
      usuario: values.usuario,
      password: values.password,
    };
    const response = (await ipcamera_update(data)) as FetchResponse;
    setLoading(false);
    if (response.Success) {
      toast.success("Ip de camara actualizada.");
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
          name="ipEntrada"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ip de entrada</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ipSalida"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ip de salida</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
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
          name="usuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input {...field} />
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
