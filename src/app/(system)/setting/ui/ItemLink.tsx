import Link from 'next/link'
import React from 'react'


interface ItemLinkProps {
    title: string
    link: string
}

export const ItemLink = ({ title, link }: ItemLinkProps) => {


    return (
        <Link href={link} className="flex justify-center items-center h-20 bg-amber-800 w-50 rounded-sm">
            <span>{title}</span>
        </Link>
    )
}
