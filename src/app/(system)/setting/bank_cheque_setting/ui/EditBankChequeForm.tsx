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
import {
  UserGetAllInterface,
  UserUpdatedInterface,
} from "../../../../../interfaces/settings/user_action_interface";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { FetchResponse } from "@/lib/fetch-response";
import { toast } from "sonner";
import {
  BankNumerationChequeUpdateInterface,
  BankNumerationGetAllInterface,
} from "@/interfaces";
import { bank_cheque_update } from "@/actions";

const bankChequeSchema = z.object({
  idBanco: z.number(),
  nombre: z.string().min(1, "Nombre es requerido"),
  inicial: z.number().min(1, "Inicial es requerido"),
  final: z.number().min(1, "Final es requerido"),
});

interface Props {
  bankCheque: BankNumerationGetAllInterface;
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function EditBankChequeForm({
  bankCheque,
  onClose,
  onSuccess,
}: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(bankChequeSchema),
    defaultValues: {
      idBanco: bankCheque.idBanco,
      nombre: bankCheque.nombre,
      inicial: bankCheque.inicial,
      final: bankCheque.final,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: BankNumerationChequeUpdateInterface = {
      idBanco: values.idBanco,
      inicial: values.inicial,
      final: values.final,
    };
    const response = (await bank_cheque_update(data)) as FetchResponse;
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
          name="inicial"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Inicial</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="final"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Final</FormLabel>
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
