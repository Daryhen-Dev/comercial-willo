"use client";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
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
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const userSchema = z.object({
  usuario: z.string().min(1, "El usuario es obligatorio"),
  password: z.string().min(1, "La contraseña es obligatoria"),
});

export const MainLogin = () => {
  const form = useForm({
    resolver: zodResolver(userSchema),
    defaultValues: {
      usuario: "",
      password: "",
    },
  });

  console.log(form.formState.errors);
  const onSubmit = form.handleSubmit((values) => {
    console.log(values);
  });

  return (
    <Card className="w-full max-w-xl p-5">
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
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
              </FormItem>
            )}
          />
          <Button type="submit" className="gap-10">
            Login
          </Button>
        </form>
      </Form>
    </Card>
  );
};
