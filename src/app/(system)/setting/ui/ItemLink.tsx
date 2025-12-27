import { LucideIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'


interface ItemLinkProps {
    title: string
    link: string
    icon: LucideIcon
}

export const ItemLink = ({ title, link, icon: Icon }: ItemLinkProps) => {


    return (
        <Link href={link} className="flex flex-col justify-center gap-3 items-center h-20 bg-gray-600 w-full rounded-sm">
            <Icon size={35} strokeWidth={1.5} />
            <span>{title}</span>
        </Link>
    )
}
