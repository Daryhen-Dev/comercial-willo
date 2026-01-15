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
import { BankUpdateInterface } from "@/interfaces";
import { bank_update } from "@/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const bankSchema = z.object({
  idBanco: z.number(),
  idContaCuenta: z.number(),
  nombre: z
    .string()
    .min(2, "El nombre del banco debe tener al menos 2 caracteres"),
  cuenta: z.string().min(2, "La cuenta debe tener al menos 2 caracteres"),
  codigo: z
    .string()
    .min(11, "El código debe tener al menos 11 caracteres")
    .max(14, "El código debe tener como máximo 14 caracteres"),
});

//
interface Props {
  bank: BankUpdateInterface;
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function EditUserForm({ bank, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(bankSchema),
    defaultValues: {
      idBanco: bank.idBanco,
      idContaCuenta: bank.idContaCuenta,
      nombre: bank.nombre,
      cuenta: bank.cuenta,
      codigo: bank.codigo,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: BankUpdateInterface = {
      idBanco: values.idBanco,
      idContaCuenta: values.idContaCuenta,
      nombre: "#" + values.nombre,
      cuenta: values.cuenta,
      codigo: values.codigo,
    };
    const response = (await bank_update(data)) as FetchResponse;
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
              <FormLabel>Tipo</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val)}
                value={field.value}
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="BANCO PICHINCHA">
                    BANCO PICHINCHA
                  </SelectItem>
                  <SelectItem value="BANCO ECUADOR">BANCO ECUADOR</SelectItem>
                  <SelectItem value="BANCO GUAYAQUIL">
                    BANCO GUAYAQUIL
                  </SelectItem>
                  <SelectItem value="BANCO INTERNACIONAL">
                    BANCO INTERNACIONAL
                  </SelectItem>
                  <SelectItem value="BANCO GANADIARIO">
                    BANCO GANADIARIO
                  </SelectItem>
                  <SelectItem value="BANCO POLIZA">BANCO POLIZA</SelectItem>
                  <SelectItem value="BANCO PICHINCHA PERSONAL">
                    BANCO PICHINCHA PERSONAL
                  </SelectItem>
                  <SelectItem value="BANCO COOPERATIVA DE AHORRO Y CREDITO IEEP">
                    BANCO COOPERATIVA DE AHORRO Y CREDITO IEEP
                  </SelectItem>
                  <SelectItem value="BANCO INTERNACIONAL POLIZA">
                    BANCO INTERNACIONAL POLIZA
                  </SelectItem>
                  <SelectItem value="BANCO INTERNACIONAL MEXICO LINDO">
                    BANCO INTERNACIONAL MEXICO LINDO
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* <FormField
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
        /> */}
        <FormField
          control={form.control}
          name="cuenta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuenta</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="codigo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Codigo</FormLabel>
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
