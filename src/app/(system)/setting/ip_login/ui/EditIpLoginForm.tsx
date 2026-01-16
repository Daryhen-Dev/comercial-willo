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
import { IpLoginGetAllInterface, IpLoginUpdateInterface } from "@/interfaces";
import { iplogin_update } from "@/actions/setting/iplogin_action";

const ipLoginSchema = z.object({
  ajusteIpSucursalId: z.number(),
  sucursal: z
    .string()
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
  detalle: z
    .string()
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
  ip: z.string().min(2, "La contraseña debe tener al menos 2 caracteres"),
});

interface Props {
  ipLogin: IpLoginGetAllInterface;
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function EditIpLoginForm({
  ipLogin,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(ipLoginSchema),
    defaultValues: {
      ajusteIpSucursalId: ipLogin.ajusteIpSucursalId,
      sucursal: ipLogin.sucursal,
      detalle: ipLogin.detalle,
      ip: ipLogin.ip,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: IpLoginUpdateInterface = {
      ajusteIpSucursalId: values.ajusteIpSucursalId,
      detalle: values.detalle,
      ip: values.ip,
    };
    const response = (await iplogin_update(data)) as FetchResponse;
    setLoading(false);
    if (response.Success) {
      toast.success("Ip actualizado.");
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
