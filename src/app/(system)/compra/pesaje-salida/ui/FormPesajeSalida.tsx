"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { InputPeso } from '@/components/ui/input-custom/inputPeso';
import { Input } from '@/components/ui/input';
import InputLarge from '@/components/ui/input-custom/inputLarge';

const pesajeSalidaSchema = z.object({
    entradaQQ: z.number(),
    entradaKg: z.number(),
    salidaQQ: z.number(),
    salidaKg: z.number(),
    totalQQ: z.number(),
    totalKg: z.number(),
    compra: z.string().min(1, "Campo requerido"),
    producto: z.string().min(1, "Campo requerido"),
    cliente: z.string().min(1, "Campo requerido"),
    placa: z.string().min(1, "Campo requerido"),
    fecha: z.string().min(1, "Campo requerido"),
    pesoSaco: z.number(),
    muestra: z.number(),
    humedad: z.number(),
    impureza: z.number(),
    precio: z.number(),

});

export default function FormPesajeSalida() {

    const form = useForm({
        resolver: zodResolver(pesajeSalidaSchema),
        defaultValues: {
            entradaQQ: 0,
            entradaKg: 1840,
            salidaQQ: 0,
            salidaKg: 840,
            totalQQ: 0,
            totalKg: 1000,
        },
    });

    return (
        <Form {...form}>
            <form className='h-full w-full p-2 flex flex-col rounded-md shadow-inner'>
                {/* ENTRADA ROW */}
                <div className='grid grid-cols-2 gap-4 px-2 rounded'>
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
                {/* SALIDA ROW */}
                <div className='grid grid-cols-2 gap-4 px-2 pb-2 rounded'>
                    <FormField
                        control={form.control}
                        name="salidaQQ"
                        render={({ field }) => (
                            <InputPeso
                                field={field}
                                label="SALIDA"
                                unit="QQ"
                                textColor="text-green-500"
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="salidaKg"
                        render={({ field }) => (
                            <InputPeso
                                field={field}
                                label=""
                                unit="KG"
                                textColor="text-green-500"
                            />
                        )}
                    />
                </div>
                <div className='h-1 bg-foreground rounded shadow-2xl' />
                {/* TOTALS ROW */}
                <div className='grid grid-cols-2 gap-4 p-2 rounded'>
                    <FormField
                        control={form.control}
                        name="totalQQ"
                        render={({ field }) => (
                            <InputPeso
                                field={field}
                                label=""
                                unit=""
                                textColor="text-orange-500"
                                disabled
                            />
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="totalKg"
                        render={({ field }) => (
                            <InputPeso
                                field={field}
                                label=""
                                unit=""
                                textColor="text-orange-500"
                                disabled
                            />
                        )}
                    />
                </div>

                <div className='grid grid-cols-1 p-2 lg:grid-cols-10 xl:grid-cols-10'>
                    <FormField
                        control={form.control}
                        name="compra"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-1'>
                                <FormLabel>N.- Compra</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="producto"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-2 xl:col-span-2'>
                                <FormLabel>Producto</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
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
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="fecha"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-4 xl:col-span-2'>
                                <FormLabel>Fecha</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cliente"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-10 xl:col-span-4'>
                                <FormLabel>Cliente</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} disabled />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className='grid grid-cols-2 px-2 lg:grid-cols-10'>
                    <FormField
                        control={form.control}
                        name="pesoSaco"
                        render={({ field }) => (
                            <FormItem className='lg:col-span-1'>
                                <FormLabel>Peso Saco</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="muestra"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Muestra</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="humedad"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Humedad</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="impureza"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Impureza</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="precio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Precio</FormLabel>
                                <FormControl>
                                    <InputLarge field={field} type="number" />
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
