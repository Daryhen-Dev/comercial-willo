import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserActiveInterface, UserGetAllInterface } from "@/interfaces";
import { FetchResponse } from "@/lib/fetch-response";
import { toast } from "sonner";
import { user_active } from "@/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const userActiveSchema = z.object({
  idUsuario: z.number(),
  estado: z.boolean(),
  sucursal: z
    .string()
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
  usuario: z
    .string()
    .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
});
interface Props {
  user: UserGetAllInterface;
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function ActiveUserForm({ user, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(userActiveSchema),
    defaultValues: {
      idUsuario: user.idUsuario,
      estado: user.estado,
      sucursal: user.sucursal,
      usuario: user.usuario,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: UserActiveInterface = {
      idUsuario: values.idUsuario,
      estado: values.estado,
    };
    const response = (await user_active(data)) as FetchResponse;
    setLoading(false);
    if (response.Success) {
      toast.success("Usuario actualizado.");
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
          name="usuario"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuario</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="estado"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val === "true")}
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
