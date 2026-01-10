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
import { user_update } from "../../../../../actions/setting/user_action";

const userSchema = z
  .object({
    idUsuario: z.number(),
    sucursal: z
      .string()
      .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
    usuario: z
      .string()
      .min(2, "El nombre de usuario debe tener al menos 2 caracteres"),
    contrasena: z
      .string()
      .min(2, "La contraseña debe tener al menos 2 caracteres"),
    confirmarContrasena: z
      .string()
      .min(2, "La confirmación de contraseña debe tener al menos 2 caracteres"),
    usuarioRolId: z
      .number()
      .min(1, "Debe seleccionar un tipo")
      .max(2, "Tipo de usuario no válido"),
  })
  .refine((data) => data.contrasena === data.confirmarContrasena, {
    message: "Las contraseñas no coinciden",
    path: ["confirmarContrasena"], // Esto hará que el error aparezca en el campo confirmarContrasena
  });

export default function EditUserForm({ user }: { user: UserGetAllInterface }) {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      idUsuario: user.idUsuario,
      sucursal: user.sucursal,
      usuario: user.usuario,
      contrasena: "",
      confirmarContrasena: "",
      usuarioRolId: user.usuarioRolId ? user.usuarioRolId : 0,
    },
  });
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = form.handleSubmit((values) => {
    setLoading(true);
    const data: UserUpdatedInterface = {
      idUsuario: values.idUsuario,
      usuarioRolId: values.usuarioRolId,
      usuario: values.usuario,
      password: values.contrasena,
    };
    user_update(data);
    console.log(data);
    setLoading(false);
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
                value={field.value?.toString()}
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
          className="btn-primary flex w-full sm:w-1/2 justify-center "
        >
          {loading ? "Cargando..." : "Actualizar"}
        </Button>
      </form>
    </Form>
  );
}
