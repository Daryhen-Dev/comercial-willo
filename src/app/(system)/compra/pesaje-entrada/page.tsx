import React from 'react'
import FormPesajeEntrada from './ui/FormPesajeEntrada'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Save, Scale, Search, UserCog } from 'lucide-react'

export default function page() {
    return (
        <div className="grid lg:grid-rows-[1fr_130px] h-full w-full">
            <div className="">
                <FormPesajeEntrada />
            </div>
            <div className="bg-card flex items-center gap-4 p-4 flex-wrap justify-center lg:justify-start">
                <Link href="/compra/pesaje-entrada">
                    <Button className="px-6 py-2 rounded h-26 w-55 text-2xl"><Save className="size-15" />Entrada</Button>
                </Link>
                <Link href="/compra/pesaje-salida">
                    <Button className="px-6 py-2 rounded h-26 w-55 text-2xl"><Search className="size-15" />Salida</Button>
                </Link>
                <Link href="/compra/comision">
                    <Button className="px-6 py-2 rounded h-26 w-55 text-2xl"><UserCog className="size-15" />Comision</Button>
                </Link>
                <Link href="/compra/liquidacion">
                    <Button className="px-6 py-2 rounded h-26 w-55 text-2xl"><Scale className="size-15" />Liquidacion</Button>
                </Link>
            </div>
        </div>
    )
}
