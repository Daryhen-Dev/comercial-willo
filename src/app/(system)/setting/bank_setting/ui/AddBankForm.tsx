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
import { Spinner } from "@/components/ui/spinner";
import { FetchResponse } from "@/lib/fetch-response";
import { toast } from "sonner";
import { BankCreateInterface } from "@/interfaces";
import { bank_create } from "@/actions";

const userSchema = z.object({
  nombre: z.string().min(2, "Debe seleccionar un banco"),
  cuenta: z.string().min(2, "La cuenta debe tener al menos 2 caracteres"),
});

interface Props {
  onClose: (newValue: boolean) => void;
  onSuccess?: () => void;
}

export default function AddUserForm({ onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nombre: "",
      cuenta: "",
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setLoading(true);
    const data: BankCreateInterface = {
      nombre: values.nombre.toUpperCase(),
      cuenta: values.cuenta,
    };
    const response = (await bank_create(data)) as FetchResponse;
    setLoading(false);
    if (response.Success) {
      toast.success("Banco creado.");
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
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>BANCO</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(val)}
                value={field.value?.toString()}
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
        <FormField
          control={form.control}
          name="cuenta"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CUENTA</FormLabel>
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
          className="w-full p-2 mt-5"
        >
          {loading ? <Spinner className="size-8" /> : "Crear"}
        </Button>
      </form>
    </Form>
  );
}
