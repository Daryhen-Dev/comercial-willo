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
import { BankActiveInterface, BankGetAllInterface } from "@/interfaces";
import { FetchResponse } from "@/lib/fetch-response";
import { toast } from "sonner";
import { bank_active } from "@/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

const bankActiveSchema = z.object({
  idBanco: z.number(),
  activo: z.boolean(),
  nombre: z.string().min(2, "El banco debe tener al menos 2 caracteres"),
  cuenta: z.string().min(2, "La cuenta debe tener al menos 2 caracteres"),
});
interface Props {
  bank: BankGetAllInterface;
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function ActiveBankForm({ bank, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(bankActiveSchema),
    defaultValues: {
      idBanco: bank.idBanco,
      activo: bank.activo,
      nombre: bank.nombre,
      cuenta: bank.cuenta,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: BankActiveInterface = {
      idBanco: values.idBanco,
      activo: values.activo,
    };
    const response = (await bank_active(data)) as FetchResponse;
    setLoading(false);
    if (response.Success) {
      toast.success("Banco actualizado.");
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
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Banco</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cuenta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="activo"
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
