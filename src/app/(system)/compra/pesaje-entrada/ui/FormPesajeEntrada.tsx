"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import InputLarge from '@/components/ui/input-custom/inputLarge';
import { InputPeso } from '@/components/ui/input-custom/inputPeso';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import z from 'zod'


const pesajeEntradaSchema = z.object({
    entradaQQ: z.number(),
    entradaKg: z.number(),
    cliente: z.string().min(1, "Campo requerido"),
    clienteDetalle: z.string().min(1, "Campo requerido"),
    efectivo: z.string().min(1, "Campo requerido"),
    banco: z.string().min(1, "Campo requerido"),
    disponible: z.string().min(1, "Campo requerido"),
    estado: z.string().min(1, "Campo requerido"),
    sector: z.string().min(1, "Campo requerido"),
    placa: z.string().min(1, "Campo requerido"),
    producto: z.string().min(1, "Campo requerido"),
    humedad: z.string().min(1, "Campo requerido"),
    impureza: z.string().min(1, "Campo requerido"),
    precio: z.string().min(1, "Campo requerido"),
})


export default function FormPesajeEntrada() {
    const form = useForm({
        resolver: zodResolver(pesajeEntradaSchema),
        defaultValues: {
            entradaQQ: 0,
            entradaKg: 1840,
        },
    });

    return (
        <Form {...form}>
            <form className='h-full w-full p-2 flex flex-col rounded-md shadow-inner'>
                {/* ENTRADA ROW */}
                <div className='grid grid-cols-2 gap-4 px-2 rounded xl:mx-20 xl:pt-10'>
                    <FormField
                        control={form.control}
                        name="entradaQQ"
                        render={({ field }) => (
                            <InputPeso
                                field={field}
                                label="ENTRADA"
                                unit="QQ"
                                textColor="text-secondary-foreground"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="entradaKg"
                        render={({ field }) => (
                            <InputPeso
                                field={field}
                                label=""
                                unit="KG"
                                textColor="text-secondary-foreground"
                            />
                        )}
                    />
                </div>

                <div className='grid grid-cols-1 p-2 lg:grid-cols-10 xl:grid-cols-10 xl:mx-20 xl:pt-17 xl:gap-4'>
                    <FormField
                        control={form.control}
                        name="cliente"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-5 xl:col-span-5'>
                                <FormLabel>Cliente</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="clienteDetalle"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-5 xl:col-span-5'>
                                <FormLabel>Detalle</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="efectivo"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-2'>
                                <FormLabel>Efectivo</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="banco"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-2'>
                                <FormLabel>Banco</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="disponible"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-2'>
                                <FormLabel>Disponible</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="estado"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-2'>
                                <FormLabel>Estado</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <div className='grid grid-cols-1 p-2 lg:grid-cols-10 xl:grid-cols-10 xl:mx-20 xl:gap-4 xl:pt-0'>
                    <FormField
                        control={form.control}
                        name="sector"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-5 xl:col-span-3'>
                                <FormLabel>Sector</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="producto"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-5 xl:col-span-3'>
                                <FormLabel>Producto</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="placa"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-1'>
                                <FormLabel>Placa</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="humedad"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-1'>
                                <FormLabel>Humedad</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="impureza"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-1'>
                                <FormLabel>Impureza</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="precio"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-1'>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} type='number' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

            </form>
        </Form>
    )
}
