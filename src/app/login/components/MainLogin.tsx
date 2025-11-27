"use client";
import {
  Card,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const userSchema = z.object({
  usuario: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

type LoginResponse = {
  success: boolean;
  message?: string;
  data?: unknown;
};

export const MainLogin = () => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      usuario: "",
      password: "",
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const Fetch = async (values: { usuario: string; password: string }): Promise<LoginResponse> => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await fetch(
        `https://localhost:7090/api/UserCad/GetOneUser?idLocal=1&user=${encodeURIComponent(
          values.usuario
        )}&password=${encodeURIComponent(values.password)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Leer el body de la respuesta
      const data = await response.json();

      // Validar status HTTP
      if (!response.ok) {
        const errorMsg = data?.message || `Usuario o contraseña incorrectos. (${response.status})`;
        setErrorMessage(errorMsg);
        return { success: false, message: errorMsg };
      }

      // Respuesta exitosa
      console.log("Login exitoso:", data);
      setErrorMessage(null);
      return { success: true, message: "Login exitoso", data };

    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Error en la conexión con el servidor";
      console.error("Error en fetch:", error);
      setErrorMessage(errorMsg);
      return { success: false, message: errorMsg };
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = form.handleSubmit((values) => {
    void Fetch(values);
  });

  return (
    <Card className="flex flex-col w-full max-w-xl p-5 ml-3 mr-3 sm:ml-0 sm:mr-0">
      <CardTitle className="text-center">Login</CardTitle>
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errorMessage}
        </div>
      )}
      <Form {...form}>
        <form onSubmit={onSubmit} className="gap-5">
          <FormField
            name="usuario"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Usuario</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="w-full" />
                </FormControl>
                {form.formState.errors?.usuario && (
                  <FormDescription className="text-red-500">
                    {form.formState.errors?.usuario.message}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contraseña</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                {form.formState.errors?.password && (
                  <FormDescription className="text-red-500">
                    {form.formState.errors?.password.message}
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <Button type="submit" className="gap-10 mt-3" disabled={isLoading}>
            {isLoading ? "Iniciando sesión..." : "Login"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};
