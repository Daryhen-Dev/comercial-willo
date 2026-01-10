'use client'
import { columns } from "./columns"
import { DataTable } from "./data-table"
import { bank_activar } from "./actions/bank_activar_action"
import { BankActivarActionInterface } from "./interfaces/bank_activar_action_interface"
import { useEffect, useState } from "react"

export default function DemoPage() {
    const [data, setData] = useState<BankActivarActionInterface[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data2 = await bank_activar()
                setData(data2)
            } catch (error) {
                console.error('Error fetching data:', error)
                setData([])
            }
        }
        fetchData()
    }, [])

    return (
        <div className="mx-auto py-2">
            <DataTable columns={columns} data={data} />
        </div>
    )
}