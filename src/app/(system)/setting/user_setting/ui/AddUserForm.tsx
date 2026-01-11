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
import { UserCreateInterface } from "@/interfaces";
import { user_create } from "@/actions";

const userSchema = z
  .object({
    idLocal: z
      .number()
      .min(1, "Debe seleccionar una sucursal")
      .refine((val) => val !== 2, {
        message: "El valor no puede ser 2",
      }),
    usuarioRolId: z
      .number()
      .min(1, "Debe seleccionar un tipo")
      .max(2, "Tipo de usuario no válido"),
    usuario: z
      .string()
      .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
    contrasena: z
      .string()
      .min(2, "La contraseña debe tener al menos 2 caracteres"),
    confirmarContrasena: z
      .string()
      .min(2, "La confirmación de contraseña debe tener al menos 2 caracteres"),
  })
  .refine((data) => data.contrasena === data.confirmarContrasena, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarContrasena"], // Esto hará que el error aparezca en el campo confirmarContrasena
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
      idLocal: 0,
      usuario: "",
      contrasena: "",
      confirmarContrasena: "",
      usuarioRolId: 0,
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
    const data: UserCreateInterface = {
      idLocal: values.idLocal,
      usuarioRolId: values.usuarioRolId,
      usuario: values.usuario.toUpperCase(),
      password: values.contrasena,
      rolUsuario: values.usuarioRolId === 1 ? "ADMINISTRADOR" : "CAJERO",
    };
    const response = (await user_create(data)) as FetchResponse;
    setLoading(false);
    if (response.StatusText === "OK") {
      toast.success("Usuario creado.");
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
          name="contrasena"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmarContrasena"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="usuarioRolId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo</FormLabel>
              <Select
                onValueChange={(val) => field.onChange(Number(val))}
                value={
                  field.value && field.value > 0 ? field.value.toString() : ""
                }
              >
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Seleccione un tipo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1">ADMINISTRADOR</SelectItem>
                  <SelectItem value="2">CAJERO</SelectItem>
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
          className="w-full p-2 mt-5"
        >
          {loading ? <Spinner className="size-8" /> : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
}
